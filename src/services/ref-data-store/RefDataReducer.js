import { RefDataActionTypes } from './RefDataActionTypes'
const initialState = {
  sponsorshipOptions: {}
}

export const refData = (state = initialState, action) => {
  switch (action.type) {
    case RefDataActionTypes.FETCH_SPONSORSHIP_OPTIONS:
      return { ...state, sponsorshipOptions: action.payload }
    case RefDataActionTypes.FETCH_SELL_CATEGORY_DATA:
      return { ...state, ...action.payload }
    case RefDataActionTypes.FETCH_RENT_CATEGORY_DATA:
      return { ...state, ...action.payload }
    case RefDataActionTypes.FETCH_WANTED_CATEGORY_DATA:
      return { ...state, ...action.payload }
    default:
      return { ...state }
  }
}
