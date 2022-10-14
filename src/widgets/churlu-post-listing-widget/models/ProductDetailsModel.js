import * as _ from 'lodash';

export const productDetailsMapStateToProps = (state) => ({
    listingForm: _.get(state, 'form.listingForm'),
});

export const productDetailsMapDispatchToProps = (dispatch) => ({
    
})