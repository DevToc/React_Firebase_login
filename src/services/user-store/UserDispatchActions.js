import { UserActionTypes } from './UserActionTypes';
class UserDispatchActions {

    fetchUserData = (payload) => ({
        type: UserActionTypes.FETCH_USER_DATA,
        payload
    });

    deleteUser = (payload) => ({
        type: UserActionTypes.DELETE_USER,
        payload
    })

    updateSellerProfile = (payload) => ({
        type: UserActionTypes.UPDATE_SELLER_PROFILE,
        payload
    });

    ticketAdded = (payload) => ({
        type: UserActionTypes.NEW_TICKET_ADDED,
        payload
    });

    clearSession = () => ({
        type: UserActionTypes.CLEAR_SESSION,
    })

    updateLoader = (payload) => ({
        type: UserActionTypes.UPDATE_LOADER_STATUS,
        payload
    })

    fetchAllTickets = (payload) => ({
        type: UserActionTypes.FETCH_ALL_TICKETS,
        payload
    })

    productToBeEdited = (payload) => ({
        type: UserActionTypes.PRODUCT_TO_BE_EDITED,
        payload
    })
}

export const userDispatchActions = new UserDispatchActions();