import * as services from "../../../services";
import _get from "lodash/get";

const { formActions, refDatActions, itemActions, chatActions } = services;

export const mainSearchMapStateToProps = (state) => ({
  generalFilters: _get(state, "item.filterOptions.generalFilters"),
  sellData: _get(state, "refData.sellData", []),
  rentData: _get(state, "refData.rentData", []),
  wantedData: _get(state, "refData.wantedData", []),
  filterOptions: _get(state, "item.filterOptions"),
  homeForm: _get(state, "form.homeForm"),
  productList: _get(state, "item.productList", []),
  chatStatus: _get(state, "chat.newInterest", false),
  isAuthorized: !!_get(state, "user.authStatus", false),
  userMessage: _get(state, "form.homeForm.userMessage.value", {}),
  loader: _get(state, "user.loader", false),
  rentList: _get(state, "refData.rentList", []),
  sellList: _get(state, "refData.sellList", []),
  searchForm: _get(state, "form.searchForm"),
  customFiltersForm: _get(state, "form.customFiltersForm"),
  additionalFiltersForm: _get(state, "form.additionalFiltersForm"),
});

export const mainSearchMapDispatchToProps = (dispatch) => ({
  setFormData: (payload) => dispatch(formActions.setFormConstants(payload)),
  getSellCategories: (payload) =>
    dispatch(refDatActions.getSellCategories(payload)),
  getRentCategories: (payload) =>
    dispatch(refDatActions.getRentCategories(payload)),
  fetchFilterOptions: (payload) =>
    dispatch(itemActions.fetchFilterOptions(payload)),
  fetchProductList: (payload) => dispatch(itemActions.makeSearch(payload)),
  clearInterest: () => dispatch(chatActions.clearInterest()),
  fetchFavouriteIds: (payload) =>
    dispatch(itemActions.fetchFavouriteIds(payload)),
});
