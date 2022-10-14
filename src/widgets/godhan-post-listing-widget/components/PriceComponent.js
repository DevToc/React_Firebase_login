import React, { memo } from "react";
import { connect } from "react-redux";
import { priceStyle } from "../style";
import { priceMapDispatchToProps, priceMapStateToProps } from "../models";
import * as _ from "lodash";
import { Grid } from "@material-ui/core";
import {
  updateFormProperty,
  updateFormStore,
  validateField,
  globalUtils,
} from "../../../utils";
import Input from "../../../components/Input-component/InputComponent";
import Select from "../../../components/Select/Select";
import Group from "../../../components/checkbox-rectangle-group/Group";
import FormLabelInfo from "../../../components/FormLabelInfo";
import { validationExp } from "../../../utils/form-validators/FormValidations";

const PriceComponent = (props) => {
  const { listingForm } = props;

  const handleChange = (e) => {
    const { value, name } = e.target;
    updateFormStore({ form: "listingForm", field: name, value });
  };


  const validatePrice = (e) => {
    const { value, name } = e.target;
    if (value) {
      if (new RegExp(validationExp.ISAMOUNT).test(e.target.value)) {
        validateField({ form: "listingForm", field: name, data: value });
      } else {
        updateFormProperty({
          form: "listingForm",
          field: name,
          property: "isValid",
          value: false,
        });
      }
    } else {
      validateField({ form: "listingForm", field: name, data: value });
    }
  }

  const handlePriceBlur = (e) => {
    const { name, value } = e.target;
    if (
      name === "priceFrom" &&
      _.get(listingForm, "priceTo.value") &&
      parseFloat(value) > parseFloat(_.get(listingForm, "priceTo.value"))
    ) {
      updateFormProperty({
        form: "listingForm",
        field: name,
        property: "isValid",
        value: false,
      });
      updateFormProperty({
        form: "listingForm",
        field: "priceTo",
        property: "isValid",
        value: false,
      });
    }
    if (
      name === "priceTo" &&
      _.get(listingForm, "priceFrom.value") &&
      parseFloat(value) < parseFloat(_.get(listingForm, "priceFrom.value"))
    ) {
      updateFormProperty({
        form: "listingForm",
        field: name,
        property: "isValid",
        value: false,
      });
      updateFormProperty({
        form: "listingForm",
        field: "priceFrom",
        property: "isValid",
        value: false,
      });
    } else {
      if (
        _.includes(["priceTo", "priceFrom"], name) &&
        _.get(listingForm, "priceTo.value") &&
        _.get(listingForm, "priceFrom.value")
      ) {
        validateField({
          form: "listingForm",
          field: "priceTo",
          data: _.get(listingForm, "priceTo.value"),
        });
        validateField({
          form: "listingForm",
          field: "priceFrom",
          data: _.get(listingForm, "priceFrom.value"),
        });
      } else {
        validateField({ form: "listingForm", field: name, data: value });
      }
    }
  };

  const getWantedPrice = () => (
    <>
      <div>
        <FormLabelInfo className="form-label">Purpose</FormLabelInfo>
        <Select
          placeholderStyle={{ fontSize: 18, fontWeight: 600 }}
          value={_.get(listingForm, "wantedPurpose.value")}
          onChange={(value) =>
            handleChange({
              target: { name: _.get(listingForm, "wantedPurpose.name"), value },
            })
          }
          options={[
            { value: "Buy", label: "BUY" },
            { value: "Rent", label: "RENT" },
            { value: "Hire", label: "HIRE" },
          ]}
        />
      </div>
      <FormLabelInfo className="form-label">
        <bold>Budget in {globalUtils.getCountryProperty("currency")}</bold>
      </FormLabelInfo>
      <div className="price-range">
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={6} xl={6}>
            <Input
              inputStyle={{ fontWeight: 600, fontSize: 18 }}
              name={_.get(listingForm, "priceFrom.name")}
              placeholder={_.get(listingForm, "priceFrom.placeholder")}
              value={_.get(listingForm, "priceFrom.value")}
              onChange={handleChange}
              onBlur={handlePriceBlur}
              error={!_.get(listingForm, "priceFrom.isValid")}
              errorText={
                !_.get(listingForm, "priceFrom.isValid") &&
                _.get(listingForm, "priceFrom.errorText")
              }
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} xl={6}>
            <Input
              inputStyle={{ fontWeight: 600, fontSize: 18 }}
              name={_.get(listingForm, "priceTo.name")}
              label={_.get(listingForm, "priceTo.placeholder")}
              value={_.get(listingForm, "priceTo.value")}
              onChange={handleChange}
              onBlur={handlePriceBlur}
              error={!_.get(listingForm, "priceTo.isValid")}
              errorText={
                !_.get(listingForm, "priceTo.isValid") &&
                _.get(listingForm, "priceTo.errorText")
              }
            />
          </Grid>
        </Grid>
      </div>
    </>
  );

  const getRender = () => {
    switch (_.get(listingForm, "selectedListingType.value.id")) {
      case "sell":
        return (
          <>
            <div>
              <FormLabelInfo>
                {_.get(listingForm, `listedPrice.placeholder`)}
              </FormLabelInfo>
              <Input
                inputStyle={{ fontWeight: 600, fontSize: 18 }}
                name={_.get(listingForm, `listedPrice.name`)}
                value={_.get(listingForm, `listedPrice.value`)}
                type={_.get(listingForm, `listedPrice.type`)}
                onChange={handleChange}
                onBlur={validatePrice}
                error={!_.get(listingForm, `listedPrice.isValid`)}
                errorText={
                  !_.get(listingForm, `listedPrice.isValid`) &&
                  _.get(listingForm, `listedPrice.errorText`)
                }
              />
            </div>
          </>
        );

      case "rent":
        return (
          <>
            <Grid
              style={{ marginTop: 7 }}
              spacing={3}
              container
              alignItems="center"
            >
              <Grid style={{ paddingTop: 0, paddingBottom: 0 }} item xs={6}>
                <FormLabelInfo>
                  {_.get(listingForm, `rent.placeholder`)}
                </FormLabelInfo>
                <Input
                  inputStyle={{ fontWeight: 600, fontSize: 18 }}
                  name={_.get(listingForm, `rent.name`)}
                  value={_.get(listingForm, `rent.value`)}
                  onChange={handleChange}
                  onBlur={validatePrice}
                  error={!_.get(listingForm, `rent.isValid`)}
                  errorText={
                    !_.get(listingForm, `rent.isValid`) &&
                    _.get(listingForm, `rent.errorText`)
                  }
                  type={_.get(listingForm, 'rent.type')}
                />
              </Grid>
              <Grid style={{ paddingTop: 0, paddingBottom: 0 }} item xs={6}>
                <FormLabelInfo className="form-label">
                  Rent Duration
                </FormLabelInfo>
                <Select
                  placeholderStyle={{ fontSize: 18, fontWeight: 600 }}
                  value={_.get(listingForm, "rentDuration.value")}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: _.get(listingForm, "rentDuration.name"),
                        value,
                      },
                    })
                  }
                  defaultPlaceholder="Rent Duration"
                  options={
                    _.get(listingForm, "category.value.name") !==
                      "Real-Estate & Space"
                      ? [
                        { value: "1 hour", label: "1 Hour" },
                        { value: "4 hours", label: "4 Hours" },
                        { value: "1 Day", label: "1 Day" },
                        { value: "1 Week", label: "1 Week" },
                        { value: "1 Month", label: "1 Month" },
                        { value: "1 Year", label: "1 Year" },
                      ]
                      : [
                        { value: "1 Day", label: "1 Day" },
                        { value: "1 Week", label: "1 Week" },
                        { value: "1 Month", label: "1 Month" },
                        { value: "1 Year", label: "1 Year" },
                      ]
                  }
                />
              </Grid>
              <Grid style={{ paddingTop: 0, paddingBottom: 10 }} xs={6} item>
                <div>
                  <FormLabelInfo className="form-label">
                    Security Deposit
                  </FormLabelInfo>
                  <Select
                    placeholderStyle={{ fontSize: 18, fontWeight: 600 }}
                    value={_.get(listingForm, "securityDeposit.value")}
                    onChange={(value) =>
                      handleChange({
                        target: {
                          name: _.get(listingForm, "securityDeposit.name"),
                          value,
                        },
                      })
                    }
                    defaultPlaceholder="Security Deposit"
                    options={[
                      { value: "Yes", label: "Yes" },
                      { value: "No", label: "No" },
                    ]}
                  />
                </div>
              </Grid>
              <Grid style={{ paddingTop: 0, paddingBottom: 10 }} item xs={6}>
                <FormLabelInfo className="form-label">
                  {_.get(listingForm, `securityAmount.placeholder`)}
                </FormLabelInfo>
                <Input
                  inputStyle={{
                    fontWeight: 600,
                    fontSize: 18,
                    padding: "8px 0 8px 9px",
                  }}
                  disabled={
                    _.get(listingForm, "securityDeposit.value") !== "Yes"
                  }
                  name={_.get(listingForm, `securityAmount.name`)}
                  value={_.get(listingForm, `securityAmount.value`)}
                  onChange={handleChange}
                  type={_.get(listingForm, `securityAmount.type`)}
                  onBlur={validatePrice}
                  error={!_.get(listingForm, `securityAmount.isValid`)}
                  errorText={
                    !_.get(listingForm, `securityAmount.isValid`) &&
                    _.get(listingForm, `securityAmount.errorText`)
                  }
                />
              </Grid>
            </Grid>
          </>
        );
      case "old-wanted":
        return getWantedPrice();
      case "wanted":
      case "task":
        return (
          <>
            {_.get(listingForm, "selectedListingType.value.id") !== "task" && (
              <div style={{ marginTop: 3 }}>
                <FormLabelInfo className="form-label">Purpose</FormLabelInfo>
                <Select
                  placeholderStyle={{ fontSize: 18, fontWeight: 600 }}
                  value={_.get(listingForm, "wantedPurpose.value")}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: _.get(listingForm, "wantedPurpose.name"),
                        value,
                      },
                    })
                  }
                  defaultPlaceholder={_.get(
                    listingForm,
                    "wantedPurpose.placeholder"
                  )}
                  options={[
                    { value: "Buy", label: "Buy" },
                    { value: "Rent", label: "Rent" },
                    { value: "Hire", label: "Hire" },
                  ]}
                />
              </div>
            )}
            <div>
              <FormLabelInfo className="form-label">
                {_.get(listingForm, "category.value.name") === "Employment"
                  ? `Salary in ${globalUtils.getCountryProperty(
                    "currency"
                  )} (*)`
                  : `Budget in ${globalUtils.getCountryProperty(
                    "currency"
                  )} (*)`}
              </FormLabelInfo>
              <Input
                inputStyle={{ fontWeight: 600, fontSize: 18 }}
                name={_.get(listingForm, `listedPrice.name`)}
                value={_.get(listingForm, `listedPrice.value`)}
                onChange={handleChange}
                onBlur={validatePrice}
                type={_.get(listingForm, `listedPrice.type`)}
                error={!_.get(listingForm, `listedPrice.isValid`)}
                errorText={
                  !_.get(listingForm, `listedPrice.isValid`) &&
                  _.get(listingForm, `listedPrice.errorText`)
                }
              />
            </div>
            <div>
              <FormLabelInfo className="form-label">Rate</FormLabelInfo>
              {/* <RadioGroup
                aria-label="isHourly"
                name="isHourly"
                value={_.get(listingForm, "isHourly.value")}
                onChange={handleChange}
                className="rate-radio"
              >
                <FormControlLabel
                  value={
                    _.get(listingForm, "category.value.name") === "Employment"
                      ? "Hourly"
                      : "Fixed Price"
                  }
                  control={<Radio color="primary" />}
                  label={
                    _.get(listingForm, "category.value.name") === "Employment"
                      ? "Hourly"
                      : "Fixed Price"
                  }
                />
                <FormControlLabel
                  value={
                    _.get(listingForm, "category.value.name") === "Employment"
                      ? "Yearly"
                      : "Per Hour"
                  }
                  control={<Radio color="primary" />}
                  label={
                    _.get(listingForm, "category.value.name") === "Employment"
                      ? "Yearly"
                      : "Per Hour"
                  }
                />
              </RadioGroup> */}
              <Group
                boxStyle={{ fontWeight: 600 }}
                value={_.get(listingForm, "isHourly.value")}
                onChange={(value) =>
                  handleChange({ target: { name: "isHourly", value } })
                }
                options={[
                  {
                    value:
                      _.get(listingForm, "category.value.name") === "Employment"
                        ? "Hourly"
                        : "Fixed Price",
                  },
                  {
                    value:
                      _.get(listingForm, "category.value.name") === "Employment"
                        ? "Yearly"
                        : "Per Hour",
                  },
                ]}
              />
            </div>
          </>
        );
      default:
        return <></>;
    }
  };
  return (
    <>
      <StyledPrice>{getRender()}</StyledPrice>
    </>
  );
};

const StyledPrice = priceStyle;

export const Price = connect(
  priceMapStateToProps,
  priceMapDispatchToProps
)(memo(PriceComponent));
