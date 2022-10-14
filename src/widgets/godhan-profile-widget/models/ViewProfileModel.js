import _get from "lodash/get";
import * as services from "../../../services";

const { userActions, formActions, authorizationAction } = services;
export const viewProfileMapStateToProps = (state) => ({
  userDetails: _get(state, "user.userData", {}),
  product: _get(state, "item.product", {}),
});

export const viewProfileMapDispatchToProps = (dispatch) => ({
  getPastTickets: () => dispatch(userActions.getPastTickets()),
  setFormData: (payload) => dispatch(formActions.setFormConstants(payload)),
  clearAuthStore: () => dispatch(authorizationAction.clearAuthStore()),
  handleSignOut: (payload) => dispatch(userActions.handleSignOut(payload)),
  uploadProfilePicture: (payload) => dispatch(userActions.uploadImage(payload)),
  setErrorPopup: (payload) =>
    dispatch(userActions.setErrorPopup(payload)),
});
