import { authorizationAction, notificationActions } from "../../services";
import _get from 'lodash/get';

export const registerUserMapStateToProps = (state) => ({
    signupForm: _get(state, 'form.signupForm'),
    loginForm: _get(state, 'form.loginForm'),
    userRegistrationStatus: _get(state, 'authorization.userRegistrationStatus'),
    loader: _get(state, 'user.loader', false),
    authorizationToken: _get(state, 'authorization.authorizationToken'),
    product: _get(state, "item.product", {}),
});

export const registerUserMapDispatchToProps = (dispatch) => ({
    postSignup: (payload) =>
        dispatch(authorizationAction.signupNewUser(payload)),
    clearNotification: payload =>
        dispatch(notificationActions.clearNotification(payload))
});
