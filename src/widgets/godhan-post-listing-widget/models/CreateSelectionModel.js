import * as _ from 'lodash';

export const createSelectionMapStateToProps = (state) => ({
    selectedOption: _.get(state, 'form.listingForm.selectedListingType.value'),
    listingForm: _.get(state, 'form.listingForm')
});

export const createSelectionMapDispatchToProps = (dispatch) => ({

})