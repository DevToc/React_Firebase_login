import _isNumber from 'lodash/isNumber'
import { validationExp } from './FormValidations'

export const checkValidationRules = {
  required: (value = '') => (
    !!value
  ),
  isNumber: (value = '') => (
    new RegExp(validationExp.ISNUMBER).test(value)
  ),
  minLength: (limit, value = '') => {
    if (_isNumber(value)) {
      return value && value.toString().length >= parseInt(limit, 10)
    }
    return value && value.length >= parseInt(limit, 10)
  },
  maxLength: (limit, value = '') => {
    if (_isNumber(value)) {
      return value && value.toString().length <= parseInt(limit, 10)
    }
    return value && value.length <= parseInt(limit, 10)
  },
  isEmail: (value) => (
    new RegExp(validationExp.ISEMAIL).test(value)
  ),
  isName: (value) => (
    new RegExp(validationExp.ISNAME).test(value)
  ),
  isStartsWithSpace: (value) => (
    new RegExp(validationExp.ISSPACED).test(value)
  ),
  isPassword: (value) => (
    new RegExp(validationExp.ISPASSWORD).test(value)
  )

}
