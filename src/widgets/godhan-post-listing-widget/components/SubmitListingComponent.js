import React from "react";
import {connect} from "react-redux";
import {submitListingMapDispatchToProps, submitListingMapStateToProps,} from "../models";
import {submitListingStyle} from "../style";
import {Button, Container} from "@material-ui/core";
import * as _ from "lodash";
import {globalConstants, globalUtils, updateFormStore} from "../../../utils";
import {FieldType, rentalProps, sellprops} from "../utils";
import {StripeButton} from "./StripeButton";

const SubmitListingComponent = ({
  listingForm,
  addListing,
  createdWantedListing,
  item,
  setTypeselectPage,
  setNotification,
  sellList,
  rentList,
  wantedList,
}) => {
  const type = _.get(listingForm, "selectedListingType.value.id");
  const location = localStorage.getItem("godhan-display-location");
  const selectedLocation =
    _.get(location, "selectedLocation") +
    ", " +
    _.get(location, "selectedLocationCountryCode");

  const check = (val, message = "Error") => {
    if (!val) return message;
  };

  const dataList = { sellList, rentList, wantedList };

  const getError = () => {
    var error =
      check(
        _.get(listingForm, "productTitle.value"),
        _.get(listingForm, "productTitle.errorText")
      ) ||
      check(
        _.get(listingForm, "productTitle.isValid"),
        _.get(listingForm, "productTitle.errorText")
      ) ||
      check(
        _.get(listingForm, "productDescription.value"),
        _.get(listingForm, "productDescription.errorText")
      ) ||
      check(
        _.get(listingForm, "productDescription.isValid"),
        _.get(listingForm, "productDescription.errorText")
      ) ||
      check(_.get(listingForm, "latitude.value"), "Please select location!") ||
      check(_.get(listingForm, "longitude.value"), "Please select location!") ||
      // !_.get(listingForm, "selectedCategory.value.id") ||
      check(!_.get(listingForm, "isListingSubmitted.value"));

    switch (type) {
      case "wanted":
      case "task":
        return (
          error ||
          check(
            _.get(listingForm, "listedPrice.value"),
            _.get(listingForm, "listedPrice.errorText")
          ) ||
          check(
            _.get(listingForm, "listedPrice.isValid"),
            _.get(listingForm, "listedPrice.errorText")
          )
        );
      case "sell":
        return (
          error ||
          check(
            _.get(listingForm, "listedPrice.value"),
            _.get(listingForm, "listedPrice.errorText")
          ) ||
          check(
            _.get(listingForm, "listedPrice.isValid"),
            _.get(listingForm, "listedPrice.errorText")
          ) ||
          check(
            _.get(listingForm, "itemDescription.value"),
            "Select condition!"
          ) ||
          check(
            _.get(listingForm, "postTypeWanted.value"),
            "Select post type!"
          ) ||
          (_.get(listingForm, "postTypeWanted.value") !== "Wanted" &&
            check(listingForm.files.value[0] !== null, "Upload an image"))
        );
      case "rent":
        const rentValidation =
          _.get(listingForm, "securityDeposit.value") === "Yes"
            ? check(
              _.get(listingForm, "securityAmount.value"),
              _.get(listingForm, "securityAmount.errorText")
            ) ||
            check(
              _.get(listingForm, "securityAmount.isValid"),
              _.get(listingForm, "securityAmount.errorText")
            )
            : false;
        return (
          error ||
          rentValidation ||
          check(_.get(listingForm, "rent.value"), "Invalid rent amount!") ||
          check(_.get(listingForm, "rent.isValid"), "Invalid rent amount!") ||
          check(
            _.get(listingForm, "rentDuration.value"),
            "Set rent duration!"
          ) ||
          check(
            _.get(listingForm, "rentDuration.isValid"),
            "Set rent duration!"
          ) ||
          check(
            _.get(listingForm, "itemDescription.value"),
            "Select condition!"
          ) ||
          check(listingForm.files.value[0] !== null, "Upload an image")
        );
      default:
        return false;
    }
  };

  const getAdditionalProperties = (
    categoryHasAdditionalProperties,
    additionalFeatures
  ) => {
    categoryHasAdditionalProperties.properties.forEach((oneProp, key) => {
      if (!_.includes(_.get(oneProp, 'hiddenFor'), _.get(listingForm, 'selectedCategory.value.name'))) {
        if (oneProp.fieldType === FieldType.TEXTBOX) {
          if (_.get(listingForm, `${oneProp.field}.value`, "")) {
            if (_.get(oneProp, "additionalProperty.name")) {
              const value = _.get(listingForm, `${oneProp.field}.value`, "");
              const distanceValue = _.get(
                listingForm,
                `${_.get(oneProp, "additionalProperty.name")}.value`,
                _.get(oneProp, "additionalProperty.options[0]")
              );
              additionalFeatures.push({
                key: oneProp.field,
                value: value + " " + distanceValue,
                label: oneProp.label,
                productId: key,
              });
            } else {
              additionalFeatures.push({
                key: oneProp.field,
                value: _.get(listingForm, `${oneProp.field}.value`, ""),
                label: oneProp.label,
                productId: key,
              });
            }
          }
        }
        if (
          oneProp.fieldType === FieldType.RADIO &&
          _.get(listingForm, `${oneProp.field}.value`)
        ) {
          additionalFeatures.push({
            key: oneProp.field,
            value: _.get(listingForm, `${oneProp.field}.value`),
            label: oneProp.label,
            productId: 1,
          });
        }
        if (oneProp.fieldType === FieldType.TOGGLE) {
          oneProp.options.map((option, key) =>
            additionalFeatures.push({
              key: option,
              value: _.get(listingForm, `${option}.value`, false) && option,
              label: option,
              productId: key,
            })
          );
        }
        if (oneProp.fieldType === FieldType.SELECT_DROPDOWN) {
          if (_.get(listingForm, `${oneProp.field}.value`, ""))
            additionalFeatures.push({
              key: oneProp.field,
              value: _.get(listingForm, `${oneProp.field}.value`, ""),
              label: oneProp.label,
              productId: key,
            });
        }
        if (oneProp.fieldType === FieldType.CHECKBOX) {
          const selectedFeatures = [];
          oneProp.options.forEach((option, index) => {
            if (_.get(listingForm, `${option}.value`)) {
              selectedFeatures.push(option);
            }
          });
          if (selectedFeatures.length > 0) {
            additionalFeatures.push({
              key: oneProp.field,
              label: oneProp.label,
              value: selectedFeatures.join(", "),
            });
          }
        }
      }
    });

  };

  const getWantedAndTaskPayload = () => {
    const payload = {
      type,
      category: _.get(listingForm, "selectedCategory.value.id"),
      categoryName: _.get(listingForm, "selectedCategoryName.value", "None"),
      title: _.get(listingForm, "productTitle.value"),
      description: _.get(listingForm, "productDescription.value"),
      listItemBy: _.get(listingForm, "availableFrom.value")
        ? globalUtils.getFormattedDateWithSourceFormat(
          _.get(listingForm, "availableFrom.value"),
          "DD-MM-YYYY",
          "YYYY-MM-DDThh:mm:ss:000"
        ) + "Z"
        : null,
      isAvailableImmediately:
        !_.get(listingForm, "availableFrom.value") && "Immediately",
      longitude: _.get(listingForm, "longitude.value"),
      latitude: _.get(listingForm, "latitude.value"),
      location:
        _.get(listingForm, "selectedLocation.value") || selectedLocation,
      contactNumber: _.get(listingForm, "contactNumber.value"),
      contactEmail: _.get(listingForm, "contactEmail.value"),
      contactNumberDisplayed: _.get(
        listingForm,
        "isNumberDisplayed.value",
        false
      ),
      contactEmailAddressDisplayed: _.get(
        listingForm,
        "isEmailDisplayed.value",
        false
      ),
      files: _.get(listingForm, "files.value"),
      listingStatus: "New",
      listedPrice:
        parseFloat(_.get(listingForm, "priceFrom.value")) ||
        parseFloat(_.get(listingForm, "listedPrice.value")),
      isHourlyRate: _.get(listingForm, "isHourly.value"),
    };
    if (type === "wanted") {
      payload.purpose = _.get(listingForm, "wantedPurpose.value");
    }
    if (_.get(item, "productID")) {
      payload.productID = _.get(item, "productID");
    }
    return payload;
  };

  const getSellPayload = () => {
    const payload = {
      type,
      category: _.get(listingForm, "selectedCategory.value.id"),
      productTitle: _.get(listingForm, "productTitle.value"),
      listedPrice: parseFloat(_.get(listingForm, "listedPrice.value")),
      productDescription: _.get(listingForm, "productDescription.value"),
      sponsorListing: false,
      itemDescription: _.get(listingForm, "itemDescription.value"),
      offeredBy: _.get(listingForm, "offeredBy.value"),
      listItemBy: _.get(listingForm, "availableFrom.value")
        ? globalUtils.getFormattedDateWithSourceFormat(
          _.get(listingForm, "availableFrom.value"),
          "DD-MM-YYYY",
          "YYYY-MM-DDThh:mm:ss:000"
        ) + "Z"
        : null,
      anyTime: !_.get(listingForm, "availableFrom.value"),
      latitude:
        _.get(listingForm, "latitude.value") &&
        parseFloat(_.get(listingForm, "latitude.value")),
      longitude:
        _.get(listingForm, "longitude.value") &&
        parseFloat(_.get(listingForm, "longitude.value")),
      listingStatus: "New",
      contactNumber: _.get(listingForm, "contactNumber.value"),
      contactEmail: _.get(listingForm, "contactEmail.value"),
      contactNumberDisplayed: _.get(listingForm, "isNumberDisplayed.value"),
      contactEmailAddressDisplayed: _.get(
        listingForm,
        "isEmailDisplayed.value",
        false
      ),
      files: _.get(listingForm, "files.value"),
      listedLocation:
        _.get(listingForm, "selectedLocation.value") || selectedLocation,
    };
    const additionalFeatures = [];

    const parrentCategory = globalUtils.getCategoryById(
      _.get(listingForm, "selectedCategory.value.parent_id"),
      dataList
    );

    additionalFeatures.push({
      key: "postTypeWanted",
      value: _.get(listingForm, "postTypeWanted.value"),
      label: "Post Type",
      productId: 1,
    });
    if (_.get(item, "productID")) {
      payload.productID = _.get(item, "productID");
    }
    const categoryHasAdditionalProperties =
      sellprops.find(
        (property) =>
          _.get(property, "id") ===
          _.get(listingForm, "selectedCategory.value.name") ||
          _.get(property, "id") === parrentCategory?.name
      ) ||
      rentalProps.find(
        (property) =>
          _.get(property, "id") ===
          _.get(listingForm, "selectedParentCategory.value.name") ||
          _.get(property, "id") === parrentCategory?.name
      );
    if (
      !_.isEmpty(categoryHasAdditionalProperties) &&
      !_.isEmpty(categoryHasAdditionalProperties, "properties")
    ) {
      getAdditionalProperties(
        categoryHasAdditionalProperties,
        additionalFeatures
      );
    }
    if (!_.isEmpty(additionalFeatures)) {
      payload.additionalFeatures = additionalFeatures;
    }
    return payload;
  };

  const getRentPayload = () => {
    const payload = {
      type,
      category: _.get(listingForm, "selectedCategory.value.id"),
      productTitle: _.get(listingForm, "productTitle.value"),
      listedPrice: parseFloat(_.get(listingForm, "rent.value")),
      productDescription: _.get(listingForm, "productDescription.value"),
      sponsorListing: false,
      itemDescription: _.get(listingForm, "itemDescription.value"),
      offeredBy: _.get(listingForm, "offeredBy.value"),
      listItemBy: _.get(listingForm, "availableFrom.value")
        ? globalUtils.getFormattedDateWithSourceFormat(
          _.get(listingForm, "availableFrom.value"),
          "DD-MM-YYYY",
          "YYYY-MM-DDThh:mm:ss:000"
        ) + "Z"
        : null,
      anyTime: !_.get(listingForm, "availableFrom.value"),
      latitude:
        _.get(listingForm, "latitude.value") &&
        parseFloat(_.get(listingForm, "latitude.value")),
      longitude:
        _.get(listingForm, "longitude.value") &&
        parseFloat(_.get(listingForm, "longitude.value")),
      listingStatus: "New",
      contactNumber: _.get(listingForm, "contactNumber.value"),
      contactEmail: _.get(listingForm, "contactEmail.value"),
      contactNumberDisplayed: _.get(listingForm, "isNumberDisplayed.value"),
      contactEmailAddressDisplayed: _.get(
        listingForm,
        "isEmailDisplayed.value",
        false
      ),
      files: _.get(listingForm, "files.value"),
      listedLocation:
        _.get(listingForm, "selectedLocation.value") || selectedLocation,
    };
    const parrentCategory = globalUtils.getCategoryById(
      _.get(listingForm, "selectedCategory.value.parent_id"),
      dataList
    );

    const additionalFeatures = [];
    if (_.get(listingForm, "rent.value", ""))
      additionalFeatures.push({
        key: "rent",
        value: _.get(listingForm, "rent.value", ""),
        label: "Rent",
        productId: 1,
      });
    if (_.get(listingForm, "rentDuration.value", ""))
      additionalFeatures.push({
        key: "rentDuration",
        value: _.get(listingForm, "rentDuration.value", ""),
        label: "Rent Duration",
        productId: 2,
      });
    if (_.get(listingForm, "securityDeposit.value", "") === "Yes")
      additionalFeatures.push({
        key: "securityAmount",
        value: _.get(listingForm, "securityAmount.value", ""),
        label: "Security Amount",
        productId: 3,
      });
    const categoryHasAdditionalProperties =
      rentalProps.find(
        (property) =>
          _.get(property, "id") ===
          _.get(listingForm, "selectedCategory.value.name") ||
          _.get(property, "id") === parrentCategory?.name
      ) ||
      rentalProps.find(
        (property) =>
          _.get(property, "id") ===
          _.get(listingForm, "selectedParentCategory.value.name") ||
          _.get(property, "id") === parrentCategory?.name
      );
    if (
      !_.isEmpty(categoryHasAdditionalProperties) &&
      !_.isEmpty(categoryHasAdditionalProperties, "properties")
    ) {
      getAdditionalProperties(
        categoryHasAdditionalProperties,
        additionalFeatures
      );
    }
    if (!_.isEmpty(additionalFeatures)) {
      payload.additionalFeatures = additionalFeatures;
    }
    if (_.get(item, "productID")) {
      payload.productID = _.get(item, "productID");
    }
    return payload;
  };

  const handleSubmit = (token = {}) => {
    const error = getError();

    if (error) {
      setNotification({
        message: error,
        severity: globalConstants.notificationMessageSeverity.WARNING,
      });
      return;
    }

    updateFormStore({
      form: "listingForm",
      field: "isListingSubmitted",
      value: true,
    });
    const isSponsored = _.includes(
      ["featured"],
      _.get(listingForm, "sponsorship.value")
    );

    switch (type) {
      case "rent":
        addListing({ ...getRentPayload(), token, isSponsored });
        setTypeselectPage();
        return;
      case "sell":
        addListing({ ...getSellPayload(), token, isSponsored });
        setTypeselectPage();
        return;
      case "wanted":
      case "task":
        createdWantedListing({
          ...getWantedAndTaskPayload(),
          token,
          isSponsored,
        });
        setTypeselectPage();
        return;
      default:
        break;
    }
  };
  return (
    <>
      <StyledSubmitListing>
        <Container className="submit-button-section">
          {_.get(listingForm, "sponsorship.value") === "featured" &&
            !getError() ? (
              <>
                <StripeButton
                  handleSubmit={handleSubmit}
                  className="submit-listing-button"
                />
              </>
            ) : (
              <Button
                type="submit"
                style={{
                    marginTop: 20,
                    padding: '0 6px 0 9px',
                    fontFamily: 'Dejavu-Sans',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '18px',
                    backgroundColor: '#8c450b',
                    border: '2px solid #8c450b',
                    borderRadius: '5px',
                    alignItems: 'center',
                    width: 150
                }}
                variant="contained"
                color="primary"
                size="medium"
                aria-label="submit listing"
                key={`${getError()}`}
                onClick={() => handleSubmit()}
              >
                Submit
            </Button>
            )}
        </Container>
      </StyledSubmitListing>
      <br />
    </>
  );
};

const StyledSubmitListing = submitListingStyle;
export const SubmitListing = connect(
  submitListingMapStateToProps,
  submitListingMapDispatchToProps
)(SubmitListingComponent);
