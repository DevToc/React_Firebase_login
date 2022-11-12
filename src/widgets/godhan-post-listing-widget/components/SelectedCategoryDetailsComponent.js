import React from "react";
import { connect } from "react-redux";
import {
  selectedCategoryDetailsMapDispatchToProps,
  selectedCategoryDetailsMapStateToProps,
} from "../models";
import { selectedCategoryDetailsStyle } from "../style";
import { makeStyles } from "@material-ui/core";
import { updateFormStore } from "../../../utils";
import { getTask, getSell } from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
    textTransform: "capitalize",
  },
  link: {
    cursor: "pointer",
    color: "#8c450b",
    textDecoration: "underline",
    margin: "1rem",
    textAlign: "center",
  },
}));

const SelectedCategoryDetailsComponent = (props) => {
  const classes = useStyles();
  const {
    selectedListingType,
    currentLocation,
    selectedLocation,
    updateState,
    listingForm,
  } = props;

  const handleClick = () => {
    updateState("renderedOption", 0);
    updateState("isChangeComponent", true);
    updateFormStore({ form: "listingForm", field: "files", value: "" });
  };

  const getSelectedListingType = () => {
    switch (selectedListingType) {
      case "task":
        return getTask(
          classes,
          selectedListingType,
          selectedLocation,
          currentLocation,
          handleClick
        );
      case "sell":
      case "rent":
      case "wanted":
        return getSell(
          classes,
          selectedListingType,
          listingForm,
          currentLocation,
          selectedLocation,
          handleClick
        );
      default:
        return <></>;
    }
  };

  return (
    <StyledSelectedCategoryDetails>
      {getSelectedListingType()}
    </StyledSelectedCategoryDetails>
  );
};

const StyledSelectedCategoryDetails = selectedCategoryDetailsStyle;

export const SelectedCategoryDetails = connect(
  selectedCategoryDetailsMapStateToProps,
  selectedCategoryDetailsMapDispatchToProps
)(SelectedCategoryDetailsComponent);
