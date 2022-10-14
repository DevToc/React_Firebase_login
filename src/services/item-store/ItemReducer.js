import { ItemActionTypes } from './ItemActionTypes'
import _get from 'lodash/get'
const initialState = {
  wantedItems: []
}

export const item = (state = initialState, action) => {
  switch (action.type) {
    case ItemActionTypes.FETCH_ITEMS:
      return { ...state, product: action.payload }
    case ItemActionTypes.FETCH_ITEM_LIST:
      // return { ...state, productList: action.payload }
      if (_get(state, 'productList.offset', '') !== _get(action, 'payload.offset') && _get(action, 'payload.listType') === 'default') {
        return {
          ...state,
          productList: {
            ...action.payload, content: [..._get(state, 'productList.content', []), ..._get(action, 'payload.content')]
          }
        }
      }
      return { ...state, productList: action.payload }
    case ItemActionTypes.UPDATE_COUNTRY_LIST:
      return { ...state, countryList: action.payload }
    case ItemActionTypes.UPDATE_STATE_LIST:
      return { ...state, stateList: action.payload }
    case ItemActionTypes.UPDATE_CITY_LIST:
      return { ...state, cityList: action.payload }
    case ItemActionTypes.ADD_NEW_LIST:
      return { ...state, newProduct: action.payload }
    case ItemActionTypes.CREATE_PRODUCT_ID:
      return { ...state, createdProductId: action.payload }
    case ItemActionTypes.PAYMENT_SUCCESSFUL:
      return { ...state, newProduct: action.payload }
    case ItemActionTypes.FETCH_HOT_CATEGORIES:
      return { ...state, hotCategories: action.payload }
    case ItemActionTypes.UPDATE_WANTED_STATUS:
      return { ...state, redirect: 'home' }
    case ItemActionTypes.UPDATE_ITEM_LIST:
      const index = _get(state, 'productList.Items.content').findIndex(obj => obj.productID === _get(action, 'payload.productID'))

      return {
        ...state,
        productList: {
          ..._get(state, 'productList'),
          Items: {
            ..._get(state, 'productList.Items'),
            content: [...(_get(state, 'productList.Items.content').slice(0, index)),
            action.payload, ...(_get(state, 'productList.Items.content').slice(index + 1))]
          }
          // moreRows: _get(state, 'productList.moreRows'),
          // product: 
        }
      }

    case ItemActionTypes.FETCH_WANTED_ITEMS:
      if (_get(state, 'wantedItems.length', 0) === 0) {
        return { ...state, wantedItems: action.payload }
      }
      break
    case ItemActionTypes.CLEAR_NEW_PRODUCT:
      return { ...state, newProduct: {}, product: {} }
    case ItemActionTypes.UPDATE_FILTER_OPTIONS:
      return { ...state, filterOptions: action.payload }
    case ItemActionTypes.UPDATE_FAVOURITE_ITEM_ID:
      return { ...state, favouriteItems: action.payload }
    case ItemActionTypes.CLEAR_PRODUCT_LIST:
      return { ...state, productList: {} }
    default:
      return { ...state }
  }
}
