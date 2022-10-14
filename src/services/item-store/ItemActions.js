import HttpClient from "../../commons/HttpClient";
import _get from "lodash/get";
import _omit from "lodash/omit";
import { itemDispatchActions } from "./ItemDispatchActions";
import { globalConstants, globalUtils } from "../../utils";
import { notificationActions } from "../notification-store";
import { updateFormStore } from "../../utils";
import { locationActions } from "../location-store";
import { userActions } from "../user-store";
import { ItemActionTypes } from "./ItemActionTypes";
import { formActions } from "../form-store";
import { formConstants } from "../../widgets/godhan-post-listing-widget/utils";

const clearNewProduct = () => (dispatch) =>
  dispatch(itemDispatchActions.clearProduct());


const getAncestors = (target, children, ancestors = []) => {
  try {
    for (let node of children) {
      if (node.id === target) {
        return ancestors.concat(node);
      }
      const found = getAncestors(target, node.children, ancestors.concat(node));
      if (found) {
        return found;
      }
    }
  } catch (err) { console.error(err) }
  return undefined;
};


const getCategoryTree = (data, updatedStore) => {
  const rentList = _get(updatedStore, "refData.rentData", []);
  const sellList = _get(updatedStore, "refData.sellData", []);
  const wantedList = _get(updatedStore, "refData.wantedData", []);
  switch (data.type) {
    case "rent":
      return getAncestors(data.category, rentList.children);
    case "sell":
      return getAncestors(data.category, sellList.children);
    case "wanted":
      return getAncestors(data.category, wantedList.children)
    default:
      break;
  }
}

const mapProduct = (data, updatedStore) => {
  const categoryTree = getCategoryTree(data, updatedStore);
  data.categoryTree = categoryTree;
  if(data.type==='sell'){
    const postTypeWanted = data.additionalFeatures.find((feat)=> feat.key ==='postTypeWanted');
    if(postTypeWanted){
      data.postTypeWanted = postTypeWanted.value;
      data.additionalFeatures = data.additionalFeatures.filter((feat) => feat.key !=='postTypeWanted')
    }
  }
  if (data?.additionalFeatures?.length > 0) {
    const feat = data.additionalFeatures.map((feature) => {
      if (feature.key === 'securityAmount') {
        feature.value = `${globalUtils.getCountryProperty("currency")} ${feature.value}`
      }
      return feature;
    });
    if (feat) {
      return {
        ...data, additionalFeatures: feat
      }
    }
  }
  return data;
}

const fetchProductDetails = (payload) => {
  return (dispatch, getState) => {
    return new HttpClient()
      .get(
        `/items/${payload.id}`,
        "/items/getItem",
        globalConstants.MICROSERVICES,
        "public"
      )
      .then((res) => {
        const updatedStore = getState();
        dispatch(itemDispatchActions.productDetailsSuccess(mapProduct(res.data, updatedStore)));
        if (!_get(res, "data.listedLocation")) {
          dispatch(
            locationActions.fetchLocationFromCoords({
              longitude: _get(res.data, "longitude"),
              latitude: _get(res.data, "latitude"),
            })
          );
        }
        if (globalUtils.getCurrentPage() === "editListing") {
          updateFormStore({
            form: "listingForm",
            field: "contactNumber",
            value: _get(res.data, "contactNumber"),
          });
          updateFormStore({
            form: "listingForm",
            field: "contactEmail",
            value: _get(res.data, "contactEmail"),
          });
          updateFormStore({
            form: "listingForm",
            field: "isNumberDisplayed",
            value: _get(res.data, "contactNumberDisplayed"),
          });
          updateFormStore({
            form: "listingForm",
            field: "isEmailDisplayed",
            value: _get(res.data, "contactEmailAddressDisplayed"),
          });
        }
      })
      .catch((err) => err);
  };
};

const fetchHotCategories = (payload) => {
  return (dispatch) => {
    return new HttpClient()
      .get(
        `/category?ishot=true&type=${_get(payload, "type")}`,
        "/items/hotCategories",
        globalConstants.MICROSERVICES,
        "public"
      )
      .then((res) =>
        dispatch(itemDispatchActions.updateHotCategories(res.data))
      )
      .catch((err) => err);
  };
};

