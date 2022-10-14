import * as services from "../../../services";
import _get from "lodash/get";

const { itemActions, formActions, chatActions } = services;

export const mapDispatchToProps = (dispatch) => ({
  fetchProductList: (payload) => dispatch(itemActions.makeSearch(payload)),
  fetchAllItems: (payload) => dispatch(itemActions.fetchProduct(payload)),
  fetchHotCategoriesList: (payload) =>
    dispatch(itemActions.fetchHotCategories(payload)),
  setFormData: (payload) => dispatch(formActions.setFormConstants(payload)),
  fetchWantedItems: (payload) =>
    dispatch(itemActions.fetchWantedItems(payload)),
  fetchFilterOptions: (payload) =>
    dispatch(itemActions.fetchFilterOptions(payload)),
  clearInterest: () => dispatch(chatActions.clearInterest()),
  fetchFavouriteItems: (payload) =>
    dispatch(itemActions.fetchFavouriteItems(payload)),
  fetchFavouriteIds: (payload) =>
    dispatch(itemActions.fetchFavouriteIds(payload)),
  clearProductList: (payload) =>
    dispatch(itemActions.clearProductList(payload)),
});

export const mapStateToProps = (state) => ({
  sellData: _get(state, "refData.sellData", []),
  rentData: _get(state, "refData.rentData", []),
  wantedData: _get(state, "refData.wantedData", []),
  isAuthorized: !!_get(state, "user.authStatus", false),
  userData: _get(state, "user.userData", false),
  loader: _get(state, "user.loader", false),
  chatStatus: _get(state, "chat.newInterest", false),
  homeForm: _get(state, "form.homeForm", {}),
  userMessage: _get(state, "form.homeForm.userMessage.value"),
});
