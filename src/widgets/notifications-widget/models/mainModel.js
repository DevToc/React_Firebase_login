import * as services from "../../../services";
import _get from "lodash/get";

const { notificationActions } = services;

export const mapDispatchToProps = (dispatch) => ({
  markNotifAsRead: (payload) =>
    dispatch(notificationActions.markNotifAsRead(payload)),
});

export const mapStateToProps = (state) => ({
  notifications: _get(state, "notification.userNotifications", []),
});
