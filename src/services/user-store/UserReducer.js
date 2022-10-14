import { UserActionTypes } from './UserActionTypes'
import _get from 'lodash/get'

const initialState = {
  userData: {}, listedProducts: {}, ticketList: []
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER_DATA:
      return { ...state, userData: action.payload, authStatus: _get(action, 'payload') }
    case UserActionTypes.DELETE_USER:
      return { ...state, deletedUser: action.payload }
    case UserActionTypes.UPDATE_SELLER_PROFILE:
      if (_get(action, 'payload.offset', 0) === 0) {
        return { ...state, listedProducts: { ...action.payload, content: [..._get(action, 'payload.content', [])] } }
      }
      return { ...state, listedProducts: { ...action.payload, content: [..._get(state, 'listedProducts.content', []), ..._get(action, 'payload.content')] } }
    case UserActionTypes.NEW_TICKET_ADDED:
      return { ...state, ticket: action.payload }
    case UserActionTypes.CLEAR_SESSION:
      return { }
    case UserActionTypes.UPDATE_LOADER_STATUS:
      return { ...state, loader: action.payload }
    case UserActionTypes.CLEAR_SELLER_PROFILE:
      return { ...state, listedProducts: {} }
    case UserActionTypes.FETCH_ALL_TICKETS:
      return { ...state, ticketList: action.payload }
    case UserActionTypes.PRODUCT_TO_BE_EDITED:
      return { ...state, selectedProductForEdit: action.payload }
    case UserActionTypes.CLEAR_SELECTED_ITEM:
      return { ...state, selectedProductForEdit: {} }
    case UserActionTypes.SET_ERROR_FOR_POPUP: 
      return { ...state, isErrorExists: true, errorMessage: _get(action, 'payload', '') };
    case UserActionTypes.CLEAR_ERROR_FOR_POPUP:
      return { ...state, isErrorExists: false, errorMessage: '' };
    default:
      return { ...state }
  }
}
