import { authorizationDispatchActions } from './AuthorizationDispatchActions'
import { AuthorizationActionTypes } from './AuthorizationActionTypes'
import HttpClient from '../../commons/HttpClient'
import _get from 'lodash/get'
import { globalConstants, globalUtils } from '../../utils';
import { userActions } from "../user-store";
import { notificationActions } from '../notification-store';

const findUserAvailability = (payload) => {
  return (dispatch) => {
    let queryString = _get(payload, 'mobileNumber')
      ? `mobileNumber=${payload.mobileNumber}`
      : `email=${payload.email}`;
    queryString = queryString + `&requestFrom=${globalUtils.getCurrentPage()}`;
    return new HttpClient()
      .get(`/validate-user?${queryString}`, '/auth/validate-user', globalConstants.MICROSERVICES, 'auth')
      .then((res) => {
        switch (res.status) {
          case 200:
            if (globalUtils.getCurrentPage() === 'login') {
              return dispatch(authorizationDispatchActions.processExistingUser())
            } else {
              return dispatch(authorizationDispatchActions.processLoginWithMessage())
            }
          case 201:
          case 403:
            if (globalUtils.getCurrentPage() !== 'login') {
              return dispatch(authorizationDispatchActions.processNewUser())
            } else {
              return dispatch(authorizationDispatchActions.processNewUserWithMessage())
            }
          default:
            return dispatch(authorizationDispatchActions.handlePostLoginFailed())
        }
      })
      .catch((err) => err)
  }
}

const postLoginWithPassword = (payload) => {
  return (dispatch, done) => {
    return new HttpClient()
      .post('/login', payload, '/auth/postLogin', globalConstants.MICROSERVICES, 'auth')
      .then((res) => {
        globalUtils.setLocalStorageValue("token", _get(res, 'data.accessToken'));
        dispatch(loginSuccess(res.data));
        dispatch(notificationActions.getNotifications())
        dispatch(userActions.getUserData())
      })
      .catch((err) => err)
  }
}

const checkOtpValidity = (payload) => {
  const queryString = _get(payload, 'mobileNumber') ? `mobileNumber=${payload.mobileNumber}` : `email=${payload.email}`
  return (dispatch) => {
    return new HttpClient()
      .post(
        `/validate-otp?${queryString}&otp=${payload.otp}`,
        null, '/auth/validate-otp',
        globalConstants.MICROSERVICES,
        'auth'
      )
      .then(() => {
        if (globalUtils.getCurrentPage() === 'profile') {
          dispatch(userActions.setErrorPopup({
            message: 'Profile updated.',
            isSuccessful: true
          }))
        }
        dispatch(authorizationDispatchActions.processSuccessfulOtpLogin())
      })
      .catch((err) => err)
  }
}

const signupNewUser = (payload) => {
  return (dispatch) => {
    return new HttpClient()
      .post('/signup', payload, '/auth/signup', globalConstants.MICROSERVICES, 'auth')
      .then((res) => {
        dispatch(postLoginWithPassword({
          email: _get(payload, 'email', ""),
          password: _get(payload, 'password', ''),
          mobileNumber: _get(payload, 'mobileNumber', '')
        }))
      })
      .catch((err) => err)
  }
}

const resendOtp = (payload) => {

  const queryString = _get(payload, 'mobileNumber') ? `mobileNumber=${payload.mobileNumber}` : `email=${payload.email}`
  let uri = `/send-otp?${queryString}`
  let action = globalUtils.getCurrentPage()
  if (action === 'password') {
    action = 'forgot-password'
  }
  if (action !== undefined) {
    uri = `/send-otp?${queryString}&action=${action}`
  }
  return (dispatch) => {
    return new HttpClient()
      .get(uri, '/auth/send-otp', globalConstants.MICROSERVICES, 'auth')
      .then((res) => {
        dispatch(authorizationDispatchActions.otpResent());
        if (res.data?.message) {
          dispatch(notificationActions.setNotification({
            message: res?.data?.message,
            severity: globalConstants.notificationMessageSeverity.SUCCESS,
          }));
        }
      }).catch(() => dispatch(authorizationDispatchActions.setError({ isError: true })))
  }
}

const savePassword = (payload) => {
  const queryString = _get(payload, 'mobileNumber') ? `mobileNumber=${payload.mobileNumber}` : `email=${payload.email}`
  return (dispatch) => {
    return new HttpClient()
      .get(`/send-otp?${queryString}`, '/auth/send-otp', globalConstants.MICROSERVICES, 'auth')
      .then(() => dispatch(authorizationDispatchActions.otpResent()))
      .catch((err) => err)
  }
}

const updatePassword = (payload) => {
  return (dispatch) => {
    return new HttpClient()
      .post(`/forgot-password`, payload, '/auth/send-otp', globalConstants.MICROSERVICES, 'auth')
      .then(() => {
        dispatch(postLoginWithPassword({
          email: _get(payload, 'email', ""),
          password: _get(payload, 'password', ''),
          mobileNumber: _get(payload, 'mobileNumber', '')
        }))
      })
      .catch((err) => err)
  }
}

export const loginSuccess = (response) => ({
  type: AuthorizationActionTypes.LOGIN_SUCCESS,
  payload: response
})

export const clearAuthStore = () => ({
  type: AuthorizationActionTypes.CLEAR_AUTH_STORE
})

export const clearOtpStatus = () => ({
  type: AuthorizationActionTypes.CLEAR_OTP_STATUS
})

export const clearSignupWithLoginPopup = () => ({
  type: AuthorizationActionTypes.CLEAR_SIGNUP_WITH_LOGIN_POPUP
})

export const clearLoginWithSignupPopup = () => ({
  type: AuthorizationActionTypes.CLEAR_LOGIN_WITH_SIGNUP_POPUP
})

export const authorizationAction = {
  findUserAvailability,
  postLoginWithPassword,
  checkOtpValidity,
  signupNewUser,
  resendOtp,
  savePassword, clearAuthStore,
  loginSuccess, updatePassword, clearOtpStatus,
  clearSignupWithLoginPopup,
  clearLoginWithSignupPopup
}
