import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IconButton, makeStyles, Button } from "@material-ui/core";
import BackHeader from "../../components/back-header/BackHeader";
import { LocationComponent } from "../../components";
import {
  locationMapDispatchToProps,
  locationMapStateToProps,
} from "./MainLocationModel";
import _get from "lodash/get";
import { updateFormStore } from "../../utils";
import _isEmpty from "lodash/isEmpty";
import { Geolocation } from "@ionic-native/geolocation";
import * as configs from "../../configs/appsettings.json";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import SearchIcon from "../../assets/icons/Search";
import { formConstants } from "../godhan-home-widget/utils";
import NavigateIcon from "../../assets/icons/Navigate";
import Range from "../../components/Range/Range";
import Map from "./component/Map";
import { useHistory } from "react-router-dom";
import { googleApiKey } from "../../configs/appsettings.json";

const useStyles = makeStyles({
  page: {
    minHeight: "100vh",
    backgroundColor: "white",
    padding: "24px 30px 0 30px",
    marginTop: '46px'
  },
  label: {
    fontFamily: "Merriweather-Regular",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 17,
    color: "#001D48 !important",
    margin: 0,
  },
  labelValue: {
    fontFamily: "Merriweather-Regular",
    fontStyle: "normal",
    fontWeight: "400 !important",
    fontSize: 17,
    color: "#001D48 !important",
    margin: 0,
  },
  mapContainer: {
    height: 300,
    border: "2px solid rgba(43, 87, 154, 0.7)",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "rgba(43, 87, 154, 0.8)",
    marginBottom: 15,
  },
  confirmButtonContainer: {
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
  },
  selectedLocationBox: {
    height: 36,
    marginTop: 10,
    alignItems: "center",
    fontSize: 17,
    color: "black",
    paddingLeft: 9,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '75%'
  },
  distanceContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  button: {
      padding: '0 6px 0 9px',
      fontFamily: 'Merriweather-Regular',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '18px',
      backgroundColor: '#224214',
      border: '2px solid #224214',
      borderRadius: '5px',
      alignItems: 'center',
      marginTop: 15,
      width: 100
  },
});

