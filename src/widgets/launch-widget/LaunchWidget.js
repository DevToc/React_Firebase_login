import React, { useState } from "react";
import * as _ from "lodash";
import { withRouter } from "react-router";
import { launchWidgetStyle } from "./LaunchWidget.style";
import { Select, Button, MenuItem } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { globalConstants } from "../../utils";
import { HomeWidget } from "../godhan-home-widget/MainHomeWidget";

const LaunchView = ({ history }) => {
  const [location, setLocation] = useState(
    localStorage.getItem("godhan-location") || ""
  );

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleClick = () => {
    localStorage.setItem("godhan-location", location);
    history.push("/login");
  };

  return _.includes(
    ["CA", "AU", "IN"],
    localStorage.getItem("godhan-location")
  ) ? (
      <HomeWidget />
    ) : (
      <StyledWidget>
        <div className="godhan-container full-height">
          <div className="body-section">
            <div className="godhan-title">Godhan</div>
            <div className="godhan-sub-title">The Rental Market</div>
          </div>

          <div className="location-select-dropdown">
            <Select
              value={location || ""}
              onChange={handleChange}
              displayEmpty
              label="Age"
              className="select-location"
              IconComponent={ExpandMoreIcon}
              inputProps={{
                name: "age",
                id: "outlined-age-native-simple",
              }}
            >
              <MenuItem aria-label="None" value="" disabled>
                Select a region
            </MenuItem>
              {globalConstants.availableCountries.map((country) => (
                <MenuItem value={country.id} title={country.flag}>
                  <img
                    className="flag-image"
                    src={country.flag}
                    alt={country.id}
                  />{" "}
                  &nbsp;&nbsp;
                <span className="country-label">{country.name}</span>
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="button-section">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              aria-label="log in"
              className="get-started-button"
              disabled={!location}
              onClick={handleClick}
            >
              Get Started
            </Button>
          </div>
          <img
            className="footer-image"
            src="/assets/images/select_location_footer.svg"
            alt="footer"
          />
        </div>
      </StyledWidget>
    );
};

const StyledWidget = launchWidgetStyle;
export const LaunchWidget = withRouter(LaunchView);
