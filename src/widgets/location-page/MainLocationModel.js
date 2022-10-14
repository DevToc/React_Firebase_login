import * as services from "../../services";
import _get from "lodash/get";
import { formActions, itemActions } from "../../services";
import * as _ from "lodash";

const { locationActions } = services;
export const locationMapStateToProps = (state) => ({
  currentLocation: _get(state, "location.currentLocation.location", ""),
  locationOptions: _get(state, "location.locationMatches", []),
  homeForm: _get(state, "form.homeForm", {}),
  getUserDetails: _.get(state, "user.userData")
});

export const locationMapDispatchToProps = (dispatch) => ({
  fetchLocation: (payload) =>
    dispatch(locationActions.fetchLocationFromCoordsHome(payload)),
  fetchLocationBySearch: (payload) =>
    dispatch(locationActions.fetchLocationFromSearch(payload)),
  fetchFilterOptions: (payload) =>
    dispatch(itemActions.fetchFilterOptions(payload)),
  fetchProductList: (payload) => dispatch(itemActions.makeSearch(payload)),
  clearCurrentLocation: (payload) =>
    dispatch(locationActions.clearCurrentLocation(payload)),
  setFormData: (payload) => dispatch(formActions.setFormConstants(payload)),
});
