import { NotificationActionTypes } from "./NotificationActionTypes";

class NotificationDispatchActions {

    getNotifications = (payload) => ({
        type: NotificationActionTypes.GET_NOTIFICATION,
        payload
    })

    createNotification = (payload) => ({ type: NotificationActionTypes.CREATE_NOTIFICATION, payload })
}

export const notificationDispatchActions = new NotificationDispatchActions();