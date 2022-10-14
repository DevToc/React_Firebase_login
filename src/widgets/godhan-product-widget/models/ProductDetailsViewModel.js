import _get from 'lodash/get'
import * as services from '../../../services'

const { itemActions, chatActions } = services

export const productDetailsMapStateToProps = (state) => ({
    product: _get(state, 'item.product', {}),
    userDetails: _get(state, 'user.userData', {}),
    userID: _get(state, 'user.userData.id'),
    username: _get(state, 'user.userData.name'),
    isAuthorized: !!_get(state, 'user.authStatus', false),
    productForm: _get(state, 'form.productListingForm'),
    favouriteItemIds: _get(state, 'item.favouriteItems', [])
})

export const productDetailsMapDispatchToProps = (dispatch) => ({
    extendListing: (payload) =>
        dispatch(itemActions.extendListing(payload)),
    updateFavoriteStatus: (payload) =>
        dispatch(itemActions.updateItemFavorite(payload)),
    expressInterest: (payload) =>
        dispatch(chatActions.expressInterest(payload)),
    setCurrentConversation: (payload) =>
        dispatch(chatActions.setCurrentConversation(payload))
})
