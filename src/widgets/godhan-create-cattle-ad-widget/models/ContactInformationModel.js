import * as _ from 'lodash';
import * as services from "../../../services";

const { locationActions } = services;

export const contactInformationMapStateToProps = (state) => ({
    listingForm: _.get(state, 'form.listingForm'),
    getUserDetails: _.get(state, "user.userData")
});

export const contactInformationMapDispatchToProps = (dispatch) => ({
    fetchLocation: (payload) =>
    dispatch(locationActions.fetchLocationFromCoords(payload)),
fetchLocationBySearch: (payload) =>
    dispatch(locationActions.fetchLocationFromSearch(payload)),
})