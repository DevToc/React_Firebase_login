import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import {
  passwordMapDispatchToProps,
  passwordMapStateToProps,
} from "./Password.model";
import { passwordWidgetStyle } from "./Password.style";
import { AuthBanner, Notification } from "../../components";
import { Link, withRouter } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import { updateFormStore, validateField, globalUtils } from "../../utils";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";
const PasswordComponent = (props) => {
  const {
    loginForm,
    postLoginWithPassword,
    clearNotification,
    sendOtp,
    authorizationToken,
    history,
    product
  } = props;

  useEffect(() => {
    if (authorizationToken) {
      if (globalUtils.getSessionStorageItem("godhan-flow") === 'view-product') {
        globalUtils.removeSessionStorageItem("godhan-flow");
        globalUtils.setSessionStorageItem("godhan-next-flow", "/");
        history.push(`/product/${product.productID}`)
      } else {
        history.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizationToken]);

  const getLoginCred = () =>
    _get(loginForm, "mobileNumber.value") ||
    _get(loginForm, "emailAddress.value");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { value, name } = e.target;
    updateFormStore({ form: "loginForm", field: name, value: value });
  };

  const handleBlur = (e) => {
    const { value, name } = e.target;
    validateField({ form: "loginForm", field: name, value: value });
  };

  const handleSubmit = () => {
    clearNotification();
    const { mobileNumber, password } = loginForm;
    if (_get(loginForm, "emailAddress.value")) {
      return postLoginWithPassword({
        email: _get(loginForm, "emailAddress.value"),
        password: _get(password, "value"),
      });
    }
    postLoginWithPassword({
      mobileNumber: _get(mobileNumber, "value"),
      password: _get(password, "value"),
    });
  };

  const isPasswordValid = () =>
    !_get(loginForm, "password.value") || !_get(loginForm, "password.isValid");

  const handleForgotClick = () => {
    const { mobileNumber } = loginForm;
    if (_get(loginForm, "emailAddress.value")) {
      return sendOtp({
        email: _get(loginForm, "emailAddress.value"),
      });
    }
    return sendOtp({ mobileNumber: _get(mobileNumber, "value") });
  };
  return (
    <StyledWidget>
      <AuthBanner title="Login" />
      <Notification />
      <div className="select-title">Signing in as {getLoginCred()}</div>
      <Link to="login" className="justify-content title-font">
        Change it here!
      </Link>
      <TextField
        style={{ marginTop: 30 }}
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        variant="outlined"
        color="primary"
        // autoFocus
        margin="normal"
        value={_get(loginForm, "password.value")}
        error={!_get(loginForm, "password.isValid")}
        helperText={
          !_get(loginForm, "password.isValid") &&
          _get(loginForm, "password.errorText")
        }
        onFocus={() => globalUtils.scrollOnClick("password")}
        onChange={handleChange}
        onBlur={handleBlur}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
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
      <Link
        to="forgot-password"
        className="justify-flex-end forgot-link"
        onClick={handleForgotClick}
        style={{ fontWeight: 600 }}
      >
        Forgot Password?
      </Link>

      <Button
        style={{ marginTop: 12 }}
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        aria-label="log in"
        className="login-button"
        disableElevation
        onClick={() => handleSubmit()}
        disabled={isPasswordValid()}
        key={`${isPasswordValid()}`}
      >
        Login
      </Button>
      <div className="justify-content new-user-label">
        New User? &nbsp;<Link to="/signup">Signup</Link>
      </div>
    </StyledWidget>
  );
};

const StyledWidget = passwordWidgetStyle;

export const PasswordWidget = withRouter(
  connect(
    passwordMapStateToProps,
    passwordMapDispatchToProps
  )(PasswordComponent)
);