const updateProduct = (payload) => {
  return (dispatch) => {
    return new HttpClient()
      .put(`/user/items/${payload.id}`, _omit(payload, ["id"]))
      .then((res) => dispatch(fetchProductDetails({ id: payload.id })))
      .catch((err) => err);
  };
};

const updateItemFavorite = (payload) => {
  return (dispatch) => {
    return new HttpClient()
      .put(`/user/favourite/${payload.productID}`, null, "/items/updateItem")
      .then(() => {
        dispatch(fetchFavouriteIds());
      })
      .catch((err) => err);
  };
};

const fetchProduct = (payload) => {
  return (dispatch, getState) => {
    const queryString = `?pagesize=${payload.limit}&pageno=${payload.offset}&type=${_get(payload, "listType", "rent")}`;
    const currentList = _get(getState(), "item.productList.content", []);
    return new HttpClient()
      .get(
        `/items/all${queryString}`,
        "/items/itemList",
        globalConstants.MICROSERVICES,
        "public"
      )
      .then((res) => {
        const response = {
          offset: _get(payload, "offset"),
          listType: _get(payload, "listType", "rent"),
          ...res.data,
        }
        if (!_get(payload, 'initial', false)) {
          response.content = [...currentList, ..._get(res, "data.content")]
        }
        dispatch(
          itemDispatchActions.fetchItemList(response)
        );
        if (payload.offset > 0) {
          const height = document.getElementsByClassName('home-page-card')[0].clientHeight;
          window.scrollBy({
            top: height,
            left: 0,
            behavior: "smooth"
          })
        }
      })
      .catch((err) => err);
  };
};

const makeSearch = (payload) => {
  return (dispatch) => {
    const queryString = `?pagesize=${globalConstants.paginationLimit}&pageno=${payload.offset}`;
    return new HttpClient()
      .post(
        `/search${queryString}`,
        _get(payload, "payload"),
        "/items/itemList",
        globalConstants.MICROSERVICES,
        "public"
      )
      .then((res) =>
        dispatch(
          itemDispatchActions.fetchItemList({
            ...res.data,
            offset: _get(payload, "offset"),
            listType: _get(payload, "listType", "default"),
          })
        )
      )
      .catch((err) => err);
  };
};

const fetchFavouriteItems = (payload) => {
  return (dispatch) => {
    // const queryString = `?size=${payload.limit}&page=${payload.offset}`;
    return new HttpClient()
      .get("/user/favourite/", "/items/itemList")
      .then((res) => {
        if (globalUtils.getCurrentPage() === 'profile')
          dispatch(
            itemDispatchActions.fetchItemList({
              content: res.data,
              // offset: _get(payload, 'offset'),
            })
          )
      }
      )
      .catch((err) => err);
  };
};

const fetchFavouriteIds = (payload) => {
  return (dispatch) => {
    return new HttpClient()
      .get("/user/favourite/", "/items/itemList")
      .then((res) => {
        dispatch(
          itemDispatchActions.fetchFavouriteItemIds(getItemIds(res.data))
        );
        if (globalUtils.getCurrentPage() === 'profile')
          dispatch(
            itemDispatchActions.fetchItemList({
              content: res.data,
              // offset: _get(payload, 'offset'),
            })
          )
      }
      )
      .catch((err) => err);
  };
};

const getItemIds = (data) => data.map((obj) => obj.productID);

const fetchWantedItems = (payload) => {
  return (dispatch) => {
    return new HttpClient()
      .get(
        "/wanted",
        "/items/wantedItems",
        globalConstants.MICROSERVICES,
        "public"
      )
      .then((res) => dispatch(itemDispatchActions.updateWantedItems(res.data)))
      .catch((err) => err);
  };
};

