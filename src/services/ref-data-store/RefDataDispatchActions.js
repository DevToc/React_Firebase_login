import { RefDataActionTypes } from './RefDataActionTypes';

class RefDataDispatchActions {
    updateSponsorshipOptions = (payload) => ({
        type: RefDataActionTypes.FETCH_SPONSORSHIP_OPTIONS,
        payload
    });

    fetchRentCategories = (payload) => ({
        type: RefDataActionTypes.FETCH_RENT_CATEGORY_DATA,
        payload
    });

    fetchSellCategories = (payload) => ({
        type: RefDataActionTypes.FETCH_SELL_CATEGORY_DATA,
        payload
    });

    fetchWantedCategories = (payload) => ({
        type: RefDataActionTypes.FETCH_WANTED_CATEGORY_DATA,
        payload
    })
}

export const refDataDispatchActions = new RefDataDispatchActions();