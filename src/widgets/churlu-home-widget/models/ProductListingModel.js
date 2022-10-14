import _get from 'lodash/get'
import * as services from '../../../services'

const { itemActions, chatActions } = services

export const productListingMapStateToProps = (state) => ({
  productList: _get(state, 'item.productList', []),
  homeForm: _get(state, 'form.homeForm', {}),
  userID: _get(state, 'user.userData.id'),
  username: _get(state, 'user.userData.name'),
  isAuthorized: !!_get(state, 'user.authStatus', false),
  favouriteItemIds: _get(state, 'item.favouriteItems', [])
})

export const productListingMapDispatchToProps = (dispatch) => ({
  updateFavoriteStatus: (payload) =>
    dispatch(itemActions.updateItemFavorite(payload)),
  expressInterest: (payload) =>
    dispatch(chatActions.expressInterest(payload)),
  setCurrentConversation: (payload) =>
    dispatch(chatActions.setCurrentConversation(payload))
})