const updloadFilesForEdit = (payload) => {
  return (dispatch) => {
    const existingImageMap = []; // new Map();
    const formData = new FormData();
    _get(payload, "imageURL.length", 0) > 0 &&
      payload.imageURL.forEach((img, index) => {
        if (typeof img === "string") {
          existingImageMap.push(img);
        } else if (_get(img, 'type')) {
          formData.append("newImages", img);
        }
      });
    if (existingImageMap.length > 0) {
      // const obj = Object.fromEntries(existingImageMap);
      const json = JSON.stringify(existingImageMap);
      const blob = new Blob([json], {
        type: "application/json",
      });
      formData.append("existingImages", blob);
    }

    return new HttpClient()
      .post(
        `/user/items/edit-upload?id=${_get(payload, "id")}`,
        formData,
        "/",
        globalConstants.MICROSERVICES
      )
      .then((res) => {
        dispatch(formActions.setFormConstants(formConstants));
        dispatch(
          itemDispatchActions.newProductListed({
            ...res.data,
            productID: _get(payload, "id"),
          })
        );
      })
      .catch((err) => {
        updateFormStore({
          form: "listingForm",
          field: "isListingSubmitted",
          value: false,
        });
      });
  };
};
const createdWantedListing = (payload) => {
  return (dispatch, getState) => {
    return new HttpClient()
      .post("/user/wanted", payload, "/items/newItem")
      .then((res) => {
        if (payload.isSponsored) {
          const updatedStore = _get(getState(), "user.userData");
          dispatch(
            makePayment({
              token: _get(payload, "token"),
              amount: globalUtils.getCountryProperty("featuredPrice") * 100,
              userId: _get(updatedStore, "id"),
              productId: _get(res, "data.productID"),
              userName: _get(updatedStore, "name"),
              typeOfSponsorship: "featured",
              selectedDuration: "10 Days",
              numOfExpDays: 10,
              isHours: false,
            })
          );
        }
        if (_get(payload, "productID")) {
          dispatch(
            updloadFilesForEdit({
              id: _get(res, "data.productID"),
              imageURL: _get(payload, "files"),
            })
          );
          dispatch(
            itemDispatchActions.newProductListed({
              ...res.data,
              productID: _get(res, "data.productID"),
            })
          );
        } else if (_get(payload, "files")) {
          dispatch(
            uploadFiles({
              id: _get(res, "data.productID"),
              imageURL: _get(payload, "files"),
            })
          );
        } else {
          dispatch(formActions.setFormConstants(formConstants));
          dispatch(
            itemDispatchActions.newProductListed({
              ...res.data,
              productID: _get(res, "data.productID"),
            })
          );
        }
      })
      .catch((err) => {
        updateFormStore({
          form: "listingForm",
          field: "isListingSubmitted",
          value: false,
        });
      });
  };
};

const extendListing = (payload) => {
  return (dispatch) => {
    return new HttpClient()
      .get(`/item/extend?${payload.id}`, "/items/extendListing")
      .then(() =>
        dispatch(itemDispatchActions.fetchProductDetails({ id: payload.id }))
      )
      .catch((err) => err);
  };
};

const fetchLocation = (payload) => {
  return (dispatch) => {
    return new HttpClient()
      .get(
        `/location/${payload.requestType}?value=${_get(payload, "value")}`,
        "/items/location"
      )
      .then((res) => {
        switch (payload.requestType) {
          case "country":
            return dispatch(itemDispatchActions.updateCountryList(res.data));
          case "state":
            return dispatch(itemDispatchActions.updateStateList(res.data));
          case "city":
            return dispatch(itemDispatchActions.updateCityList(res.data));
          default:
            return null;
        }
      });
  };
};

const addNewItem = (payload) => {
  return (dispatch) => {
    return new HttpClient()
      .post(
        `/user/items?type=${payload.type}`,
        { ...payload, isSponsored: false },
        "/items/newItem"
      )
      .then((res) => {
        if (payload.isSponsored) {
          dispatch(
            makePayment({
              token: _get(payload, "token"),
              amount: globalUtils.getCountryProperty("featuredPrice") * 100,
              userId: _get(res, "data.userID"),
              productId: _get(res, "data.productID"),
              userName: _get(res, "data.userName"),
              typeOfSponsorship: "featured",
              selectedDuration: "10 Days",
              numOfExpDays: 10,
              isHours: false,
            })
          );
        } else if (_get(payload, "productID")) {
          dispatch(
            updloadFilesForEdit({
              id: _get(res, "data.productID"),
              imageURL: _get(payload, "files"),
            })
          );
        } else if (_get(payload, "files")) {
          dispatch(
            uploadFiles({
              id: _get(res, "data.productID"),
              imageURL: _get(payload, "files"),
            })
          );
        } else {
          dispatch(formActions.setFormConstants(formConstants));
          dispatch(
            itemDispatchActions.newProductListed({
              ...res.data,
              productID: _get(res, "data.productID"),
            })
          );
        }
      })
      .catch((err) => {
        updateFormStore({
          form: "listingForm",
          field: "isListingSubmitted",
          value: false,
        });
      });
  };
};

