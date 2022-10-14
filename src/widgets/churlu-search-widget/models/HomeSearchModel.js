import * as services from '../../../services'
import _get from 'lodash/get'

const { itemActions, formActions, refDatActions } = services

export const mapDispatchToProps = (dispatch) => ({
  fetchProductList: (payload) =>
    dispatch(itemActions.makeSearch(payload)),
  fetchHotCategoriesList: (payload) =>
    dispatch(itemActions.fetchHotCategories(payload)),
  setFormData: (payload) =>
    dispatch(formActions.setFormConstants(payload)),
  getSellCategories: (payload) =>
    dispatch(refDatActions.getSellCategories(payload)),
  getRentCategories: (payload) =>
    dispatch(refDatActions.getRentCategories(payload)),
  fetchWantedItems: (payload) =>
    dispatch(itemActions.fetchWantedItems(payload)),
  fetchAll: (payload) =>
    dispatch(itemActions.fetchProduct(payload)),
  fetchFavouriteIds: (payload) =>
    dispatch(itemActions.fetchFavouriteIds(payload))
})

export const mapStateToProps = (state) => ({
  sellData: _get(state, 'refData.sellData', {}),
  rentData: _get(state, 'refData.rentData', {}),
  isAuthorized: !!_get(state, 'user.authStatus', false),
  loader: _get(state, 'user.loader', false)
})
