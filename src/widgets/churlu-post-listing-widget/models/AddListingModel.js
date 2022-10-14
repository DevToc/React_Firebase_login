import * as services from "../../../services";
import * as _ from "lodash";

const {locationActions, formActions} = services;
export const categoryListingMapStateToProps = (state) => ({
    locationOptions: _.get(state, "location.locationMatches", []),
    currentLocation: _.get(state, "location.currentLocation.location", ""),
    listingForm: _.get(state, "form.listingForm"),
    selectedLocation: _.get(state, "form.listingForm.selectedLocation.value"),
    getUserDetails: _.get(state, "user.userData")
});

export const categoryListingMapDispatchToProps = (dispatch) => ({
    fetchLocation: (payload) =>
        dispatch(locationActions.fetchLocationFromCoords(payload)),
    fetchLocationBySearch: (payload) =>
        dispatch(locationActions.fetchLocationFromSearch(payload)),
    clearCurrentLocation: (payload) =>
        dispatch(locationActions.clearCurrentLocation(payload)),
    setFormData: (payload) =>
        dispatch(formActions.setFormConstants(payload)),
});
