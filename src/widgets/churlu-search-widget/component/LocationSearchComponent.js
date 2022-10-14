import React from "react";
import { connect } from "react-redux";
import { locationMapDispatchToProps, locationMapStateToProps } from "../models";
import { Button, Grid, IconButton, Link } from "@material-ui/core";
import MyLocationIcon from "@material-ui/icons/LocationOnOutlined";
import { Geolocation } from "@ionic-native/geolocation";
import { updateFormStore, globalConstants, globalUtils } from "../../../utils";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { formConstants } from "../utils";
import * as configs from "../../../configs/appsettings.json";
import { LocationAutoCompleteComponent } from "../../../components";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const LocationComponent = (props) => {
  const {
    fetchLocation,
    currentLocation,
    locationOptions,
    fetchLocationBySearch,
    fetchFilterOptions,
    fetchProductList,
    homeForm,
    clearCurrentLocation,
    setFormData,
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
    if (!_isEmpty(value)) {
      updateFormStore({
        form: "homeForm",
        field: "radius",
        value: value.value,
      });
    } else {
      updateFormStore({ form: "homeForm", field: "radius", value: 0 });
    }
  };

  const handleRadiusClear = () => {
    updateFormStore({ form: "homeForm", field: "radius", value: "" });
  };

  const handleSearch = () => {
    setFormData(formConstants);
    updateFormStore({ form: "homeForm", field: "sortBy", value: "New" });
    fetchFilterOptions({
      type: _get(homeForm, "selectedType.value", "rent"),
      listType: _get(homeForm, "listType.value"),
      categoryId: _get(homeForm, "selectedCategoryId.value", null),
    });
    const payload = {
      listType: _get(homeForm, "listType.value"),
      type: _get(homeForm, "selectedType.value", "rent"),
      categoryId: _get(homeForm, "selectedCategoryId.value", null),
      sortBy: "New",
    };
    if (_get(homeForm, "latitude.value") && _get(homeForm, "longitude.value")) {
      payload.latitude = _get(homeForm, "latitude.value");
      payload.longitude = _get(homeForm, "longitude.value");
      payload.radius = 5000;
    }
    if (
      _get(homeForm, "radius.value") &&
      _get(homeForm, "radius.value") !== "100+"
    ) {
      payload.radius = parseInt(_get(homeForm, "radius.value"), 10) * 1000;
    }
    if (_get(homeForm, "radius.value") === "100+") {
      payload.radius = 150000;
    }
    fetchProductList({
      offset: 0,
      payload: {
        keyword: _get(homeForm, "searchField.value", null),
        ...payload,
      },
    });
    // if (window.screen.width < 700) {
    globalUtils.scrollTo("search-header");
    // }
  };

  const handleClear = () => {
    clearCurrentLocation();
    updateFormStore({
      form: "homeForm",
      field: "selectedLocation",
      value: null,
    });
    updateFormStore({ form: "homeForm", field: "searchBy", value: "" });
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
                    <MyLocationIcon color="primary" />
                  </Button>
                  <Autocomplete
                    filterSelectedOptions
                    id="location-controllable-states"
                    options={locationOptions}
                    getOptionLabel={(option) => option.area}
                    className="location-section"
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
        <Link to="search" onClick={handleSearch}>
          <IconButton
            aria-label="search"
            variant="outlined"
            color="primary"
            fullWidth={!!window.screen.width < 700}
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
