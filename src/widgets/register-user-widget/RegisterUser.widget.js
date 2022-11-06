import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { registerUserMapStateToProps, registerUserMapDispatchToProps } from './registeruser.model';
import { registerWidgetStyle } from './registeruser.style';
import { AuthBanner, Notification } from '../../components';
import { TextField, InputAdornment, IconButton, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import _get from 'lodash/get';
import { updateFormStore, validateField, updateFormProperty, globalUtils } from '../../utils';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link, withRouter } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';

const RegisterUser = (props) => {
    const {
        signupForm, clearNotification, loginForm, postSignup, authorizationToken, history,
        product
    } = props;
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [checkBoxChecked, setCheckBoxChecked] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);


    useEffect(() => {
        if (authorizationToken) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (globalUtils.getSessionStorageItem("godhan-flow") === 'view-product') {
                globalUtils.removeSessionStorageItem("godhan-flow");
                globalUtils.setSessionStorageItem("godhan-next-flow", "/");
                history.push(`/product/${product.productID}`)
            } else {
                history.push("/");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorizationToken])

    const handleChange = (e) => {
        const { value, name } = e.target;
        updateFormStore({ form: 'signupForm', field: name, value: value });
    };

    const handleBlur = (e) => {
        const { value, name } = e.target;
        if (name === 'confirmpassword') {
            if (value === _get(signupForm, 'password.value')) {
                validateField({ form: 'signupForm', field: name, data: value });
                updateFormProperty({ form: 'signupForm', field: name, property: 'isValid', value: true });
                return;
            }
            updateFormProperty({ form: 'signupForm', field: name, property: 'isValid', value: false });
        }
        else if (_get(signupForm, 'confirmpassword.value') && name === 'password') {
            if (value === _get(signupForm, 'confirmpassword.value')) {
                updateFormProperty({ form: 'signupForm', field: 'confirmpassword', property: 'isValid', value: true });
                return;
            }
            updateFormProperty({ form: 'signupForm', field: 'confirmpassword', property: 'isValid', value: false });
            return;
        }
        else {
            validateField({ form: 'signupForm', field: name, data: value });
        }
    };

    const isSignupDisabled = () => (
        !_get(signupForm, 'name.value') || !_get(signupForm, 'name.isValid')
        || !_get(signupForm, 'password.value') || !_get(signupForm, 'password.isValid')
        || !_get(signupForm, 'confirmpassword.value') || !_get(signupForm, 'confirmpassword.isValid')
        || !checkBoxChecked
    )

    const handleSubmit = () => {
        clearNotification()
        postSignup({
            name: _get(signupForm, 'name.value'), email: _get(loginForm, 'emailAddress.value', ""),
            password: _get(signupForm, 'password.value'), mobileNumber: _get(loginForm, 'mobileNumber.value', null)
        });
    }
    return (
        <StyledWidget>
            <div className="auth-header">
                <div className="auth-wrapper">
                    <AuthBanner title="Signup" />
                    <Notification />
                    <div className="select-title">Select an option to proceed</div>
                    <div className="register-user-body">
                        <TextField
                            name={_get(signupForm, 'name.name')}
                            placeholder={_get(signupForm, 'name.placeholder')}
                            variant="outlined"
                            color="primary"
                            type="text"
                            margin="normal"
                            value={_get(signupForm, 'name.value')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!_get(signupForm, "name.isValid")}
                            helperText={!_get(signupForm, "name.isValid") && _get(signupForm, 'name.errorText')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name={_get(signupForm, 'password.name')}
                            placeholder={_get(signupForm, 'password.placeholder')}
                            variant="outlined"
                            color="primary"
                            type={showPassword ? "text" : "password"}
                            margin="normal"
                            value={_get(signupForm, 'password.value')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!_get(signupForm, "password.isValid")}
                            helperText={!_get(signupForm, "password.isValid") && _get(signupForm, 'password.errorText')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='end'>
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            name={_get(signupForm, 'confirmpassword.name')}
                            placeholder={_get(signupForm, 'confirmpassword.placeholder')}
                            variant="outlined"
                            color="primary"
                            type={showConfirmPassword ? "text" : "password"}
                            margin="normal"
                            value={_get(signupForm, 'confirmpassword.value')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!_get(signupForm, "confirmpassword.isValid")}
                            helperText={!_get(signupForm, "confirmpassword.isValid") && _get(signupForm, 'confirmpassword.errorText')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='end'>
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FormControlLabel
                            name="acceptTermsAndConditions"
                            control={<Checkbox
                                color="primary"
                                required
                                value={checkBoxChecked}
                                onChange={() => {
                                    setCheckBoxChecked(!checkBoxChecked)
                                    clearNotification()
                                }}
                            />}
                            label={
                                <span>
                                    I agree with all the{" "}
                                    <Link to="/terms-of-use" className="primary">terms &amp; conditions</Link>
                                </span>
                            }
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="signup-button"
                            size="large"
                            aria-label="log in"
                            disableElevation
                            onClick={() => handleSubmit()}
                            disabled={isSignupDisabled()}
                            key={`${isSignupDisabled()}`}
                        >
                            Sign up
                </Button>

                    </div>
                    <div className="justify-content new-user-label">Already a member? &nbsp;<Link to="/login">Login</Link></div>
                </div></div>
        </StyledWidget>
    )
}

const StyledWidget = registerWidgetStyle;

export const RegisterUserWidget = withRouter(connect(registerUserMapStateToProps, registerUserMapDispatchToProps)(RegisterUser));