const LocationPage = ({
  fetchLocation,
  fetchLocationBySearch,
  fetchFilterOptions,
  fetchProductList,
  homeForm,
  clearCurrentLocation,
  setFormData,
  getUserDetails
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [isCurrentLocation, setIsCurrentLocation] = useState(false);

  useEffect(() => {
    if (_isEmpty(homeForm)) {
      setFormData(formConstants);
      updateFormStore({
        form: "homeForm",
        field: "selectedType",
        value: "rent",
      });
    }
  }, [homeForm, setFormData]);

  const handleClick = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setIsCurrentLocation(true);
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
              setIsCurrentLocation(false);

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
              updateFormStore({
                form: "homeForm",
                field: "searchBy",
                value,
              });
              updateFormStore({
                form: "homeForm",
                field: "selectedLocationCountryCode",
                value: null,
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

  const handleRadiusChange = (e, value) => {
    updateFormStore({ form: "homeForm", field: "radius", value: value });
  };

  const handleClear = (e) => {
    if (e) e.stopPropagation();

    clearCurrentLocation();
    updateFormStore({ form: "homeForm", field: "searchBy", value: "" });
    updateFormStore({
      form: "homeForm",
      field: "selectedLocation",
      value: null,
    });
    updateFormStore({
      form: "homeForm",
      field: "latitude",
      value: "",
    });
    updateFormStore({
      form: "homeForm",
      field: "longitude",
      value: "",
    });
  };

  // const handleRadiusClear = () => {
  //   updateFormStore({ form: "homeForm", field: "radius", value: "" });
  // };

  const handleConfirm = () => {
    const loc = {
      latitude: _get(homeForm, "latitude.value"),
      longitude: _get(homeForm, "longitude.value"),
      radius: _get(homeForm, "radius.value"),
      selectedLocation: _get(homeForm, "selectedLocation.value"),
      selectedLocationCountryCode: _get(
        homeForm,
        "selectedLocationCountryCode.value"
      ),
    };
    localStorage.setItem("godhan-display-location", JSON.stringify(loc));
    history.goBack();
  };

  return (
    <>
      <BackHeader
        title="Set Location"
        onGoBack={() => {
          handleClear();
          // handleRadiusClear();
          history.goBack();
        }}
        style={{ position: 'fixed' }}

      />
      <div className={classes.page}>
        <LocationComponent
          userDetails={getUserDetails}
          inputStyle={{ color: "#344654", fontSize: 17 }}
          formname="homeForm"
          placeholder="Find Your Location"
          handleChange={handleChange}
          handleSelect={handleSelect}
          formSearchByFieldValue={_get(homeForm, "searchBy.value", "")}
          left={
            <IconButton style={{ marginLeft: 10 }} size="small">
              <SearchIcon width={16} height={16} />
            </IconButton>
          }
          renderInsteadOfInput={
            _get(homeForm, "selectedLocation.value") ? (
              <>
                <div className={classes.selectedLocationBox}>
                  {_get(homeForm, "selectedLocation.value")}{" "}

                </div>
                <span style={{ marginLeft: 7 }} onClick={handleClear}>
                  X
                </span>
              </>
            ) : null
          }
        />
        <div style={{ margin: "25px 0" }} onClick={handleClick}>
          <LocationComponent
            userDetails={getUserDetails}
            inputStyle={{ color: "#344654", fontSize: 17 }}
            placeholder="Use Current Location"
            disabled
            left={
              <IconButton style={{ marginLeft: 10 }} size="small">
                <NavigateIcon />
              </IconButton>
            }
            renderInsteadOfInput={
              _get(homeForm, "selectedLocation.value") && isCurrentLocation ? (
                <>
                  <div className={classes.selectedLocationBox}>
                    {_get(homeForm, "selectedLocation.value")}{" "}

                  </div>
                  <span style={{ marginLeft: 7 }} onClick={handleClear}>
                    X
              </span>
                </>
              ) : null
            }
          />
        </div>
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className={classes.mapContainer} />}
          mapElement={<div style={{ height: `100%` }} />}
          longitude={_get(homeForm, "longitude.value")}
          latitude={_get(homeForm, "latitude.value")}
          radius={_get(homeForm, "radius.value")}
          countryCode={_get(getUserDetails, 'countryCode')}
        />
        <div className={classes.distanceContainer}>
          <span style={{ marginRight: 10 }} className={classes.label}>
            Distance
          </span>
          <Range
            value={_get(homeForm, "radius.value", 0)}
            min={0}
            max={100}
            onChange={handleRadiusChange}
            oneThumb
            plusValueLabel
          />
          <span
            style={{
              whiteSpace: "nowrap",
              marginLeft: 15,
              marginRight: 15,
            }}
            className={classes.label}
          >
            {_get(homeForm, "radius.value", 0) === 100
              ? _get(homeForm, "radius.value", 0) + "+"
              : _get(homeForm, "radius.value", 0) || 0}{" "}
            Km
          </span>

          <Button
            className={classes.button}
            onClick={() => handleConfirm()}
            variant="contained"
            size="large"
            color="primary"
          >
            Apply
          </Button>
        </div>
        {/* <div className={classes.confirmButtonContainer}>
          <Button
            style={{ fontFamily: "Merriweather-Regular", fontSize: 17 }}
            onClick={() => handleConfirm()}
            variant="contained"
            size="large"
            color="primary"
          >
            Confirm
          </Button>
        </div> */}
      </div>
    </>
  );
};

const MainLocationPage = connect(
  locationMapStateToProps,
  locationMapDispatchToProps
)(LocationPage);

export { MainLocationPage };
