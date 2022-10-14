import * as _ from 'lodash';

export const miscProductInformationMapStateToProps = (state) => ({
    listingForm: _.get(state, 'form.listingForm', {})
});

export const misProductInformationMapDispatchToProps = (dispatch) => ({

})