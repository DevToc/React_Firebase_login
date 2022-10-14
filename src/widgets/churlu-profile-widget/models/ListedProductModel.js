import _get from 'lodash/get'
import * as services from '../../../services'

const { userActions, itemActions } = services

export const listedProductMapDispatchToProps = (dispatch) => ({
  fetchSellerProfie: (payload) =>
    dispatch(userActions.fetchProductDetails(payload)),
  updateItemStatus: (payload) =>
    dispatch(userActions.updateItemStatus(payload)),
  postPayment: (payload) =>
    dispatch(itemActions.makePayment(payload)),
  setItemSelectedForEdit: (payload) =>
    dispatch(userActions.setItemSelectedForEdit(payload)),
  getProduct: (payload) =>
    dispatch(itemActions.fetchProductDetails(payload)),
})

export const listedProductMapStateToProps = (state) => ({
  products: _get(state, 'user.listedProducts.content', []),
  totalRows: _get(state, 'user.listedProducts.totalElements', 0),
  userDetails: _get(state, 'user.userData')
})
