import _get from 'lodash/get'
import * as services from '../../../services'

const { itemActions } = services

export const slickMapStateToProps = (state) => ({
  hotcategories: _get(state, 'item.hotCategories', []),
  currentLocation: _get(state, 'location.currentLocation.location', ''),
  homeForm: _get(state, 'form.homeForm', {})
})

export const slickMapDispatchToProps = (dispatch) => ({
  fetchProductList: (payload) =>
    dispatch(itemActions.makeSearch(payload)),
  fetchFilterOptions: (payload) =>
    dispatch(itemActions.fetchFilterOptions(payload))
})
