import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import * as services from "../../services";
import { store } from "../../services";
import { checkValidationRules } from "./FormValidationRules";
import { validationRules } from "./FormValidations";

export const updateFormStore = ({ form, field, value, category }) => {
  const { formActions } = services;
  const { getState, dispatch } = store;
  const existingProps = _get(getState(), `form.${form}`)[field];
  const fieldToBeUpdated = category
    ? { [field]: { ...existingProps, value, category } }
    : { [field]: { ...existingProps, value } };
  const updatedForm = {
    ..._get(getState(), `form.${form}`),
    ...fieldToBeUpdated,
  };
  dispatch(formActions.updateFormField({ [form]: updatedForm }));
};

export const updateFormProperty = ({ form, field, property, value }) => {
  const { formActions } = services;
  const { getState, dispatch } = store;
  const existingProps = _get(getState(), `form.${form}`)[field];
  const fieldToBeUpdated = { [field]: { ...existingProps, [property]: value } };
  const updatedForm = {
    ..._get(getState(), `form.${form}`),
    ...fieldToBeUpdated,
  };
  dispatch(formActions.updateFormField({ [form]: updatedForm }));
};

const getUpdatedState = (state, form, field, value) => {
  const data = { ...state[form][field] };
  const updatedFieldData = { ...data, value: field };
  const updatedForm = {
    ...state[form],
    [field]: { ...updatedFieldData },
  };
  const updateFormData = {
    ...state,
    [form]: { ...updatedForm },
  };
  return updateFormData;
};

export const validateField = ({ form, field, data }) => {
  const { formActions } = services;
  let breakRulesCheck = false;
  const { getState, dispatch } = store;
  // get form object
  const formValidationUpdatedState = data
    ? getUpdatedState(_get(getState(), "form", {}), form, field, data)
    : _get(getState(), "form", {});

  const currentField = _get(getState(), "form", {})[form][field];
  const validatedFieldData = { ...currentField };

  // get rules for validation from form constants
  const { rules, value } = currentField;
  // check if rule is REQUIRED
  const isRequired =
    rules && rules.filter((rule) => rule.indexOf("REQUIRED") > -1).length > 0;
  const isValidationRequired = !(!isRequired && value === "");
  if (!_isEmpty(rules)) {
    rules.forEach((element) => {
      if (!breakRulesCheck) {
        let isValid = true;
        const ruleSeparatedValue = element.split("-");
        const validatorRule = ruleSeparatedValue[0];
        const validatorLimit = ruleSeparatedValue[1] || null;
        const validatorName = validationRules[validatorRule];
        if (checkValidationRules[validatorName] && isValidationRequired) {
          isValid = validatorLimit
            ? checkValidationRules[validatorName](validatorLimit, value)
            : checkValidationRules[validatorName](value);
        }
        validatedFieldData.isValid = isValid;
        if (!isValid) {
          breakRulesCheck = true;
        }
      }
    });
  }
  const formData = {
    ...formValidationUpdatedState[form],
    [field]: validatedFieldData,
  };
  const updateFormState = {
    ...formValidationUpdatedState,
    [form]: { ...formData },
  };
  if (dispatch && formActions) {
    dispatch(formActions.updateFormField({ ...updateFormState }));
  }
  return formData[field];
};
