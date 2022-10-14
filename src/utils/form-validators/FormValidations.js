/* eslint-disable */
 
export const validationRules = {
    REQUIRED: "required",
    ISNUMBER: "isNumeric",
    MINLENGTH: "minLength",
    MAXLENGTH: "maxLength",
    ISEMAIL: "isEmail",
    ISNAME: "isName",
    ISPASSWORD: "isPassword",
    ISSPACED: "isStartsWithSpace"
}

export const validationExp = {
    ISNUMBER: "^[0-9]+$",
    ISEMAIL: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$",
    ISNAME: "^(?![ .]+$)[a-zA-Z .]*$",
    ISPASSWORD: "^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\\-_.]).{8,}$",
    ISSPACED: "^[a-zA-Z0-9]+[ A-Za-z0-9_@.,/#()?/&+-/!%:;/\\n]*$",
    ISAMOUNT: "^[0-9]+(\.[0-9][0-9])?$"
}