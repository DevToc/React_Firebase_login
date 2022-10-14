import * as _ from "lodash";
import { globalUtils, updateFormStore } from "../../../utils";
import {
  priceFields,
  contactInformationFields,
  categoryFields,
  productFields,
  rentProps,
  rentalProps,
  FieldType,
} from "./index";
import moment from "moment";
import { sellprops } from "./SellProperties.props";

export const updateListingDate  = (itemUnderEdit) => {
  if (_.get(itemUnderEdit, "listItemBy") || _.get(itemUnderEdit, "wantedOnOrBefore")) {
    console.log(_.get(itemUnderEdit, "listItemBy"), 'listItemBy')
    updateFormStore({
      form: 'listingForm',
      field: 'availableFrom',
      value: _.get(itemUnderEdit, "listItemBy") || _.get(itemUnderEdit, "wantedOnOrBefore"),
    })
  }
}

export const mapToRequest = (item, dataList) => {
  updateFormStore({
    form: "listingForm",
    field: "selectedListingType",
    value: { id: _.get(item, "type") },
  });
  updateFormStore({
    form: "listingForm",
    field: "availableAnytime",
    value: !(_.get(item, "listItemBy") || _.get(item, "wantedOnOrBefore")),
  });
  const postTypeWanted = item.additionalFeatures?.find(
    (feature) => feature.key === "postTypeWanted"
  );

  const floorArea = item.additionalFeatures?.find(
    (feature) => feature.key === "floorArea"
  );

  if (floorArea) {
    updateFormStore({
      form: "listingForm",
      field: "floorArea",
      value: floorArea.value,
    });
  }

  if (postTypeWanted) {
    updateFormStore({
      form: "listingForm",
      field: "postTypeWanted",
      value: postTypeWanted.value,
    });
  }

  priceMapper(item);
  const categoryName = contactAndCategoryFieldsMapper(item, dataList);
  mapProductFields(item, categoryName);
  imageMapper(item);
  rentMapper(item);
  additionalPropsMapper(item, categoryName, dataList);
  locationMapper(item);
};

const locationMapper = (item) => {
  updateFormStore({
    form: "listingForm",
    field: "latitude",
    value: _.get(item, "latitude"),
  });
  updateFormStore({
    form: "listingForm",
    field: "longitude",
    value: _.get(item, "longitude"),
  });
  updateFormStore({
    form: "listingForm",
    field: "searchBy",
    value: _.get(item, "listedLocation"),
  });
  updateFormStore({
    form: "listingForm",
    field: "selectedLocation",
    value: _.get(item, "listedLocation"),
  });
};

const rentMapper = (item) => {
  if (_.get(item, "type") === "rent") {
    const rentProperties = _.get(item, "additionalFeatures").filter((val) =>
      _.includes(rentProps, val.key)
    );
    if (!_.isEmpty(rentProperties)) {
      rentProperties.forEach((property) => {
        updateFormStore({
          form: "listingForm",
          field: property.key,
          value: property.value,
        });
        if (property.key === "securityAmount") {
          updateFormStore({
            form: "listingForm",
            field: "securityDeposit",
            value: "Yes",
          });
        }
      });
    }
    const securityDepositFlag = rentProperties.find(
      (val) => val.key === "securityAmount"
    );
    if (_.isEmpty(securityDepositFlag)) {
      updateFormStore({
        form: "listingForm",
        field: "securityDeposit",
        value: "No",
      });
    }
  }
};
const imageMapper = (item) => {
  if (_.get(item, "imageURL.length", 0) > 0) {
    const files = Array.apply(null, Array(10));
    for (var i = 0; i < _.get(item, "imageURL.length", 0) && i < 10; i++) {
      files[i] = item.imageURL[i];
    }
    setTimeout(() => {
      for (var i = 0; i < _.get(item, "imageURL.length", 0) && i < 10; i++) {
        if (document.getElementById(i))
          document.getElementById(i).src = item.imageURL[i];
      }
    }, 10);
    updateFormStore({ form: "listingForm", field: "files", value: files });
  }
};

const priceMapper = (item) => {
  priceFields.forEach((price) => {
    if (_.includes(price.type, _.get(item, "type")) && _.get(item, price.id)) {
      updateFormStore({
        form: "listingForm",
        field: price.field,
        value: _.get(item, price.id),
      });
    }
  });
  if (_.includes(["wanted", "rent"], _.get(item, "type")))
    updateFormStore({
      form: "listingForm",
      field: "wantedPurpose",
      value: _.get(item, "itemDescription"),
    });
  updateFormStore({
    form: "listingForm",
    field: "isHourly",
    value: _.get(item, "rateType"),
  });
};

const mapProductFields = (item) => {
  productFields.forEach((field) => {
    if (_.get(item, field.id) && !_.get(field, "isDateFormat")) {
      updateFormStore({
        form: "listingForm",
        field: field.field,
        value: _.get(item, field.id),
      });
    } else if (_.get(item, field.id) && _.get(field, "isDateFormat")) {
      const dateObject = new Date(
        moment().locale("en").format(_.get(item, field.isDateFormat))
      );
      updateFormStore({
        form: "listingForm",
        field: field.field,
        value: dateObject,
      });
    }
  });
};

