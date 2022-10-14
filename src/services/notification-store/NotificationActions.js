import { NotificationActionTypes } from './NotificationActionTypes'
import HttpClient from '../../commons/HttpClient'
import { globalConstants } from '../../utils'
import { notificationDispatchActions } from './NotificationDispatchActions'

const setNotification = (payload) => ({
  type: NotificationActionTypes.SET_NOTIFICATION,
  payload
})

const clearNotification = (payload) => ({
  type: NotificationActionTypes.CLEAR_NOTIFICATION,
  payload
})

const getNotifications = () => {
  return (dispatch) => {
    return new HttpClient()
      .get('/user-notifications', '/auth/send-otp', globalConstants.MICROSERVICES)
      .then((res) => dispatch(notificationDispatchActions.getNotifications(res.data)))
      .catch((err) => err)
  }
}

const createNotification = (payload) => {
  return (dispatch) => {
    return new HttpClient()
      .post('/user-notifications/new-notification', payload, '/auth/send-otp', globalConstants.MICROSERVICES)
      .then((res) => dispatch(notificationDispatchActions.createNotification(res.data)))
      .catch((err) => err)
  }
}

const markAllNotificationsAsRead = () => {
  return (dispatch) => {
    return new HttpClient().post('/user-notifications/mark-notifications-as-read', {}, '/auth/send-otp', globalConstants.MICROSERVICES)
      .then(() => dispatch(getNotifications()))
      .catch(err => err)
  }
}

const markNotifAsRead = (payload) => {
  return (dispatch) => {
    return new HttpClient().post('/user-notifications/mark-as-read', payload, '/auth/send-otp')
      .then(() => dispatch(getNotifications()))
      .catch(err => err)
  }
}

export const notificationActions = { setNotification, clearNotification, getNotifications, createNotification, markAllNotificationsAsRead, markNotifAsRead }
