import _get from 'lodash/get';
import * as services from '../../../services'

const { itemActions } = services;

export const savedItemsMapStateToProps = (state) => ({
    productList: _get(state, 'item.productList', []),
    favouriteItemIds: _get(state, 'item.favouriteItems', [])
})

export const savedItemsMapDispatchToProps = (dispatch) => ({
    updateFavoriteStatus: (payload) =>
        dispatch(itemActions.updateItemFavorite(payload)),
})