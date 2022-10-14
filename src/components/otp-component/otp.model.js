import _get from 'lodash/get'
import * as services from '../../services'

const { authorizationAction, notificationActions } = services

export const otpMapDispatchToProps = (dispatch) => ({
    checkOtpValidity: (payload) =>
        dispatch(authorizationAction.checkOtpValidity(payload)),
    resendOtp: (payload) => dispatch(authorizationAction.resendOtp(payload)),
    setNotification: (payload) =>
        dispatch(notificationActions.setNotification(payload)),
    clearNotification: payload =>
        dispatch(notificationActions.clearNotification(payload)),
    setOpen: payload =>
        dispatch(authorizationAction.clearSignupWithLoginPopup(payload))
})

export const otpMapStateToProps = (state) => ({
    loginForm: _get(state, 'form.loginForm'),
    email: _get(state, 'form.loginForm.emailAddress'),
    otp: _get(state, 'form.loginForm.otp'),
    otpStatus: _get(state, 'authorization.otpStatus'),
    loader: _get(state, 'user.loader', false),
    isSignupFromLogin: _get(state, 'authorization.isSignupFromLogin', false)
})
