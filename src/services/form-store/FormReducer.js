import { FormActionTypes } from './FormActionTypes'

const initialState = {}

export const form = (state = initialState, action) => {
  switch (action.type) {
    case FormActionTypes.SET_FORM:
      return { ...state, ...action.payload }
    case FormActionTypes.UPDATE_FORM_STORE:
      return { ...state, ...action.payload }
    case FormActionTypes.CLEAR_FORM_STORE:
      return {};
    default:
      return { ...state }
  }
}
