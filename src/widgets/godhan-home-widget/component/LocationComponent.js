import React from "react";
import { connect } from "react-redux";
import { locationMapDispatchToProps, locationMapStateToProps } from "../models";
import { Button, Grid, IconButton } from "@material-ui/core";
import MyLocationIcon from "@material-ui/icons/LocationOnOutlined";
import { Geolocation } from "@ionic-native/geolocation";
import { updateFormStore, globalConstants } from "../../../utils";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import * as configs from "../../../configs/appsettings.json";
import { LocationAutoCompleteComponent } from "../../../components";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import SearchIcon from "@material-ui/icons/Search";

const LocationComponent = (props) => {
  const {
    fetchLocation,
    currentLocation,
    locationOptions,
    fetchLocationBySearch,

    homeForm,
    clearCurrentLocation,
  } = props;
  const handleClick = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      updateFormStore({
        form: "homeForm",
        field: "latitude",
        value: _get(position, "coords.latitude"),
      });
      updateFormStore({
        form: "homeForm",
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

  const handleChange = (e) => {
    if (configs.isGoogleMapsEnabled) {
      updateFormStore({ form: "homeForm", field: "searchBy", value: e });
    } else if (
      _get(e, "target.value.length") > 0 &&
      _get(e, "target.value.length") % 2 === 0
    ) {
      fetchLocationBySearch({
        search: e.target.value,
      });
    }
  };

  const handleSelect = (value) => {
    if (configs.isGoogleMapsEnabled) {
      geocodeByAddress(value)
        .then(async (results) => {
          const res = await getLatLng(results[0]);
          if (!_isEmpty(res)) {
            try {
              updateFormStore({
                form: "homeForm",
                field: "latitude",
                value: _get(res, "lat"),
              });
              updateFormStore({
                form: "homeForm",
                field: "longitude",
                value: _get(res, "lng"),
              });
              updateFormStore({
                form: "homeForm",
                field: "selectedLocation",
                value,
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
          form: "homeForm",
          field: "latitude",
          value: _get(value, "latitude"),
        });
        updateFormStore({
          form: "homeForm",
          field: "longitude",
          value: _get(value, "longitude"),
        });
        updateFormStore({
          form: "homeForm",
          field: "selectedLocation",
          value: _get(value, "area"),
        });
      }
    }
  };

  const handleRadiusChange = (value) => {
    updateFormStore({ form: "homeForm", field: "radius", value: value.value });
  };

  const handleClear = () => {
    clearCurrentLocation();
    updateFormStore({ form: "homeForm", field: "searchBy", value: "" });
    updateFormStore({
      form: "homeForm",
      field: "selectedLocation",
      value: null,
    });
  };

  const handleRadiusClear = () => {
    updateFormStore({ form: "homeForm", field: "radius", value: "" });
  };

  return (
    <>
      <Grid item lg={3} xs={12}>
        {currentLocation || _get(homeForm, "selectedLocation.value") ? (
          <div className="autocomplete-selected">
            <div className="location-ellipsis">
              {currentLocation || _get(homeForm, "selectedLocation.value")}
            </div>
            <span className="clear" onClick={handleClear}>
              X
            </span>
          </div>
        ) : (
          <>
            {configs.isGoogleMapsEnabled ? (
              <>
                <LocationAutoCompleteComponent
                  formSearchByFieldValue={_get(homeForm, "searchBy.value")}
                  handleSelect={handleSelect}
                  handleChange={handleChange}
                  handleClick={handleClick}
                />
              </>
            ) : (
              <>
                <div style={{ display: "flex", height: "96%" }}>
                  <Button
                    size="small"
                    onClick={handleClick}
                    className="current-location-icon"
                  >
                    <MyLocationIcon />
                  </Button>
                  <Autocomplete
                    filterSelectedOptions
                    id="location-controllable-states"
                    options={locationOptions}
                    getOptionLabel={(option) => option.area}
                    renderOption={(option) => (
                      <>
                        <span>{option.area}</span>
                      </>
                    )}
                    onInputChange={(e, newValue) => {
                      handleChange(e, newValue);
                    }}
                    onChange={(e, value) => handleSelect(value)}
                    fullWidth
                    className="location-section"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="location"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: "search" }}
                      />
                    )}
                  />
                </div>
              </>
            )}
          </>
        )}
      </Grid>
      <Grid item lg={1} xs={12} style={{ cursor: "pointer" }}>
        {_get(homeForm, "radius.value") ? (
          <div className="autocomplete-selected">
            {_get(homeForm, "radius.value")} km
            <span className="clear clear-icon" onClick={handleRadiusClear}>
              X
            </span>
          </div>
        ) : (
          <Autocomplete
            className="unset-width"
            id="search-within-radius"
            fullWidth={window.screen.width < 700}
            options={globalConstants.locationOptions}
            onChange={(e, value) => handleRadiusChange(value)}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label=""
                color="primary"
                fullWidth={!!window.screen.width < 700}
                placeholder="Within"
                InputLabelProps={{
                  shrink: true,
                }}
                type="text"
                style={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  height: "100%",
                }}
              />
            )}
          />
        )}
      </Grid>
      <Grid item lg={1} xs={12} style={{ textAlign: "center" }}>
        <Link to="search" onClick={() => {}}>
          <IconButton
            aria-label="search"
            variant="outlined"
            color="primary"
            className="search-button"
          >
            <SearchIcon fontSize="large" style={{ transform: "scale(2)" }} />
          </IconButton>
        </Link>
      </Grid>
    </>
  );
};

export const Location = connect(
  locationMapStateToProps,
  locationMapDispatchToProps
)(LocationComponent);
