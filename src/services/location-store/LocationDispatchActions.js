import { LocationActionTypes } from './LocationActionTypes';
class LocationDispatchActions {

    updateLocation = (payload) => ({
        type: LocationActionTypes.FETCH_LOCATION,
        payload
    });

    updateLocationMatches = (payload) => ({
        type: LocationActionTypes.LOCATION_MATCHES,
        payload
    });

    clearCurrentLocation = (payload) => ({
        type: LocationActionTypes.CLEAR_CURRENT_LOCATION,
        payload
    })

}

export const locationDispatchActions = new LocationDispatchActions();