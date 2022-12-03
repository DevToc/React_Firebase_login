import React, { useState, useEffect } from "react";
import { makeStyles, FormControlLabel, Checkbox } from "@material-ui/core";
import BackHeader from "../../../components/back-header/BackHeader";
import { connect } from "react-redux";
import {
  categoryListingMapDispatchToProps,
  categoryListingMapStateToProps,
} from "../models";
import Select from "../../../components/Select/Select";
import _get from "lodash/get";
import _includes from "lodash/includes";
import _isEmpty from "lodash/isEmpty";
import { LocationComponent, Notification } from "../../../components";
import { updateFormStore, validateField, globalUtils, updateFormProperty } from "../../../utils";
import { sellprops, rentalProps, formConstants } from "../utils";
import {
  CustomListingDescription,
  MiscProductInformation,
  Price,
  UploadImagesComponent,
  SubmitListing,
} from "./index";
import Group from "../../../components/checkbox-rectangle-group/Group";
import Input from "../../../components/Input-component/InputComponent";
import TextArea from "../../../components/text-area/TextArea";
import { isGoogleMapsEnabled } from "../../../configs/appsettings.json";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Geolocation } from "@ionic-native/geolocation";
import { Link } from "react-router-dom";
import FormLabelInfo from "../../../components/FormLabelInfo";
import DatePickerModal from "./DatePickerModal";
import { validationExp } from "../../../utils/form-validators/FormValidations";

const useStyles = makeStyles({
  page: {
    minHeight: "100vh",
    backgroundColor: "white",
    // display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    //maxWidth: 600,
    width: "100%",
    padding: "0 18px",
  },
  locationContainer: {
    height: "40px",
  },
  secondaryLabel: {
    fontSize: "14px !important",
    color: "#001D48 !important",
    margin: "0 0 5px 5px",
    fontWeight: "500 !important",
  },
});

