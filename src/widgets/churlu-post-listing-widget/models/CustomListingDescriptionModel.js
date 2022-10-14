import * as _ from 'lodash';

export const customListingDescriptionMapStateToProps = (state) => ({
    listingForm: _.get(state, 'form.listingForm'),
});

export const customListingDescriptionMapDispatchToProps = (dispatch) => ({

})