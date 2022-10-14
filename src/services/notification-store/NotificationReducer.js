import { NotificationActionTypes } from './NotificationActionTypes'

const initialState = {}

export const notification = (state = initialState, action) => {
  switch (action.type) {
    case NotificationActionTypes.SET_NOTIFICATION:
      return { ...state, notification: [action.payload] }
    case NotificationActionTypes.CLEAR_NOTIFICATION:
      return { ...state, notification: [] }
    case NotificationActionTypes.GET_NOTIFICATION:
      return { ...state, userNotifications: action.payload }
    default:
      return { ...state }
  }
}
