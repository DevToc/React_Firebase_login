import * as services from '../../../services'
import _get from 'lodash/get'
import * as _ from "lodash";

const { itemActions, formActions, locationActions } = services

export const filtersSearchMapStateToProps = (state) => ({
  generalFilters: _get(state, 'item.filterOptions.generalFilters'),
  searchForm: _get(state, 'form.searchForm'),
  homeForm: _get(state, 'form.homeForm'),
  additionalFiltersForm: _get(state, 'form.additionalFiltersForm'),
  customFiltersForm: _get(state, 'form.customFiltersForm'),
  filterOptions: _get(state, 'item.filterOptions'),
  additionalFilters: _get(state, 'item.filterOptions.additionalFilters'),
  currentLocation: _get(state, 'location.currentLocation.location', ''),
  wantedList: _get(state, 'refData.wantedList', []),
  getUserDetails: _.get(state, "user.userData")
})

export const filtersSearchMapDispatchToProps = (dispatch) => ({
  fetchProductList: (payload) =>
    dispatch(itemActions.makeSearch(payload)),
  setFormData: (payload) =>
    dispatch(formActions.setFormConstants(payload)),
  clearProductList: (payload) =>
    dispatch(itemActions.clearProductList(payload)),
  fetchLocation: (payload) =>
    dispatch(locationActions.fetchLocationFromCoordsHome(payload)),
})
