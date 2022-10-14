import * as _ from 'lodash'
import * as services from '../../../services';

const { userActions } = services;

export const uploadImagesMapStateToProps = (state) => ({
    listingForm: _.get(state, 'form.listingForm'),
});

export const uploadImagesMapDispatchToProps = (dispatch) => ({
    createNotification: (payload) =>
        dispatch(userActions.setErrorPopup(payload))
})