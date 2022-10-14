import * as _ from 'lodash';

export const categorySelectionButtonMapStateToProps = (state) => ({
    listingForm: _.get(state, 'form.listingForm'),
    locationOptions: _.get(state, 'location.locationMatches', []),
    currentLocation: _.get(state, 'location.currentLocation.location', ''),
    selectedLocation: _.get(state, 'form.listingForm.selectedLocation.value'),
});

export const categorySelectionButtonMapDispatchToProps = (dispatch) => ({

})