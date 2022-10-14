import _get from 'lodash/get'
import * as services from '../../../services'

const { itemActions } = services

export const showMoreMapStateToProps = (state) => ({
  totalElements: _get(state, 'item.productList.totalElements', false),
  offset: _get(state, 'item.productList.offset', 0),
  listType: _get(state, 'form.homeForm.selectedType.value', 'rent'),
  totalSize: _get(state, 'item.productList.content.length')
})

export const showMoreMapDispatchToProps = (dispatch) => ({
  fetchProductList: (payload) =>
    dispatch(itemActions.fetchProduct(payload))
})
