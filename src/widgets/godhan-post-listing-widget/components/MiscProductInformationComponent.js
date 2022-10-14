import React, { memo } from "react";
import { connect } from "react-redux";
import {
  misProductInformationMapDispatchToProps,
  miscProductInformationMapStateToProps,
} from "../models";
import { miscProductInformationStyle } from "../style";
import { Grid, IconButton, Switch, useMediaQuery } from "@material-ui/core";
import * as _ from "lodash";
import { updateFormStore } from "../../../utils";
import Input from "../../../components/Input-component/InputComponent";
import moment from "moment";
import CalendarIcon from "@material-ui/icons/DateRange";

const MiscProductInformationComponent = ({
  listingForm,
  selectedOption,
  onOpenDatePicker,
}) => {
  const match = useMediaQuery("(max-width: 350px)");

  const handleDateChange = (value, e) => {
    updateFormStore({
      form: "listingForm",
      field: "availableFrom",
      value: value && value.replaceAll("/", "-"),
    });
    updateFormStore({
      form: "listingForm",
      field: "availableAnytime",
      value: false,
    });
  };

  const getDateValue = () => {
    let val = _.get(listingForm, "availableFrom.value") ?? "";

    if (typeof val === "object") {
      return moment(val).format("DD/MMM/YYYY");
    }

    if (!val) return "";

    return moment(val, "DD-MM-YYYY").format("DD-MMM-YYYY");
  };

  const handleDateToggle = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      updateFormStore({
        form: "listingForm",
        field: "availableFrom",
        value: null,
      });
    } else {
      updateFormStore({
        form: "listingForm",
        field: "availableFrom",
        value: moment(Date.now()).format("DD-MM-YYYY"),
      });
    }
    updateFormStore({ form: "listingForm", field: name, value: checked });
  };

  return (
    <>
      <StyledMiscInformation>
        <Grid
          // style={{ marginTop: 10 }}
          container
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={12}>
            <h5 className="form-label">
              {_.includes(["task"], selectedOption?.id)
                ? "Required By"
                : "Available from?"}
            </h5>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Input  
                inputStyle={
                  match
                    ? {
                        paddingLeft: 0,
                        marginLeft: 5,
                        fontWeight: 600,
                        fontSize: 18,
                      }
                    : { fontWeight: 600, fontSize: 18 }
                }
                value={getDateValue()}
                onChange={(e) => handleDateChange(e.target.value, e)}
                //placeholder="DD/MM/YYYY"
                //numberFormat
                //format="##/##/####"
                //mask="_"
                disabled
                disabledWithoutGrayBg
                onClick={
                  _.get(listingForm, "availableAnytime.value")
                    ? null
                    : onOpenDatePicker
                }
                right={
                  <IconButton
                    onClick={onOpenDatePicker}
                    disabled={_.get(listingForm, "availableAnytime.value")}
                  >
                    <CalendarIcon />
                  </IconButton>
                }
              />
              <Switch
                checked={_.get(listingForm, "availableAnytime.value")}
                onChange={handleDateToggle}
                name={_.get(listingForm, "availableAnytime.name")}
                color="primary"
              />
              <span>Immediately</span>
            </div>
          </Grid>
        </Grid>
      </StyledMiscInformation>
    </>
  );
};

const StyledMiscInformation = miscProductInformationStyle;
export const MiscProductInformation = connect(
  miscProductInformationMapStateToProps,
  misProductInformationMapDispatchToProps
)(memo(MiscProductInformationComponent));
