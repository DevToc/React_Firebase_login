import { formActions, authorizationAction, notificationActions } from "../../services";
import _get from 'lodash/get';

export const passwordMapStateToProps = (state) => ({
    loginForm: _get(state, 'form.loginForm'),
    authorizationStatus: _get(state, 'authorization.authorizationStatus', ''),
    authorizationToken: _get(state, 'authorization.authorizationToken'),
    product: _get(state, "item.product", {}),
});

export const passwordMapDispatchToProps = (dispatch) => ({
    setFormData: (payload) =>
        dispatch(formActions.setFormConstants(payload)),
    checkUserAvailability: (payload) =>
        dispatch(authorizationAction.findUserAvailability(payload)),
    clearAuthStore: () =>
        dispatch(authorizationAction.clearAuthStore()),
    postLoginWithPassword: (payload) =>
        dispatch(authorizationAction.postLoginWithPassword(payload)),
    sendOtp: (payload) =>
        dispatch(authorizationAction.resendOtp(payload)),
    clearNotification: payload =>
        dispatch(notificationActions.clearNotification(payload))
});
