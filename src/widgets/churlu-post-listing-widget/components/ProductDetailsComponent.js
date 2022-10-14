import React from "react";
import { connect } from "react-redux";
import * as _ from "lodash";
import {
  productDetailsMapStateToProps,
  productDetailsMapDispatchToProps,
} from "../models";
import { firstStepProps } from "../utils";
import { updateFormStore, validateField } from "../../../utils";
import Input from "../../../components/Input-component/InputComponent";

const ProductDetailsComponent = ({ listingForm }) => {
  const handleChange = (e) => {
    const { value, name } = e.target;
    updateFormStore({ form: "listingForm", field: name, value });
  };

  const handleBlur = (e) => {
    const { value, name } = e.target;
    validateField({ form: "listingForm", field: name, data: value });
  };

  const getLabel = (object) => {
    switch (object) {
      case "productTitle":
        if (_.get(listingForm, "selectedListingType.value.id") === "task")
          return "Bathroom Renovation, Garden Landscaping, Appliance Installation, Snow removal etc. ";
        break;
      case "productDescription":
        if (_.get(listingForm, "selectedListingType.value.id") === "task")
          return "Describe the current condition, expected condition, area size, material, labor cost etc.";
        break;
      default:
        return _.get(listingForm, `${object}.helperText`);
    }
    return _.get(listingForm, `${object}.helperText`);
  };
  return (
    <div>
      {!_.isEmpty(firstStepProps) &&
        firstStepProps.map((object, key) => (
          <div key={key}>
            <h5 className="form-label">
              {_.get(listingForm, `${object}.placeholder`)}
            </h5>
            <Input
              // id={`${key}_${_.get(listingForm, `${object}.name`)}`}
              name={_.get(listingForm, `${object}.name`)}
              placeholder={getLabel(object)}
              value={_.get(listingForm, `${object}.value`)}
              onChange={handleChange}
              onBlur={handleBlur}
              //rows={5}
              //type={_.get(listingForm, `${object}.type`, "text")}
              error={!_.get(listingForm, `${object}.isValid`)}
              errorText={
                !_.get(listingForm, `${object}.isValid`) &&
                _.get(listingForm, `${object}.errorText`)
              }
            />
  
          </div>
        ))}
    </div>
  );
};

export const ProductDetails = connect(
  productDetailsMapStateToProps,
  productDetailsMapDispatchToProps
)(ProductDetailsComponent);