const contactAndCategoryFieldsMapper = (item, dataList) => {
  contactInformationFields.forEach((cont) => {
    if (_.get(item, cont.id))
      updateFormStore({
        form: "listingForm",
        field: cont.field,
        value: _.get(item, cont.id),
      });
  });
  categoryFields.forEach((field) => {
    if (_.get(item, field.id))
      updateFormStore({
        form: "listingForm",
        field: field.field,
        value: _.get(item, field.id),
      });
  });
  const categoryName = getCategoryValue(item, dataList);
  updateFormStore({
    form: "listingForm",
    field: "offeredBy",
    value: _.get(item, "offeredBy"),
  });
  if (_.get(item, "type") === "rent") {
    updateFormStore({
      form: "listingForm",
      field: "itemDescription",
      value: _.get(item, "itemDescription"),
    });
  } else if (_.get(item, "type") === "sell") {
    updateFormStore({
      form: "listingForm",
      field: "itemDescription",
      value: _.get(item, "itemDescription"),
    });
  }
  return categoryName;
};

const getCategoryValue = (item, dataList) => {
  const { sellList, rentList } = dataList;
  var parentCategory = {};
  switch (_.get(item, "type")) {
    case "sell":
      const sellItemFound = sellList.find(
        (val) => val.id === _.get(item, "category")
      );
      if (!_.isEmpty(sellItemFound)) {
        const parentID = sellItemFound.parent_id;
        parentCategory = sellList.find((val) => val.id === parentID);
      }
      return _.get(parentCategory, "name");
    case "rent":
      const rentItemFound = rentList.find(
        (val) => val.id === _.get(item, "category")
      );
      if (!_.isEmpty(rentItemFound)) {
        const rentParentID = rentItemFound.parent_id;
        parentCategory = rentList.find((val) => val.id === rentParentID);
      }
      return _.get(parentCategory, "name");
    default:
      return "None";
  }
};

const additionalPropsMapper = (item, categoryName, dataList) => {
  var categoryHasAdditionalProperties;
  switch (_.get(item, "type")) {
    case "sell":
      categoryHasAdditionalProperties = sellprops.find(
        (property) => _.get(property, "id") === _.get(item, "categoryName")
      );
      updateFormStore({
        form: "listingForm",
        field: "category",
        value: { name: _.get(item, "categoryName") },
      });
      const category = globalUtils.getCategoryById(item.category, dataList);
      updateFormStore({
        form: "listingForm",
        field: "selectedCategory",
        value: category,
      });
      if (_.isEmpty(categoryHasAdditionalProperties)) {
        categoryHasAdditionalProperties = sellprops.find(
          (property) => _.get(property, "id") === categoryName
        );
        updateFormStore({
          form: "listingForm",
          field: "category",
          value: { name: categoryName },
        });
      }
      break;
    case "rent":
      categoryHasAdditionalProperties = rentalProps.find(
        (property) => _.get(property, "id") === _.get(item, "categoryName")
      );
      updateFormStore({
        form: "listingForm",
        field: "category",
        value: { name: _.get(item, "categoryName") },
      });
      const categoryRent = globalUtils.getCategoryById(item.category, dataList);
      updateFormStore({
        form: "listingForm",
        field: "selectedCategory",
        value: categoryRent,
      });
      if (_.isEmpty(categoryHasAdditionalProperties)) {
        categoryHasAdditionalProperties = rentalProps.find(
          (property) => _.get(property, "id") === categoryName
        );
        updateFormStore({
          form: "listingForm",
          field: "category",
          value: { name: categoryName },
        });
      }
      break;
    case "wanted":
      const categoryWanted = globalUtils.getCategoryById(
        item.category,
        dataList
      );
      updateFormStore({
        form: "listingForm",
        field: "selectedCategory",
        value: categoryWanted,
      });
      break;
    default:
      // categoryHasAdditionalProperties = {};
      break;
  }
  if (!_.isEmpty(categoryHasAdditionalProperties)) {
    mapAdditionalProperties(categoryHasAdditionalProperties, item);
  }
};

const mapAdditionalProperties = (additionalFields, item) => {
  !_.isEmpty(additionalFields, "properties") &&
    additionalFields.properties.forEach((singleField) => {
      var valueObject = {};

      switch (singleField.fieldType) {
        case FieldType.TEXTBOX:
          valueObject = _.get(item, "additionalFeatures").find(
            (val) => val.label === singleField.label
          );
          if (!_.isEmpty(valueObject)) {
            if (!_.isEmpty(singleField, "options")) {
              const splitString = valueObject.value.split(" ");
              if (splitString.length > 1) {
                updateFormStore({
                  form: "listingForm",
                  field: singleField.field,
                  value: splitString[0],
                });
                updateFormStore({
                  form: "listingForm",
                  field: _.get(singleField, "additionalProperty.name"),
                  value: splitString[1],
                });
                return;
              }
            }
            updateFormStore({
              form: "listingForm",
              field: valueObject.key,
              value: valueObject.value,
            });
          }
          break;
        case FieldType.TOGGLE:
          valueObject = _.get(item, "additionalFeatures").find(
            (val) => val.label === singleField.label
          );
          if (_.get(valueObject, 'value') === singleField.options[0]) {
            updateFormStore({
              form: "listingForm",
              field: singleField.field,
              value: singleField.options[0] === valueObject.value,
            });
          }
          break;
        case FieldType.SELECT_DROPDOWN:
        case FieldType.RADIO:
          valueObject = _.get(item, "additionalFeatures").find(
            (val) => val.label === singleField.label
          );
          if (!_.isEmpty(valueObject)) {
            updateFormStore({
              form: "listingForm",
              field: valueObject.key,
              value: valueObject.value,
            });
          }
          break;
        case FieldType.CHECKBOX:
          valueObject = _.get(item, "additionalFeatures").find(
            (val) => val.label === singleField.label
          );
          if (_.get(valueObject, "value")) {
            const splitString = valueObject.value.split(",");
            if (splitString.length > 0) {
              splitString.forEach((singleString) => {
                updateFormStore({
                  form: "listingForm",
                  field: singleString.trim(),
                  value: true,
                });
              });
            }
          }
          break;
        default:
          break;
      }
    });
};
