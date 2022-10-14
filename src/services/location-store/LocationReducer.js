import { LocationActionTypes } from './LocationActionTypes'
const initialState = {
  currentLocation: {}
}

export const location = (state = initialState, action) => {
  switch (action.type) {
    case LocationActionTypes.FETCH_LOCATION:
      return { ...state, currentLocation: action.payload }
    case LocationActionTypes.LOCATION_MATCHES:
      return { ...state, locationMatches: action.payload }
    case LocationActionTypes.CLEAR_CURRENT_LOCATION:
      return { ...state, currentLocation: '' }
    default:
      return { ...state }
  }
}
