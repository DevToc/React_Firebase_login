import { formActions, authorizationAction, userActions, notificationActions } from "../../services";
import _get from 'lodash/get';

export const signupMapStateToProps = (state) => ({
    loginForm: _get(state, 'form.loginForm'),
    authorizationStatus: _get(state, 'authorization.authorizationStatus', '')
});

export const signupMapDispatchToProps = (dispatch) => ({
    setFormData: (payload) =>
        dispatch(formActions.setFormConstants(payload)),
    checkUserAvailability: (payload) =>
        dispatch(authorizationAction.findUserAvailability(payload)),
    clearAuthStore: () =>
        dispatch(authorizationAction.clearAuthStore()),
    setNotification: (payload) =>
        dispatch(notificationActions.setNotification(payload)),
    createNotification: (payload) =>
        dispatch(userActions.setErrorPopup(payload)),
    clearNotification: payload =>
        dispatch(notificationActions.clearNotification(payload)),
});
