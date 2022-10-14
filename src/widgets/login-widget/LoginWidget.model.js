import {
    formActions, authorizationAction, notificationActions, userActions
} from "../../services";
import _get from 'lodash/get';

export const loginMapStateToProps = (state) => ({
    loginForm: _get(state, 'form.loginForm'),
    signupForm: _get(state, 'form.signupForm'),
    authorizationStatus: _get(state, 'authorization.authorizationStatus', '')
});

export const loginMapDispatchToProps = (dispatch) => ({
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
