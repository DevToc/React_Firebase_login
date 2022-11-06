import HttpClient from '../../commons/HttpClient'
import { userDispatchActions } from './UserDispatchActions'
import _get from 'lodash/get'
import _omit from 'lodash/omit'
import _isEmpty from 'lodash/isEmpty';
import { globalConstants, globalUtils } from "../../utils";
import { UserActionTypes } from './UserActionTypes';
import { formActions } from '../form-store';
import { clearAuthStore } from "../authorization-store/AuthorizationActions";

const getUserData = () => {
    return (dispatch) => {
        return new HttpClient()
            .get('/user/profile/getUserDetails', '/user/getUserDetails', globalConstants.MICROSERVICES)
            .then((res) => {
                // if (globalUtils.getCountryFromLocalStorage() !== res.data.countryCode)
                dispatch(userDispatchActions.fetchUserData(mapResponse(res.data)))
            })
            .catch((err) => err)
    }
}

const mapResponse = (data) => ({
    ...data,
    pincode: _get(data, 'pincode', ''),
    memberSince: globalUtils.getFormattedDateWithSourceFormat(_get(data, 'profileCreationDate'), "YYYY-MM-DDThh:mm:ss:000Z", "MMM YYYY")
})

const postProfileUpdate = (payload) => {
    return (dispatch) => {
        return new HttpClient().post('/user/profile/postProfileUpdates', payload, '/user/postProfileUpdates')
            .then((res) => {
                dispatch(setErrorPopup({
                    message: 'Profile updated.',
                    isSuccessful: true
                }))
                dispatch(getUserData())
            })
            .catch((err) => err)
    }
}

const deleteProfile = (payload) => {
    return (dispatch) => {
        return new HttpClient().delete('/api/user/profile/deleteProfile', payload, '/user/deleteProfile')
            .then(() => {
                dispatch(setErrorPopup({
                    message: 'Your profile has been deleted. It will take 30 days to remove the data if there are no pending transactions.',
                    isSuccessful: true,
                    handleClose: () => payload.handleClose()
                }))
            })
            .catch(err => err)
    }
}

const uploadVerificationFiles = (payload) => {
    return (dispatch) => {
        return new HttpClient().post('/user/profile/postVerification', payload, '/user/postVerification')
            .then(() => dispatch(getUserData()))
            .catch((err) => err)
    }
}

const fetchProductDetails = (payload) => {
    let queryString = `?size=100&page=${_get(payload, 'offset', 0)}`
    if (payload?.id) {
        queryString += `&id=${payload?.id}`;
    }
    return (dispatch, getState) => {
        return new HttpClient().get(`/user/items${queryString}`, '/user/getLastProductListed')
            .then((res) => dispatch(userDispatchActions.updateSellerProfile({ ..._mapResponse(res.data, getState()), offset: _get(payload, 'offset', 0) })))
            .catch((err) => err)
    }
}

const _mapResponse = (data, state) => {
    if (!_isEmpty(data, 'content')) {
        data.content.sort((a, b) => (a.listedOn < b.listedOn) ? 1 : ((b.listedOn < a.listedOn) ? -1 : 0))
    }
    // if (window.location.search.indexOf("id=") > 0 && _get(state, 'item.product.productID')) {
    //     const productID = _get(state, 'item.product.productID');
    //     const res = data.content.filter((cont) => cont.productID !== productID);
    //     data.content = res;
    // }
    return data;
}

const raiseNewTicket = (payload) => {
    return (dispatch) => {
        return new HttpClient().post('/user/support', payload, '/user/postTicket')
            .then((res) => {
                dispatch(getUserData());
                dispatch(setErrorPopup({
                    message: `${_get(res, 'data.type') === 'technicalIssue' ? 'Technical issue' : _get(res, 'data.type')} created`,
                    isSuccessful: true,
                    handleClose: () => { dispatch(userDispatchActions.ticketAdded(res.data)) }
                }))
            })
            .catch((err) => err)
    }
}

const clearTicketInfo = () => {
    return (dispatch) => {
        dispatch(userDispatchActions.ticketAdded({}))
    }
}
const handleSignOut = payload => {
    return (dispatch) => {
        return new HttpClient().post('/logout', payload, '/user/logout', null, 'auth')
            .then(() => {
                if (globalUtils.getToken()) {
                    dispatch(userDispatchActions.clearSession());
                    dispatch(formActions.clearAllForms());
                    globalUtils.removeToken();
                    globalUtils.removeSessionStorageItem("godhan-flow");
                    clearAuthStore();
                    globalUtils.setLocalStorageValue("godhan-display-location", "");
                    window.location.href = "/launch";
                }
            })
            .catch(err => err)
    }
}


const setItemSelectedForEdit = (payload) => (dispatch) => dispatch(userDispatchActions.productToBeEdited(payload))

const updateItemStatus = (payload) => {
    return (dispatch) => {
        return new HttpClient().put(`/user/items/status/${payload.id}`, _omit(payload, ['id']), 'updateItems').then((res) => {
            dispatch(clearListedProducts());
            dispatch(fetchProductDetails({ offset: 0 }))
        })
    }
}

const getPastTickets = () => {
    return (dispatch) => {
        return new HttpClient().get('/user/support', '/user/ticketList').then((res) => {
            dispatch(userDispatchActions.fetchAllTickets(res.data))
        })
    }
}

const uploadImage = (payload) => {
    return (dispatch) => {
        return new HttpClient().post('/user/profile/uploadImage', payload, '/user/postVerification').then((res) => {
            dispatch(getUserData())
        }).catch((err) => err)
    }
}

const updateLoaderStatus = payload =>
    (dispatch) => (dispatch(userDispatchActions.updateLoader(payload)))

const clearListedProducts = payload => ({
    type: UserActionTypes.CLEAR_SELLER_PROFILE
})

const clearSelectedItem = payload => ({
    type: UserActionTypes.CLEAR_SELECTED_ITEM
})

const setErrorPopup = payload => ({
    type: UserActionTypes.SET_ERROR_FOR_POPUP,
    payload
})

const clearErrorPopup = payload => ({
    type: UserActionTypes.CLEAR_ERROR_FOR_POPUP,
})

export const userActions = {
    getUserData,
    postProfileUpdate,
    deleteProfile,
    uploadVerificationFiles,
    fetchProductDetails,
    raiseNewTicket,
    handleSignOut,
    updateLoaderStatus,
    clearListedProducts,
    updateItemStatus,
    getPastTickets,
    setItemSelectedForEdit,
    clearSelectedItem, uploadImage,
    setErrorPopup, clearErrorPopup, clearTicketInfo
}
