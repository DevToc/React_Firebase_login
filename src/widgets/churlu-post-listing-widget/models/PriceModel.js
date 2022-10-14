import * as _ from 'lodash'

export const priceMapStateToProps = (state) => ({
    listingForm: _.get(state, 'form.listingForm', {})
});

export const priceMapDispatchToProps = (dispatch) => ({

})