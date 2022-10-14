import { FormActionTypes } from './FormActionTypes'

const setFormConstants = (payload) => ({
  type: FormActionTypes.SET_FORM,
  payload
})

const updateFormField = (payload) => ({
  type: FormActionTypes.UPDATE_FORM_STORE,
  payload
});

const clearAllForms = () => ({
  type: FormActionTypes.CLEAR_FORM_STORE
})


export const formActions = { setFormConstants, updateFormField, clearAllForms }
