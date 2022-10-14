import * as services from "../../../services";
import _get from "lodash/get";

const {
  itemActions,
  userActions,
  formActions,
  refDatActions,
  chatActions,
  locationActions,
} = services;

export const mainProductWidgetMapStateToProps = (state) => ({
  userDetails: _get(state, "user.userData", {}),
  sellData: _get(state, "refData.sellData", {}),
  rentData: _get(state, "refData.rentData", {}),
  product: _get(state, "item.product", {}),
  loader: _get(state, "user.loader", false),
  chatStatus: _get(state, "chat.newInterest", false),
  isAuthorized: !!_get(state, "user.authStatus", false),
  userMessage: _get(state, "form.productListingForm.userMessage.value", {}),
  favouriteItemIds: _get(state, "item.favouriteItems", []),
  productForm: _get(state, "form.productListingForm"),
});

export const mainProductWidgetMapDispatchToProps = (dispatch) => ({
  getProduct: (payload) => dispatch(itemActions.fetchProductDetails(payload)),
  fetchUserDetails: (payload) => dispatch(userActions.getUserData(payload)),
  setFormData: (payload) => dispatch(formActions.setFormConstants(payload)),
  getSellCategories: (payload) =>
    dispatch(refDatActions.getSellCategories(payload)),
  getRentCategories: (payload) =>
    dispatch(refDatActions.getRentCategories(payload)),
  clearProduct: (payload) => dispatch(itemActions.clearNewProduct(payload)),
  fetchWantedItems: (payload) =>
    dispatch(itemActions.fetchWantedItems(payload)),
  fetchFilterOptions: (payload) =>
    dispatch(itemActions.fetchFilterOptions(payload)),
  fetchProductList: (payload) => dispatch(itemActions.makeSearch(payload)),
  clearInterest: () => dispatch(chatActions.clearInterest()),
  fetchFavouriteIds: (payload) =>
    dispatch(itemActions.fetchFavouriteIds(payload)),
  clearCurrentLocation: (payload) =>
    dispatch(locationActions.clearCurrentLocation(payload)),
  updateFavoriteStatus: (payload) =>
    dispatch(itemActions.updateItemFavorite(payload)),
  expressInterest: (payload) => dispatch(chatActions.expressInterest(payload)),
  setCurrentConversation: (payload) =>
    dispatch(chatActions.setCurrentConversation(payload)),
});
