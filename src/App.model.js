import _get from 'lodash/get'
import * as services from './services'

const { userActions, authorizationAction, notificationActions, refDatActions } = services

export const appMapStateToProps = (state) => ({
  isAuthorized: !!_get(state, 'user.authStatus', false),
  loader: _get(state, 'user.loader', false),
  sellData: _get(state, "refData.sellData", []),
  wantedData: _get(state, "refData.wantedData", []),
})

export const appMapDispatchToProps = (dispatch) => ({
  fetchUserDetails: (payload) =>
    dispatch(userActions.getUserData(payload)),
  handleSignOut: (payload) =>
    dispatch(userActions.handleSignOut(payload)),
  loginSuccess: (payload) =>
    dispatch(authorizationAction.loginSuccess(payload)),
  clearNotification: (payload) =>
    dispatch(notificationActions.clearNotification(payload)),
  clearAuthStore: () =>
    dispatch(authorizationAction.clearAuthStore()),
  getSellCategories: (payload) =>
    dispatch(refDatActions.getSellCategories(payload)),
  getWantedCategories: (payload) =>
    dispatch(refDatActions.getWantedCategories(payload)),
  getNotifications: () =>
    dispatch(notificationActions.getNotifications())
})
