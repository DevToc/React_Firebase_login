import * as _ from 'lodash';
import * as services from '../../../services';

const { formActions } = services;

export const selectCategoryAndBreedMapStateToProps = (state) => ({
    sellData: _.get(state, 'refData.sellData', {}),
    wantedData: _.get(state, 'refData.wantedData', {}),
    listingForm: _.get(state, "form.listingForm"),
    selectedListingType: _.get(state, "form.listingForm.selectedListingType.value")
});

export const selectCategoryAndBreedMapDispatchToProps = (dispatch) => ({
    setFormData: (payload) =>
        dispatch(formActions.setFormConstants(payload)),
});