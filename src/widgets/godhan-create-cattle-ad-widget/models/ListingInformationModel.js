import _get from "lodash/get";
import * as services from '../../../services';

const { userActions } = services;

export const listingInformationMapStateToProps = (state) => ({
    listingForm: _get(state, "form.listingForm"),
})

export const listingInformationMapDispatchToProps = (dispatch) => ({
    createNotification: (payload) =>
        dispatch(userActions.setErrorPopup(payload))
})