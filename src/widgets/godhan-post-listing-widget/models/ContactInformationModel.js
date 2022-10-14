import * as _ from 'lodash';

export const contactInformationMapStateToProps = (state) => ({
    listingForm: _.get(state, 'form.listingForm'),
});

export const contactInformationMapDispatchToProps = (dispatch) => ({

})