import _get from 'lodash/get'
import * as services from '../../../services'

const { itemActions, chatActions } = services

export const productListingMapStateToProps = (state) => ({
  productList: _get(state, 'item.productList', []),
  homeForm: _get(state, 'form.homeForm', {}),
  customFiltersForm: _get(state, 'form.customFiltersForm'),
  additionalFilters: _get(state, 'item.filterOptions.additionalFilters'),
  isShowMoreAvailable: _get(state, 'item.productList.moreRows', false),
  currentLocation: _get(state, 'location.currentLocation.location', ''),
  searchForm: _get(state, 'form.searchForm'),
  userID: _get(state, 'user.userData.id'),
  username: _get(state, 'user.userData.name'),
  isAuthorized: !!_get(state, 'user.authStatus', false),
  favouriteItemIds: _get(state, 'item.favouriteItems', []),
  totalElements: _get(state, 'item.productList.totalElements', false),
  totalSize: _get(state, 'item.productList.content.length'),
  offset: _get(state, 'form.homeForm.offset.value', 0),
  filterOptions: _get(state, "item.filterOptions"),
})

export const productListingMapDispatchToProps = (dispatch) => ({
  updateFavoriteStatus: (payload) =>
    dispatch(itemActions.updateItemFavorite(payload)),
  updateNewItems: (payload) =>
    dispatch(itemActions.updateNewItems(payload)),
  expressInterest: (payload) =>
    dispatch(chatActions.expressInterest(payload)),
  setCurrentConversation: (payload) =>
    dispatch(chatActions.setCurrentConversation(payload)),
  fetchProductList: (payload) =>
    dispatch(itemActions.makeSearch(payload)),
})
