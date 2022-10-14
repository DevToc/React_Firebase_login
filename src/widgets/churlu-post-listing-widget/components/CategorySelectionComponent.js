import React from "react";
import { connect } from "react-redux";
import {
  createSelectionMapDispatchToProps,
  createSelectionMapStateToProps,
} from "../models";
import { categoryOptionsProps } from "../utils";
import * as _ from "lodash";
import { Card, Grid, Typography, useTheme } from "@material-ui/core";
import { categorySelectionStyle } from "../style";
import { globalUtils, updateFormStore } from "../../../utils";

const CategorySelectionComponent = (props) => {
  const { selectedOption, isChangeComponent } = props;

  const handleClick = (option) => {
    updateFormStore({
      form: "listingForm",
      field: "selectedListingType",
      value: option,
    });
    if (_.includes(["task"], option.id)) {
      updateFormStore({
        form: "listingForm",
        field: "selectedCategory",
        value: "none",
      });
      globalUtils.scrollTo("location-title");
    } else {
      updateFormStore({
        form: "listingForm",
        field: "selectedCategory",
        value: 0,
      });
      updateFormStore({
        form: "listingForm",
        field: "selectedCategoryName",
        value: "",
      });
      globalUtils.scrollTo("category-listing");
    }
  };

  return (
    <>
      <StyledCategory theme={useTheme()}>
        {(!isChangeComponent || (isChangeComponent && !selectedOption)) && (
          <>
            <Grid container alignItems="center" justify="center" spacing={1}>
              {!_.isEmpty(categoryOptionsProps) &&
                categoryOptionsProps.map((option, key) => (
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={4}
                    lg={3}
                    id={key}
                    className="listing-options-section"
                  >
                    <Card
                      className={`card ${
                        selectedOption === option && "primary-color"
                      } `}
                      onClick={() => handleClick(option)}
                    >
                      <Typography
                        component="h4"
                        variant="body1"
                        color={selectedOption === option ? "primary" : ""}
                        className="listing-type-card-title"
                      >
                        {" "}
                        {option.cardName}{" "}
                      </Typography>
                      <br />
                      <img
                        src={option.icon}
                        width={60}
                        height={60}
                        alt={option.id}
                      />
                      <br />
                      <br />
                      <Typography
                        component="p"
                        variant="body2"
                        color={selectedOption === option ? "primary" : ""}
                      >
                        {option.optionDescription}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
            </Grid>
            <br />
          </>
        )}
      </StyledCategory>
    </>
  );
};

const StyledCategory = categorySelectionStyle;

export const CategorySelection = connect(
  createSelectionMapStateToProps,
  createSelectionMapDispatchToProps
)(CategorySelectionComponent);
