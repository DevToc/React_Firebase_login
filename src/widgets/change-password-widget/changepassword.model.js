import * as services from '../../services'
import _get from 'lodash/get'

const { authorizationAction, notificationActions } = services

export const changePasswordMapStateToProps = (state) => ({
    signupForm: _get(state, 'form.signupForm'),
    loginForm: _get(state, 'form.loginForm')
})

export const changePasswordMapDispatchToProps = (dispatch) => ({
    updatePassword: (payload) =>
        dispatch(authorizationAction.updatePassword(payload)),
    clearNotification: payload =>
        dispatch(notificationActions.clearNotification(payload))
})