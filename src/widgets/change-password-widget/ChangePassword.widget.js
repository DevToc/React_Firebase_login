import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import _get from 'lodash/get'
import { changePasswordMapStateToProps, changePasswordMapDispatchToProps } from './changepassword.model'
import { changePasswordWidgetStyle } from './changepassword.style'
import { AuthBanner } from '../../components'
import { updateFormStore, validateField, updateFormProperty, globalUtils } from '../../utils'
import { TextField, InputAdornment, IconButton, Button } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import LockIcon from '@material-ui/icons/Lock';
import { Link } from 'react-router-dom'
const ChangePassword = (props) => {
    const { loginForm, signupForm, clearNotification, updatePassword } = props;
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const handleClickShowPassword = (e) => {
        setShowPassword(!showPassword)
    }
    const handleClickShowConfirmPassword = (e) => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const handleChange = (e) => {
        const { value, name } = e.target
        updateFormStore({ form: 'signupForm', field: name, value: value })
    }

    const handleBlur = (e) => {
        const { value, name } = e.target;
        if (name === 'confirmpassword') {
            updateFormStore({ form: 'signupForm', field: name, value: value })
            if (value === _get(signupForm, 'password.value')) {
                return validateField({ form: 'signupForm', field: name, data: value });
            }
            return updateFormProperty({ form: 'signupForm', field: name, property: 'isValid', value: false });
        }
        validateField({ form: 'signupForm', field: name, data: value })

    }

    const updatePasswordClick = () => {
        clearNotification();
        updatePassword({
            password: _get(signupForm, 'password.value'),
            mobileNumber: _get(loginForm, 'mobileNumber.value'),
            email: _get(loginForm, 'emailAddress.value')
        })
    }

    const isForgotPasswordButtonDisabled = () => (
        !_get(signupForm, 'password.value') || !_get(signupForm, 'confirmpassword.value') ||
        _get(signupForm, 'password.value') !== _get(signupForm, 'confirmpassword.value')
    )

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isForgotPasswordButtonDisabled()) {
            updatePasswordClick()
        }
    }

    return (
        <StyledWidget>
            <AuthBanner title="Change Password" />
            <div className="change-password-body">
                <TextField
                    name='password'
                    className="password-field justify-content"
                    placeholder='Password'
                    variant='outlined'
                    color='primary'
                    type={showPassword ? 'text' : 'password'}
                    autoFocus
                    margin='normal'
                    value={_get(signupForm, 'password.value')}
                    error={!_get(signupForm, 'password.isValid')}
                    helperText={!_get(signupForm, 'password.isValid') && _get(signupForm, 'password.errorText')}
                    onChange={handleChange}
                    onFocus={() => globalUtils.scrollOnClick("password")}
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
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    edge='end'
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    name='confirmpassword'
                    placeholder='Confirm Password'
                    variant='outlined'
                    color='primary'
                    type={showConfirmPassword ? 'text' : 'password'}
                    margin='normal'
                    value={_get(signupForm, 'confirmpassword.value')}
                    error={!_get(signupForm, 'confirmpassword.isValid')}
                    helperText={!_get(signupForm, 'confirmpassword.isValid') && _get(signupForm, 'confirmpassword.errorText')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    onFocus={() => globalUtils.scrollOnClick("confirmpassword")}
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
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowConfirmPassword}
                                    edge='end'
                                >
                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Link to="/">
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        size='large'
                        className="change-password-button"
                        aria-label='forgot-password'
                        disableElevation
                        onClick={updatePasswordClick}
                        disabled={isForgotPasswordButtonDisabled()}
                        key={`${isForgotPasswordButtonDisabled()}`}
                    >
                        Continue
                    </Button>
                </Link>
            </div>
        </StyledWidget>
    )
}

const StyledWidget = changePasswordWidgetStyle;

export const ChangePasswordWidget = withRouter(connect(changePasswordMapStateToProps, changePasswordMapDispatchToProps)(ChangePassword))