import _get from 'lodash/get'
import * as services from '../../../services'

const { authorizationAction, notificationActions } = services

export const otpMapDispatchToProps = (dispatch) => ({
    checkOtpValidity: (payload) =>
        dispatch(authorizationAction.checkOtpValidity(payload)),
    resendOtp: (payload) => dispatch(authorizationAction.resendOtp(payload)),
    setNotification: (payload) =>
        dispatch(notificationActions.setNotification(payload)),
    clearNotification: payload =>
        dispatch(notificationActions.clearNotification(payload))
})

export const otpMapStateToProps = (state) => ({
    mobileNumber: _get(state, 'form.otpForm.mobileNumber'),
    email: _get(state, 'form.otpForm.emailAddress'),
    otp: _get(state, 'form.otpForm.otp'),
    otpStatus: _get(state, 'authorization.otpStatus'),
    loader: _get(state, 'user.loader', false),
    selectedProperty: _get(state, 'form.otpForm.currentlyUpdatedProperty.value'),
    selectedValue: _get(state, 'form.otpForm.currentlyUpdatedValue.value')
})
