import React from "react";
import { connect } from "react-redux";
import {
  featuredListingMapStateToProps,
  featuredListingMapDispatchToProps,
} from "../models";
import { Card, Typography, Container } from "@material-ui/core";
import { featuredListingStyle } from "../style";
import { globalUtils, updateFormStore } from "../../../utils";
import * as configs from "../../../configs/appsettings.json";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const FeaturedListingComponent = (props) => {
  const { selectedSponsorshipOption } = props;

  const handleClick = (name) => {
    updateFormStore({ form: "listingForm", field: "sponsorship", value: name });
  };
  return (
    <>
      <StyledFeaturedListing>
        <Container>
          <Card
            className={`card ${
              selectedSponsorshipOption === "free"
                ? "color-green"
                : "color-grey"
            }`}
            name="free"
            onClick={() => handleClick("free")}
          >
            <Typography component="h2" variant="body1">
              {" "}
              Free Ad
            </Typography>
            {selectedSponsorshipOption === "free" && (
              <CheckCircleIcon color="secondary" />
            )}
          </Card>
          {configs.isPaymentAllowed && (
            <Card
              className={`card ${
                selectedSponsorshipOption === "featured"
                  ? "color-green"
                  : "color-grey"
              }`}
              name="featured"
              onClick={() => handleClick("featured")}
            >
              <Typography component="h4" variant="body1">
                {" "}
                Featured Ad
              </Typography>
              <Typography component="h4" variant="body1">
                {" "}
                {globalUtils.getCountryProperty("currency")}{" "}
                {globalUtils.getCountryProperty("featuredPrice")}
              </Typography>
              {selectedSponsorshipOption === "featured" && (
                <CheckCircleIcon color="secondary" />
              )}
            </Card>
          )}
        </Container>
        <br />
      </StyledFeaturedListing>
    </>
  );
};

const StyledFeaturedListing = featuredListingStyle;

export const FeaturedListing = connect(
  featuredListingMapStateToProps,
  featuredListingMapDispatchToProps
)(FeaturedListingComponent);
