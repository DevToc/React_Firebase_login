import _get from 'lodash/get'
import * as services from '../../../services'

const { userActions, chatActions, itemActions } = services
export const profileOptionsCartMapDispatchToProps = (dispatch) => ({
  handleDeleteConfirmation: (payload) =>
    dispatch(userActions.deleteProfile(payload)),
  fetchSellerProfie: (payload) =>
    dispatch(userActions.fetchProductDetails(payload)),
  postProfileUpdate: (payload) =>
    dispatch(userActions.postProfileUpdate(payload)),
  fetchCurrentConversations: (payload) =>
    dispatch(chatActions.getCurrentConversations(payload)),
  clearListedProducts: (payload) =>
    dispatch(userActions.clearListedProducts(payload)),
  getPastTickets: () =>
    dispatch(userActions.getPastTickets()),
  fetchFavouriteItems: (payload) =>
    dispatch(itemActions.fetchFavouriteItems(payload)),
  fetchFavouriteIds: (payload) =>
    dispatch(itemActions.fetchFavouriteIds(payload))
})

export const profileOptionsCartMapStateToProps = (state) => ({
  userDetails: _get(state, 'user.userData', {}),
  product: _get(state, "item.product", {}),
})
