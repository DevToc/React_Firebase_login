import { AuthorizationActionTypes } from './AuthorizationActionTypes';

class AuthorizationDispatchActions {
    processExistingUser = () => ({
        type: AuthorizationActionTypes.POST_LOGIN_WITH_MOBILE_NUMBER_SUCCESS,
    });

    processNewUser = () => ({
        type: AuthorizationActionTypes.POST_LOGIN_NEW_NUMBER_REGISTERED,
    });

    handlePostLoginFailed = () => ({
        type: AuthorizationActionTypes.POST_LOGIN_WITH_MOBILE_NUMBER_FAILURE,
    });

    processSuccessfulOtpLogin = () => ({
        type: AuthorizationActionTypes.OTP_LOGIN_SUCCESS,
    });

    signupSuccessful = (payload) => ({
        type: AuthorizationActionTypes.SIGNUP_SUCCESS,
        payload
    });

    otpResent = () => ({
        type: AuthorizationActionTypes.OTP_RESENT,
    });

    processNewUserWithMessage = () => ({
        type: AuthorizationActionTypes.POST_LOGIN_NEW_NUMBER_REGISTERED_WITH_MESSAGE
    });

    processLoginWithMessage = () => ({
        type: AuthorizationActionTypes.POST_SIGNUP_NEW_NUMBER_REGISTERED_WITH_MESSAGE
    })
    setError = (payload) => ({
        type: AuthorizationActionTypes.SET_ERROR_STATUS,
        payload
    })

}

export const authorizationDispatchActions = new AuthorizationDispatchActions();