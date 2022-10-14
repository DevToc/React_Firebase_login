import _get from "lodash/get";
import * as services from "../../../services";

const { userActions, authorizationAction, notificationActions, formActions } = services;
export const editProfileMapStateToProps = (state) => ({
  profileForm: _get(state, "form.profileForm", {}),
  userDetails: _get(state, "user.userData", {}),
  otpForm: _get(state, "form.otpForm", {}),
  phoneNumberInOtp: _get(state, "", ""),
  emailInOtp: _get(state, "", ""),
  error: _get(state, 'authorization.error')
});

export const editProfileMapDispatchToProps = (dispatch) => ({
  postProfileUpdate: (payload) =>
    dispatch(userActions.postProfileUpdate(payload)),
  resendOtpToUser: (payload) => dispatch(authorizationAction.resendOtp(payload)),
  checkOtpValidity: (payload) =>
    dispatch(authorizationAction.checkOtpValidity(payload)),
  setNotification: (payload) =>
    dispatch(notificationActions.setNotification(payload)),
  clearNotification: (payload) =>
    dispatch(notificationActions.clearNotification(payload)),
  handleDeleteConfirmation: (payload) =>
    dispatch(userActions.deleteProfile(payload)),
  setFormData: (payload) =>
    dispatch(formActions.setFormConstants(payload)),
  setErrorPopup: (payload) =>
    dispatch(userActions.setErrorPopup(payload)),
  handleSignOut: (payload) => dispatch(userActions.handleSignOut(payload)),
});