const AddListing = ({
  setCurrentPage,
  categoryOptions,
  listingForm,
  selectedOption,
  data,
  fetchLocationBySearch,
  locationOptions,
  fetchLocation,
  currentLocation,
  clearCurrentLocation,
  setFormData,
  getUserDetails
}) => {
  const classes = useStyles();
  const [customProps, setCustomProps] = useState(false);
  const [isDatePickerVisible, setIsDateSelectVisible] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    updateFormStore({ form: "listingForm", field: name, value });
  };

  const handleProductTitleChange = (e) => {
    const { value, name } = e.target;
    if (name === 'productTitle' && value.length <= 40) {
      updateFormStore({ form: "listingForm", field: name, value });
    }
    if (name === 'productDescription' && value.length <= 4000) {
      updateFormStore({ form: "listingForm", field: name, value });
    }
  }


  const handleBlur = (e) => {
    const { value, name } = e.target;
    if (['productTitle'].includes(name) && value) {
      if (new RegExp(validationExp.ISSPACED).test(e.target.value)) {
        validateField({ form: "listingForm", field: name, data: value });
      } else {
        updateFormProperty({
          form: "listingForm",
          field: name,
          property: "isValid",
          value: false,
        })
      }
      return;
    }
    validateField({ form: "listingForm", field: name, data: value });
  };

  const getLabel = (object) => {
    switch (object) {
      case "productTitle":
        if (_get(listingForm, "selectedListingType.value.id") === "task")
          return "Bathroom Renovation, Garden Landscaping, Appliance Installation, Snow removal etc. ";
        break;
      case "productDescription":
        if (_get(listingForm, "selectedListingType.value.id") === "task")
          return "Describe the current condition, expected condition, area size, material, labor cost etc.";
        break;
      default:
        return _get(listingForm, `${object}.helperText`);
    }
    return _get(listingForm, `${object}.helperText`);
  };

  const thirdLayer = listingForm?.thirdLayerCategory?.value;

  const [selectedCategoryParrentId, setSelectedCategoryParrentId] = useState(
    thirdLayer
      ? thirdLayer.parent_id
      : _get(listingForm, "selectedCategory.value.parent_id") || 1
  );

  const selectedParentCategory = categoryOptions?.children?.find(
    (option) => option.id === selectedCategoryParrentId
  );

  const handleCategorySelect = (id) => {
    const categoryFound =
      thirdLayer.children?.find((option) => option.id === id) ||
      selectedParentCategory.children?.find((option) => option.id === id);

    updateFormStore({
      form: "listingForm",
      field: "selectedCategoryName",
      value: "",
    });

    if (categoryFound.children?.length > 0) {
      updateFormStore({
        form: "listingForm",
        field: "thirdLayerCategory",
        value: categoryFound,
      });

      return;
    }

    updateFormStore({
      form: "listingForm",
      field: "selectedCategory",
      value: categoryFound,
    });
    updateFormStore({
      form: "listingForm",
      field: "selectedCategoryName",
      value: categoryFound.name,
    });
  };

  const handleParentCategorySelect = (id) => {
    setSelectedCategoryParrentId(id);

    updateFormStore({
      form: "listingForm",
      field: "thirdLayerCategory",
      value: false,
    });

    if (id === 1) {
      updateFormStore({
        form: "listingForm",
        field: "selectedCategory",
        value: "",
      });
      updateFormStore({
        form: "listingForm",
        field: "selectedCategoryName",
        value: "",
      });
      updateFormStore({
        form: "listingForm",
        field: "selectedParentCategory",
        value: null,
      });

      return;
    }

    const categoryFound = categoryOptions.children.find(
      (option) => option.id === id
    );

    updateFormStore({
      form: "listingForm",
      field: "selectedParentCategory",
      value: categoryFound,
    });

    if (_isEmpty(categoryFound.children)) {
      updateFormStore({
        form: "listingForm",
        field: "selectedCategory",
        value: categoryFound,
      });
      updateFormStore({
        form: "listingForm",
        field: "selectedCategoryName",
        value: categoryFound.name,
      });
    }
  };

  const handleLocationChange = (value) => {
    if (isGoogleMapsEnabled) {
      updateFormStore({ form: "listingForm", field: "searchBy", value });
    } else if (value.length > 0 && value.length % 2 === 0) {
      fetchLocationBySearch({
        search: value,
      });
    }
  };

  const handleLocationSelect = (value) => {
    if (isGoogleMapsEnabled) {
      geocodeByAddress(value)
        .then(async (results) => {
          const res = await getLatLng(results[0]);
          if (!_isEmpty(res)) {
            try {
              updateFormStore({
                form: "listingForm",
                field: "latitude",
                value: _get(res, "lat"),
              });
              updateFormStore({
                form: "listingForm",
                field: "longitude",
                value: _get(res, "lng"),
              });
              updateFormStore({
                form: "listingForm",
                field: "selectedLocation",
                value,
              });
              updateFormStore({
                form: "listingForm",
                field: "searchBy",
                value: value,
              });
            } catch (err) {
              console.error("error updating location to store");
            }
          }
        })
        .catch((error) => console.error("Error", error));
    } else {
      if (!_isEmpty(value)) {
        updateFormStore({
          form: "listingForm",
          field: "latitude",
          value: _get(value, "latitude"),
        });
        updateFormStore({
          form: "listingForm",
          field: "longitude",
          value: _get(value, "longitude"),
        });
        updateFormStore({
          form: "listingForm",
          field: "selectedLocation",
          value: _get(value, "area"),
        });
      }
    }
  };

  const handleCurrentLocationClick = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      updateFormStore({
        form: "listingForm",
        field: "latitude",
        value: _get(position, "coords.latitude"),
      });
      updateFormStore({
        form: "listingForm",
        field: "longitude",
        value: _get(position, "coords.longitude"),
      });
      fetchLocation({
        latitude: _get(position, "coords.latitude"),
        longitude: _get(position, "coords.longitude"),
      });
    } catch (e) {
      window.alert("Search with location for better results");
    }
  };

  useEffect(() => {
    let categoryHasAdditionalProperties;
    switch (selectedOption.id) {
      case "sell":
        categoryHasAdditionalProperties = sellprops.find(
          (property) =>
            _get(property, "id") ===
            _get(listingForm, "selectedCategory.value.name") ||
            (!_isEmpty(_get(listingForm, "selectedCategory.value")) &&
              _get(property, "id") === selectedParentCategory?.name)
        );
        break;
      case "rent":
        categoryHasAdditionalProperties = rentalProps.find(
          (property) =>
            _get(property, "id") ===
            _get(listingForm, "selectedCategory.value.name") ||
            (!_isEmpty(_get(listingForm, "selectedCategory.value")) &&
              _get(property, "id") === selectedParentCategory?.name)
        );
        break;
      default:
        // categoryHasAdditionalProperties = {};
        break;
    }

    if (!_isEmpty(categoryHasAdditionalProperties)) {
      setCustomProps(true);
    }
    // eslint-disable-next-line
  }, [_get(listingForm, "selectedCategory.value")]);

  const getCustomProperties = () => {
    let categoryHasAdditionalProperties;

    switch (selectedOption.id) {
      case "sell":
        categoryHasAdditionalProperties = sellprops.find(
          (property) =>
            _get(property, "id") ===
            _get(listingForm, "selectedCategory.value.name") ||
            (!_isEmpty(_get(listingForm, "selectedCategory.value")) &&
              _get(property, "id") === selectedParentCategory?.name)
        );
        break;
      case "rent":
        categoryHasAdditionalProperties = rentalProps.find(
          (property) =>
            _get(property, "id") ===
            _get(listingForm, "selectedCategory.value.name") ||
            (!_isEmpty(_get(listingForm, "selectedCategory.value")) &&
              _get(property, "id") === selectedParentCategory?.name)
        );
        break;
      default:
        // categoryHasAdditionalProperties = {};
        break;
    }
    // setCustomProps(!!categoryHasAdditionalProperties);
    return (
      categoryHasAdditionalProperties && (
        <CustomListingDescription
          additionalProps={categoryHasAdditionalProperties}
        />
      )
    );
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    updateFormStore({ form: "listingForm", field: name, value: checked });
  };

  const handleGoBack = () => {
    const option = _get(listingForm, "selectedListingType.value");
    const loc = localStorage.getItem("godhan-display-location");
    setFormData({
      listingForm: {
        ...formConstants.listingForm,
        selectedListingType: {
          ..._get(formConstants, 'listingForm.selectedListingType'),
          value: option
        },
        contactEmail: {
          ..._get(formConstants, 'listingForm.contactEmail'),
          value: _get(listingForm, "contactEmail.value")
        },
        contactNumber: {
          ..._get(formConstants, 'listingForm.contactNumber'),
          value: _get(listingForm, "contactNumber.value")
        },
        selectedLocation: {
          ..._get(formConstants, 'listingForm.selectedLocation'),
          value: _get(listingForm, 'selectedLocation.value') || _get(loc, "selectedLocation")
        },
        latitude: {
          ..._get(formConstants, 'listingForm.latitude'),
          value: _get(listingForm, 'latitude.value')
        },
        longitude: {
          ..._get(formConstants, 'listingForm.longitude'),
          value: _get(listingForm, 'longitude.value')
        },
        listedPrice: {
          ..._get(listingForm, 'listedPrice'),
          placeholder: `Price in ${globalUtils.getCountryProperty("currency")} *`
        },
        rent: {
          ..._get(listingForm, 'rent'),
          placeholder: `Rent in ${globalUtils.getCountryProperty("currency")} *`
        },
        securityAmount: {
          ..._get(listingForm, 'securityAmount'),
          placeholder: `Security Amount(${globalUtils.getCountryProperty("currency")})`,
        }
      }
    });
    // updateFormStore({
    //   form: "listingForm",
    //   field: "selectedListingType",
    //   value: option,
    // });
    setCurrentPage("typeSelect");
  };

  return (
    <>
      <div className={classes.page}>
        {!isDatePickerVisible && (
          <BackHeader
            title={globalUtils.getCurrentPage() === 'listing' ? "Adding a Listing" : "Editing a Listing"}
            onGoBack={() => handleGoBack()}
          />
        )}
        <div className={classes.container}>
          <div
            style={{
              position: "fixed",
              top: 30,
              left: 0,
              display: "flex",
              justifyContent: "center",
              zIndex: 50,
              width: "100%",
            }}
          >
            <Notification style={{ backgroundColor: "white" }} />
          </div>
          {selectedOption.id !== "task" &&
            categoryOptions &&
            categoryOptions.children && (
              <>
                <h5 className="form-label">Set Category (*)</h5>
                <Select
                  optionsContainerStyle={{ zIndex: 7 }}
                  placeholderStyle={{ fontSize: 18, fontWeight: 600 }}
                  style={{ marginBottom: 18 }}
                  value={selectedCategoryParrentId}
                  onChange={handleParentCategorySelect}
                  options={[
                    { label: "All Categories", value: '' },
                    ...categoryOptions.children.map((option) => ({
                      label: option.name,
                      value: option.id,
                    })),
                  ]}
                  selectStyle={{ height: 40 }}
                />
              </>
            )}
          {selectedCategoryParrentId &&
            selectedCategoryParrentId !== 1 &&
            !_isEmpty(selectedParentCategory?.children) && (
              <Select
                optionsContainerStyle={{ zIndex: 6 }}
                placeholderStyle={{ fontSize: 18, fontWeight: 600 }}
                style={{ marginBottom: 18 }}
                defaultPlaceholder="Set Type"
                value={
                  thirdLayer &&
                    listingForm.selectedCategory?.value.name !== "Other Tools"
                    ? thirdLayer.id
                    : _get(listingForm, "selectedCategory.value.id")
                }
                onChange={handleCategorySelect}
                options={selectedParentCategory.children.map((option) => ({
                  label: option.name,
                  value: option.id,
                }))}
                selectStyle={{ height: 40 }}
              />
            )}

          {thirdLayer &&
            listingForm?.selectedCategoryName?.value !== "Other Tools" &&
            !_isEmpty(thirdLayer?.children) && (
              <Select
                optionsContainerStyle={{ zIndex: 6 }}
                placeholderStyle={{ fontSize: 18, fontWeight: 600 }}
                style={{ marginBottom: 18 }}
                defaultPlaceholder="Set Type"
                value={_get(listingForm, "selectedCategory.value.id")}
                onChange={handleCategorySelect}
                options={thirdLayer.children.map((option) => ({
                  label: option.name,
                  value: option.id,
                }))}
                selectStyle={{ height: 40 }}
              />
            )}
          {_get(selectedOption, "id") === "task" && <br />}
          <LocationComponent
            userDetails={getUserDetails}
            fetchLocation={fetchLocation}
            formSearchByFieldValue={_get(listingForm, "searchBy.value")}
            handleChange={handleLocationChange}
            handleSelect={handleLocationSelect}
            placeholder="Set Location (*)"
            useCurrentLocation
            handleCurrentLocationClick={handleCurrentLocationClick}
            style={{ marginBottom: 8 }}
            inputStyle={{
              paddingTop: 7,
              paddingBottom: 7,
              fontSize: 18,
              fontWeight: 600,
            }}
            containerStyle={classes.locationContainer}
          />
          {(_get(listingForm, "selectedCategory.value") ||
            _get(selectedOption, "id") === "task") && (
              <>
                {" "}
                <h5 className="form-label">
                  {_get(listingForm, `productTitle.placeholder`)}
                </h5>
                <Input
                  // id={`${key}_${_.get(listingForm, `${object}.name`)}`}
                  inputStyle={{ fontWeight: 600, fontSize: 18 }}
                  name={_get(listingForm, `productTitle.name`)}
                  placeholder={getLabel("productTitle")}
                  value={_get(listingForm, `productTitle.value`)}
                  onChange={handleProductTitleChange}
                  onBlur={handleBlur}
                  //type={_get(listingForm, `productTitle.type`, "text")}
                  error={!_get(listingForm, `productTitle.isValid`)}
                  errorText={
                    !_get(listingForm, `productTitle.isValid`) &&
                    _get(listingForm, `productTitle.errorText`)
                  }
                />
                {/* <ProductDetails /> */}
                <Price />
                {getCustomProperties()}
              </>
            )}
          {_includes(
            ["sell", "rent"],
            _get(listingForm, "selectedListingType.value.id")
          ) && (
              <div
                style={{
                  marginTop: customProps ? 0 : 7,
                  paddingTop: customProps ? 0 : 7,
                }}
              >
                {_get(listingForm, "selectedCategory.value") &&
                  _includes(
                    ["sell"],
                    _get(listingForm, "selectedListingType.value.id")
                  ) && (
                    <>
                      <FormLabelInfo className="form-label">
                        Post Type (*)
                    </FormLabelInfo>
                      <Group
                        boxStyle={{ fontWeight: 600 }}
                        value={_get(listingForm, "postTypeWanted.value")}
                        onChange={(value) =>
                          handleChange({
                            target: { name: "postTypeWanted", value },
                          })
                        }
                        options={[{ value: "Offered" }, { value: "Wanted" }]}
                      />
                    </>
                  )}
                <h5 className="form-label">Item condition (*)</h5>
                <Group
                  boxStyle={{ fontWeight: 600 }}
                  value={_get(listingForm, "itemDescription.value")}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: _get(listingForm, "itemDescription.name"),
                        value,
                      },
                    })
                  }
                  options={[
                    {
                      value: _includes(
                        _get(listingForm, "selectedListingType.value.id"),
                        "rent"
                      )
                        ? "Average"
                        : "Old",
                    },
                    {
                      value: _includes(
                        _get(listingForm, "selectedListingType.value.id"),
                        "rent"
                      )
                        ? "Excellent"
                        : "New",
                    },
                  ]}
                />
                <h5 className="form-label">Posting as? (*)</h5>
                <Group
                  boxStyle={{ fontWeight: 600 }}
                  value={_get(listingForm, "offeredBy.value")}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: _get(listingForm, "offeredBy.name"),
                        value,
                      },
                    })
                  }
                  options={[{ value: "Individual" }, { value: "Business" }]}
                />
              </div>
            )}
          {(_get(listingForm, "selectedCategory.value") ||
            selectedOption.id === "task") && (
              <MiscProductInformation
                selectedOption={selectedOption}
                onOpenDatePicker={() => setIsDateSelectVisible(true)}
              />
            )}
          {(_get(listingForm, "selectedCategory.value") ||
            selectedOption.id === "task") && (
              <>
                <h5 style={{ paddingBottom: 0 }} className="form-label" id="upload-section">
                  Upload Photo
              </h5>
                <h6 className={classes.secondaryLabel}>Upload upto 12 photos</h6>
                <UploadImagesComponent
                  onClickButton={() => setCurrentPage("addImages")}
                  images={_get(listingForm, "files.value")}
                />
                <h5 style={{ paddingTop: 20 }} className="form-label">
                  Description (*)
              </h5>
                <TextArea
                  // id={`${key}_${_.get(listingForm, `${object}.name`)}`}
                  name={_get(listingForm, `productDescription.name`)}
                  placeholder={getLabel("productDescription")}
                  value={_get(listingForm, `productDescription.value`)}
                  onChange={handleProductTitleChange}
                  onBlur={handleBlur}
                  rows={5}
                  //type={_get(listingForm, `productDescription.type`, "text")}
                  error={!_get(listingForm, `productDescription.isValid`)}
                  errorText={
                    !_get(listingForm, `productDescription.isValid`) &&
                    _get(listingForm, `productDescription.errorText`)
                  }
                />
              </>
            )}
          <h5 className="form-label">Contact Information</h5>
          <Input
            inputStyle={{ fontWeight: 600, fontSize: 18 }}
            name={_get(listingForm, `contactNumber.name`)}
            placeholder="Contact Number unavailable"
            value={_get(listingForm, `contactNumber.value`)}
            disabled
          />
          {_get(listingForm, "contactNumber.value", "") ? (
            <FormControlLabel
              name="isNumberDisplayed"
              control={
                <Checkbox
                  color="primary"
                  value={_get(listingForm, "isNumberDisplayed.value")}
                  onChange={handleCheckbox}
                  checked={_get(listingForm, "isNumberDisplayed.value")}
                />
              }
              label="Display your contact no. in the post?"
              className="contact-label"
            />
          ) : (
              <div className="contact-label">
                <span className="MuiTypography-root">
                  Update your contact no. <Link to="/profile?type=editProfile"> here.</Link>
                </span>
              </div>
            )}
          <Input
            style={{ marginTop: 10 }}
            inputStyle={{ fontWeight: 600, fontSize: 18 }}
            name={_get(listingForm, `contactEmail.name`)}
            placeholder="Email Address unavailable"
            value={_get(listingForm, `contactEmail.value`)}
            disabled
          />
          {_get(listingForm, `contactEmail.value`) ? (
            <FormControlLabel
              name="isEmailDisplayed"
              control={
                <Checkbox
                  color="primary"
                  value={_get(listingForm, "isEmailDisplayed.value")}
                  onChange={handleCheckbox}
                  checked={_get(listingForm, "isEmailDisplayed.value")}
                />
              }
              label="Display your contact email in the post?"
              className="contact-label"
            />
          ) : (
              <div className="contact-label">
                <span className="MuiTypography-root">
                  Update your contact email <Link to="/profile?type=editProfile"> here.</Link>
                </span>
              </div>
            )}
          {(_get(listingForm, "selectedCategory.value") ||
            selectedOption.id === "task") && (
              <>
                <SubmitListing
                  setTypeselectPage={() => setCurrentPage("typeSelect")}
                />
              </>
            )}
        </div>
      </div>
      {isDatePickerVisible && (
        <DatePickerModal onClose={() => setIsDateSelectVisible(false)} />
      )}
    </>
  );
};

const AddListingPage = connect(
  categoryListingMapStateToProps,
  categoryListingMapDispatchToProps
)(AddListing);

export { AddListingPage };