const uploadFiles = (payload) => {
  return (dispatch, getState) => {
    const imageURL = _get(getState(), "form.listingForm.files.value", null);
    const images = _get(getState(), "user.selectedProductForEdit", []);
    const formData = new FormData();
    for (const key of Object.keys(imageURL)) {
      if (
        imageURL !== undefined &&
        imageURL !== null &&
        _get(imageURL, "length", 0) > 0
      ) {
        if (_get(imageURL, `${key}.0`)) {
          if (typeof _get(imageURL, `${key}.0`) === "string") {
            formData.append(`images[${key}]`, images[key]);
          } else {
            formData.append(`images[${key}]`, _get(imageURL, `${key}.0`));
          }
        } else if (_get(imageURL, key)) {
          formData.append(`images[${key}]`, _get(imageURL, key));
        }
      }
    }

    return new HttpClient()
      .post(
        `/user/items/image-upload?id=${_get(payload, "id")}`,
        formData,
        "/user/postVerification"
      )
      .then((res) => {
        dispatch(itemDispatchActions.createNewProductId(res.data));
        dispatch(formActions.setFormConstants(formConstants));
        if (_get(payload, "isSponsored")) {
          dispatch(itemDispatchActions.createNewProductId(_get(payload, "id")));
        } else {
          dispatch(
            itemDispatchActions.newProductListed({
              ...res.data,
              productID: _get(payload, "id"),
            })
          );
        }
      })
      .catch((err) => {
        updateFormStore({
          form: "listingForm",
          field: "isListingSubmitted",
          value: false,
        });
      });
  };
};
const makePayment = (payload) => {
  return (dispatch) => {
    return new HttpClient()
      .post("/payment", payload, "/items/newItem")
      .then((res) => {
        dispatch(formActions.setFormConstants(formConstants));
        dispatch(
          itemDispatchActions.paymentSuccessful({
            productID: _get(payload, "productId"),
          })
        );
        dispatch(
          notificationActions.setNotification({
            message: "Payment successful",
            severity: globalConstants.notificationMessageSeverity.SUCCESS,
          })
        );
        if (_get(payload, "isProfile")) {
          dispatch(userActions.clearListedProducts());
          dispatch(userActions.fetchProductDetails({ offset: 0 }));
        }
      })
      .catch((err) => {
        updateFormStore({
          form: "listingForm",
          field: "isListingSubmitted",
          value: false,
        });
      });
  };
};

const fetchFilterOptions = (payload) => {
  return (dispatch) => {
    return new HttpClient()
      .post(
        "/filters",
        payload,
        "/items/getFilterOptions",
        globalConstants.MICROSERVICES,
        "public"
      )
      .then((res) => {
        dispatch(itemDispatchActions.updateFilterOptions(res.data));
      })
      .catch((err) => err);
  };
};

const markItemFavorite = (payload) => {
  return (dispatch) => {
    return new HttpClient()
      .put(`/user/favourite/${payload.productID}`, null, "/items/updateItem")
      .then(() => dispatch(fetchProductDetails({ id: payload.productID })))
      .catch((err) => err);
  };
};

const updateNewItems = (payload) => {
  return (dispatch, getState) => {
    const currentList = _get(getState(), "item.productList.product", []);
    return new HttpClient()
      .post("/item", payload, "/items/itemList")
      .then((res) =>
        dispatch(
          itemDispatchActions.fetchItemList({
            ...res.data,
            product: [...currentList, ..._get(res, "data.product")],
            offset: _get(payload, "offset"),
            listType: _get(payload, "listType", "default"),
          })
        )
      )
      .catch((err) => err);
  };
};

export const clearProductList = () => ({
  type: ItemActionTypes.CLEAR_PRODUCT_LIST,
});

export const itemActions = {
  fetchProductDetails,
  updateProduct,
  extendListing,
  fetchLocation,
  addNewItem,
  fetchProduct,
  updateItemFavorite,
  makePayment,
  fetchHotCategories,
  fetchWantedItems,
  clearNewProduct,
  fetchFilterOptions,
  markItemFavorite,
  updateNewItems,
  fetchFavouriteItems,
  clearProductList,
  fetchFavouriteIds,
  makeSearch,
  createdWantedListing,
};
