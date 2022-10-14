import _get from 'lodash/get'
import { AuthorizationActionTypes } from './AuthorizationActionTypes'

const initialState = {
  authorizationStatus: '',
  otpStatus: '',
  authorizationToken: '',
  userRegistrationStatus: ''
}

export const authorization = (state = initialState, action) => {
  switch (action.type) {
    case AuthorizationActionTypes.POST_LOGIN_WITH_MOBILE_NUMBER_SUCCESS:
      return {
        ...state,
        authorizationStatus: 'existinguser',
        authorizationToken: _get(action, 'payload.accessToken'),
        isSignupFromLogin: false,
        isLoginFromSignup: false
      }
    case AuthorizationActionTypes.POST_LOGIN_NEW_NUMBER_REGISTERED:
      return {
        ...state,
        authorizationStatus: 'newuser',
        authorizationToken: _get(action, 'payload.accessToken'),
        isSignupFromLogin: false,
        isLoginFromSignup: false
      }
    case AuthorizationActionTypes.POST_LOGIN_WITH_MOBILE_NUMBER_FAILURE:
      return { ...state, authorizationStatus: 'authorizationfailed' }
    case AuthorizationActionTypes.LOGIN_SUCCESS:
      return { ...state, authorizationToken: _get(action, 'payload.accessToken') }
    case AuthorizationActionTypes.OTP_LOGIN_SUCCESS:
      return { ...state, otpStatus: 'signup' }
    case AuthorizationActionTypes.SIGNUP_SUCCESS:
      return {
        ...state, userRegistrationStatus: 'signupSuccessful',// authorizationToken: _get(action, 'payload.accessToken')
      }
    case AuthorizationActionTypes.OTP_RESENT:
      return { ...state, otpResent: true }
    case AuthorizationActionTypes.CLEAR_AUTH_STORE:
      return {};
    case AuthorizationActionTypes.CLEAR_OTP_STATUS:
      return { ...state, otpStatus: 'reset' }
    case AuthorizationActionTypes.POST_LOGIN_NEW_NUMBER_REGISTERED_WITH_MESSAGE:
      return {
        ...state,
        authorizationStatus: 'newuser',
        authorizationToken: _get(action, 'payload.accessToken'),
        isSignupFromLogin: true,
        isLoginFromSignup: false
      }
    case AuthorizationActionTypes.POST_SIGNUP_NEW_NUMBER_REGISTERED_WITH_MESSAGE:
      return {
        ...state,
        authorizationStatus: 'existinguser',
        authorizationToken: _get(action, 'payload.accessToken'),
        isSignupFromLogin: false,
        isLoginFromSignup: true
      }
    case AuthorizationActionTypes.CLEAR_SIGNUP_WITH_LOGIN_POPUP:
      return { ...state, isSignupFromLogin: false }
    case AuthorizationActionTypes.CLEAR_LOGIN_WITH_SIGNUP_POPUP:
      return { ...state, isLoginFromSignup: false }
    case AuthorizationActionTypes.SET_ERROR_STATUS:
      return { ...state, error: action.payload }
    default:
      return { ...state }
  }
}
