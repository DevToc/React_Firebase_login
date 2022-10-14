import { ItemActionTypes } from './ItemActionTypes';

class ItemDispatchActons {

    updateCountryList = payload => ({
        type: ItemActionTypes.UPDATE_COUNTRY_LIST,
        payload
    });

    updateStateList = payload => ({
        type: ItemActionTypes.UPDATE_STATE_LIST,
        payload
    });

    updateCityList = payload => ({
        type: ItemActionTypes.UPDATE_CITY_LIST,
        payload
    });

    newProductListed = payload => ({
        type: ItemActionTypes.ADD_NEW_LIST,
        payload
    });

    createNewProductId = payload => ({
        type: ItemActionTypes.CREATE_PRODUCT_ID,
        payload
    })

    updateExistingProductList = payload => ({
        type: ItemActionTypes.UPDATE_ITEM_LIST,
        payload
    });

    paymentSuccessful = payload => ({
        type: ItemActionTypes.PAYMENT_SUCCESSFUL,
        payload
    });

    updateHotCategories = payload => ({
        type: ItemActionTypes.FETCH_HOT_CATEGORIES,
        payload
    })

    clearProduct = () => ({
        type: ItemActionTypes.CLEAR_NEW_PRODUCT
    })

    productDetailsSuccess = (payload) => ({
        type: ItemActionTypes.FETCH_ITEMS,
        payload
    });

    fetchItemList = payload => ({
        type: ItemActionTypes.FETCH_ITEM_LIST,
        payload
    });

    updateWantedItems = payload => ({
        type: ItemActionTypes.FETCH_WANTED_ITEMS,
        payload
    });

    updateFilterOptions = payload => ({
        type: ItemActionTypes.UPDATE_FILTER_OPTIONS,
        payload
    })

    fetchFavouriteItemIds = payload => ({
        type: ItemActionTypes.UPDATE_FAVOURITE_ITEM_ID,
        payload
    })

    updateWantedStatus = payload => ({
        type: ItemActionTypes.UPDATE_WANTED_STATUS,
        payload
    })

}

export const itemDispatchActions = new ItemDispatchActons();
