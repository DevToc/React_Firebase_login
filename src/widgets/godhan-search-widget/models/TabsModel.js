import * as services from '../../../services'
import _get from 'lodash/get'


const { itemActions, locationActions } = services

export const tabsMapStateToProps = (state) => ({
  homeForm: _get(state, 'form.homeForm')
})

export const tabsMapDispatchToProps = (dispatch) => ({
  fetchHotCategoriesList: (payload) =>
    dispatch(itemActions.fetchHotCategories(payload)),
  clearCurrentLocation: (payload) =>
    dispatch(locationActions.clearCurrentLocation(payload))
})
