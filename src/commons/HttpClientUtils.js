import { userActions, notificationActions } from "../services"
import _includes from 'lodash/includes';
import { globalConstants, globalUtils } from "../utils";

export const getJsonPath = (axios, operation) => { return axios.get(`${operation}.json`) }

export const setLoaderStatus = (state = false, store, cb, data) => {
    store.dispatch(userActions.updateLoaderStatus(state))
    if (cb) {
        cb(data);
    }
}

export const getHeaders = () => {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "localhost:3000",
        "accept": "application/json",
        "Access-Control-Allow-Credentials": 'true',
    }
    if (globalUtils.getToken()) {
        headers.Authorization = `Bearer ${globalUtils.getToken()}`
    }
    return { headers };
}

export const setFailureNotification = (store, message) => {
    if (_includes(message, 'Full authentication')) {
        message = 'Please login.'
    }
    store.dispatch(notificationActions.setNotification({
        message: message || 'Something went wrong, please try again later',
        severity: globalConstants.notificationMessageSeverity.ERROR
    }))
    if (!_includes([
        'login', 'password', 'signup', 'otp-confirmation', 'forgot-password', 'change-password', 'register-user'
    ], globalUtils.getCurrentPage())) {
        store.dispatch(userActions.setErrorPopup({ message: message || "", isSuccessful: false }))
    }
}