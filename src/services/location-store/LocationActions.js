import { locationDispatchActions } from "./LocationDispatchActions";
import HttpClient from "../../commons/HttpClient";
import { globalConstants, globalUtils } from "../../utils";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import * as configs from "../../configs/appsettings.json";
import { updateFormStore } from "../../utils";
import { googleApiKey } from "../../configs/appsettings.json";

const fetchLocationFromCoords = (payload) => {
  //and update listingForm search value
  return async (dispatch, getState) => {
    if (configs.isGoogleMapsEnabled) {
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${parseFloat(
            payload.latitude
          )},${parseFloat(payload.longitude)}&key=${googleApiKey}`
        );
        const data = await res.json();
        if (_get(data, 'results[0].address_components.length', 0) > 2) {
          const countryShortName = data?.results[0]?.address_components[data.results[0].address_components.length - 2]?.short_name;
          const userSelectedCountry = "IN";
          if (countryShortName !== userSelectedCountry) {
            return alert(`You're trying to access Godhan from a different region. Please retry after choosing the correct country from Profile section`)
          }
        }
        if (data.status !== "OK") return;

        if (data.results[0]) {
          const address =
            data.results[0].address_components?.find((component) =>
              component.types?.includes("neighborhood")
            )?.short_name ||
            data.results[0].address_components[0]?.short_name ||
            data.results[0].formatted_address;

          const address2 =
            data.results[0].address_components?.find((component) =>
              component.types?.includes("sublocality")
            )?.short_name ||
            data.results[0].address_components?.find((component) =>
              component.types?.includes("administrative_area_level_2")
            )?.short_name ||
            data.results[0].address_components[1]?.short_name ||
            data.results[0].formatted_address;
          const countryCode = data.results[0].address_components?.find(
            (component) => component.types?.includes("country")
          )?.short_name;
          updateFormStore({
            form: "listingForm",
            field: "searchBy",
            value: address + ", " + address2 + ", " + countryCode,
          });
          if (!_isEmpty(getState(), "form.listingForm")) {
            updateFormStore({
              form: "listingForm",
              field: "selectedLocation",
              value: address + ", " + address2 + ", " + countryCode,
            });
          }
          dispatch(
            locationDispatchActions.updateLocation({
              location: data.results[0].formatted_address,
              locationForDisplay: data.results[0].formatted_address,
            })
          );
        }
      } catch (error) {
        console.log("error: ", error);
      }
    } else {
      const queryString = `?latitude=${payload.latitude}&longitude=${payload.longitude}`;
      //const queryString = `?latitude=53.9225&longitude=-111.0585`;
      return new HttpClient()
        .get(
          `/address${queryString}`,
          "/location/locationByCoords",
          globalConstants.MICROSERVICES,
          "public"
        )
        .then((res) => {
          if (!_isEmpty(res, "data")) {
            const currentLocation = res.data[0].name;
            const loc = `${
              _get(res.data[0], "state", "")
                ? `, ${_get(res.data[0], "state")}`
                : ""
              }, ${_get(res.data[0], "zipCode")}`;
            dispatch(
              locationDispatchActions.updateLocation({
                location: currentLocation,
                locationForDisplay: loc,
              })
            );
          }
        })
        .catch((err) => err);
      // var geocoder = new window.google.maps.Geocoder();
    }
  };
};

const fetchLocationFromCoordsHome = (payload) => {
  //and update homeForm search value
  return async (dispatch, getState) => {
    if (configs.isGoogleMapsEnabled) {
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${parseFloat(
            payload.latitude
          )},${parseFloat(payload.longitude)}&key=${googleApiKey}`
        );
        const data = await res.json();
        if (_get(data, 'results[0].address_components.length', 0) > 2) {
          const countryShortName = data?.results[0]?.address_components[data.results[0].address_components.length - 2]?.short_name;
          const userSelectedCountry = "IN";
          if (countryShortName !== userSelectedCountry) {
            return alert(`You're trying to access Godhan from a different region. Please retry after choosing the correct country from Profile section`)
          }
        }
        if (data.status !== "OK") return;

        if (data.results[0]) {
          const address1 =
            data.results[0].address_components?.find((component) =>
              component.types?.includes("neighborhood")
            )?.short_name ||
            data.results[0].address_components[0]?.short_name ||
            data.results[0].formatted_address;

          const address2 =
            data.results[0].address_components?.find((component) =>
              component.types?.includes("sublocality")
            )?.short_name ||
            data.results[0].address_components[1]?.short_name ||
            data.results[0].formatted_address;

          const countryCode = data.results[0].address_components?.find(
            (component) => component.types?.includes("country")
          )?.short_name;

          updateFormStore({
            form: "homeForm",
            field: "selectedLocation",
            value: address1 + ", " + address2 + ", " + countryCode,
          });

          updateFormStore({
            form: "homeForm",
            field: "selectedLocationCountryCode",
            value: countryCode,
          });

          dispatch(
            locationDispatchActions.updateLocation({
              location: address1 + " " + address2,
              locationForDisplay: address1 + ", " + address2,
            })
          );

          if (globalUtils.getCurrentPage()) {
            updateFormStore({
              form: "homeForm",
              field: "searchBy",
              value: address1 + ", " + address2 + ", " + countryCode,
            });
          }
        }
      } catch (error) {
        console.log("error: ", error);
      }
    } else {
      const queryString = `?latitude=${payload.latitude}&longitude=${payload.longitude}`;
      return new HttpClient()
        .get(
          `/address${queryString}`,
          "/location/locationByCoords",
          globalConstants.MICROSERVICES,
          "public"
        )
        .then((res) => {
          if (!_isEmpty(res, "data")) {
            const currentLocation = res.data[0].name;
            const loc = `${
              _get(res.data[0], "state", "")
                ? `, ${_get(res.data[0], "state")}`
                : ""
              }, ${_get(res.data[0], "zipCode")}`;
            dispatch(
              locationDispatchActions.updateLocation({
                location: currentLocation,
                locationForDisplay: loc,
              })
            );
          }
        })
        .catch((err) => err);
      // var geocoder = new window.google.maps.Geocoder();
    }
  };
};

const fetchLocationFromSearch = (payload) => {
  return (dispatch) => {
    const queryString = `keyword=${_get(payload, "search")}`;
    return new HttpClient()
      .get(
        `/address/all?${queryString}`,
        "/location/locationBySearch",
        globalConstants.MICROSERVICES,
        "public"
      )
      .then((res) => {
        if (!_isEmpty(res, "data.data")) {
          const responseObject = res.data.data.map((obj) => {
            return {
              area: `${_get(obj, "city")}, ${_get(obj, "zipCode")} ${
                _get(obj, "state", "") ? `, ${_get(obj, "state")}` : ""
                } ${_get(obj, "country", "") ? `, ${_get(obj, "country")}` : ""}`,
              city: _get(obj, "city") || _get(obj, "state"),
              id: _get(obj, "id"),
              latitude: _get(obj, "latitude"),
              longitude: _get(obj, "longitude"),
            };
          });

          dispatch(
            locationDispatchActions.updateLocationMatches(responseObject)
          );
        }
      })
      .catch((err) => err);
  };
};

const clearCurrentLocation = (payload) => {
  return (dispatch) => {
    return dispatch(locationDispatchActions.clearCurrentLocation(payload));
  };
};

export const locationActions = {
  fetchLocationFromCoords,
  fetchLocationFromCoordsHome,
  fetchLocationFromSearch,
  clearCurrentLocation,
};
