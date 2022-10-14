/* eslint-disable */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  mainPostListingMapStateToProps,
  mainPostListingMapDispatchToProps,
} from "./models/MainPostListingModel";
import { formConstants, mapToRequest, updateListingDate } from "./utils";
import { updateFormStore, globalUtils } from "../../utils";
import { formConstants as profileFormConstants } from '../godhan-profile-widget/utils'
import * as _ from "lodash";
import { TypeSelectPage, AddListingPage, UploadImagesPage } from "./components";
import { useHistory } from "react-router-dom";

const MainPostListing = ({
  selectedOption,
  sellList,
  rentList,
  wantedList,
  sellData,
  rentData,
  wantedData,
  listingForm,
  newProduct,
  userDetails,
  loader,
  itemUnderEdit,
  setFormData,
  clearSelectedItem,
  createNotification,
}) => {
  const [currentPage, setCurrentPage] = useState("typeSelect"); //typeSelect || addListing || addImages

  const history = useHistory();

  const getData = () => {
    if (!_.isEmpty(selectedOption, "id")) {
      switch (selectedOption.id) {
        case "sell":
          return sellData;
        case "rent":
          return rentData;
        case "task":
          return;
        case "wanted":
          return wantedData;
        default:
          break;
      }
    }
  };

  const setFormDefault = () => {
    setFormData({
      listingForm: {
        ...formConstants.listingForm,
        listedPrice: {
          ...formConstants.listingForm.listedPrice,
          placeholder: `Price in ${globalUtils.getCountryProperty("currency")} *`
        },
        rent: {
          ...formConstants.listingForm.rent,
          placeholder: `Rent in ${globalUtils.getCountryProperty("currency")} *`
        },
        securityAmount: {
          ...formConstants.listingForm.securityAmount,
          placeholder: `Security Amount(${globalUtils.getCountryProperty("currency")})`,
        }
      },
      profileForm: profileFormConstants.profileForm
    })

  }

  useEffect(() => {
    if (newProduct) {
      setFormDefault()
      if (globalUtils.getCurrentPage() === "editListing") {
        createNotification({
          message: "Listing updated successfully",
          isSuccessful: true,
        });
      } else {
        createNotification({
          message: "Listing created",
          isSuccessful: true,
        });
      }
      globalUtils.setSessionStorageItem("godhan-next-flow", "/");
      history.push(`/product/${newProduct}`);
    }
  }, [newProduct, history]);

  useEffect(() => {
    const dataList = { sellList, rentList, wantedList };
    if (globalUtils.getCurrentPage() === "editListing") {
      setFormDefault()
      mapToRequest(itemUnderEdit, dataList);
      updateListingDate(itemUnderEdit)
    } else {
      const loc = JSON.parse(localStorage.getItem("godhan-display-location"));
      if (sessionStorage.getItem("godhan-flow") !== "edit-profile") {
        setFormDefault()
        updateFormStore({
          form: "listingForm",
          field: "selectedLocation",
          value:
            _.get(listingForm, "selectedLocation.value") ||
            _.get(loc, "selectedLocation"),
        });
        updateFormStore({
          form: "listingForm",
          field: "searchBy",
          value:
            _.get(listingForm, "selectedLocation.value") ||
            _.get(loc, "selectedLocation"),
        });
        updateFormStore({
          form: "listingForm",
          field: "latitude",
          value: _.get(listingForm, "latitude.value") || _.get(loc, "latitude"),
        });
        updateFormStore({
          form: "listingForm",
          field: "longitude",
          value: _.get(listingForm, "longitude.value") || _.get(loc, "longitude"),
        });
        updateFormStore({
          form: "listingForm",
          field: "contactEmail",
          value: _.get(userDetails, "email"),
        });
        updateFormStore({
          form: "listingForm",
          field: "contactNumber",
          value: _.get(userDetails, "mobileNumber"),
        });
      } else {
        if (!_.isEmpty(listingForm, 'selectedListingType.value')) {
          setCurrentPage("addListing")
        }
        if (!_.isEmpty(listingForm))
          setFormData({
            listingForm: {
              ...listingForm,
              contactEmail: {
                ..._.get(listingForm, 'contactEmail'),
                value: _.get(userDetails, "email")
              },
              contactNumber: {
                ..._.get(listingForm, "contactNumber"),
                value: _.get(userDetails, "mobileNumber")
              }
            }
          })
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (_.get(userDetails, 'email') && !_.get(listingForm, 'contactEmail.value')) {
      updateFormStore({ form: 'listingForm', field: 'contactEmail', value: _.get(userDetails, 'email') })
    }
    if (_.get(userDetails, 'mobileNumber') && !_.get(listingForm, 'contactNumber.value')) {
      updateFormStore({ form: 'listingForm', field: 'contactNumber', value: _.get(userDetails, 'mobileNumber') })
    }
  }, [userDetails])
  // useEffect(() => (()=> sessionStorage.removeItem("godhan-flow")));

  if (currentPage === "addListing")
    return (
      <AddListingPage
        listingForm={listingForm}
        categoryOptions={getData()}
        setCurrentPage={setCurrentPage}
        selectedOption={selectedOption}
      />
    );

  if (currentPage === "addImages")
    return <UploadImagesPage setCurrentPage={setCurrentPage} />;

  return (
    <TypeSelectPage
      selectedOption={selectedOption}
      updateFormStore={updateFormStore}
      setCurrentPage={setCurrentPage}
    />
  );
};

const MainPostListingWidget = connect(
  mainPostListingMapStateToProps,
  mainPostListingMapDispatchToProps
)(MainPostListing);

export { MainPostListingWidget };
