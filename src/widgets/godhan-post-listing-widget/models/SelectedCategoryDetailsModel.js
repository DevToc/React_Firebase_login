import * as _ from 'lodash'

export const selectedCategoryDetailsMapStateToProps = (state) => ({
    selectedListingType: _.get(state, 'form.listingForm.selectedListingType.value.id'),
    currentLocation: _.get(state, 'location.currentLocation.location', ''),
    selectedLocation: _.get(state, 'form.listingForm.selectedLocation.value'),
    listingForm: _.get(state, 'form.listingForm', {})
});

export const selectedCategoryDetailsMapDispatchToProps = (dispatch) => ({

});