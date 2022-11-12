import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loginWidgetStyle } from "./LoginWidget.style";
import {
  loginMapStateToProps,
  loginMapDispatchToProps,
} from "./LoginWidget.model";
import { Notification, ModalComponent } from "../../components";
import { TextField, InputAdornment, Button } from "@material-ui/core";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { formConstants } from "./LoginWidget.constants";
import {
  updateFormStore,
  validateField,
  globalConstants,
  globalUtils,
  updateFormProperty,
} from "../../utils";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone"
import { Link, withRouter } from "react-router-dom";
import FacebookIcon from '@material-ui/icons/Facebook';
import GoogleIcon from '@material-ui/icons/Mail';

const LoginComponent = (props) => {
  const {
    loginForm,
    setFormData,
    checkUserAvailability,
    history,
    authorizationStatus,
    clearAuthStore,
    signupForm,
    setNotification,
    createNotification,
    clearNotification
  } = props;

  const [isPopupOpen, setOpenConfirmationPopup] = useState(false);

  useEffect(() => {
    clearNotification();
    if (_isEmpty(loginForm) || _isEmpty(signupForm)) {
      setFormData(formConstants);
    }
    if (globalUtils.isTokenAvailable()) {
      history.push("/")
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (authorizationStatus) {
      case "existinguser":
        clearAuthStore();
        history.push("/password");
        break;
      case "newuser":
        clearAuthStore();
        createNotification({
          message:
            "Not a member yet! Click on Cancel to go back to login. Click on OK to continue Sign up",
          isSuccessful: true,
          onCancel: () => history.goBack(),
          isCancelAvailable: true,
        });
        history.push("/signup");
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [authorizationStatus]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (handleFocus(e)) {
      return;
    }
    if (parseInt(value) && value.length > 10) {
      return;
    }
    updateFormStore({ form: "loginForm", field: name, value: value });
  };

  const handleBlur = (e) => {
    const { value, name } = e.target;
    validateField({ form: "loginForm", field: name, data: value?.trim() });
  };

  const handleKeyPress = () => { };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      _get(loginForm, "emailAddress.value") &&
      _get(loginForm, "mobileNumber.value")
    ) {
      setNotification({
        message: "Please enter either email or mobile.",
        severity: globalConstants.notificationMessageSeverity.WARNING,
      });
    } else {
      if (_get(loginForm, "emailAddress.value", "")) {
        return checkUserAvailability({
          email: _get(loginForm, "emailAddress.value"),
        });
      }
      if (_get(loginForm, "mobileNumber.value")) {
        checkUserAvailability({
          mobileNumber: _get(loginForm, "mobileNumber.value"),
          prefix: _get(loginForm, "mobileNumberPrefix.value"),
        });
      } else {
        setNotification({
          message: "Please enter either email or mobile.",
          severity: globalConstants.notificationMessageSeverity.WARNING,
        });
      }
    }
  };

  const isLoginFormValid = () => false;

  const disableMobile = () => {
    if (_get(loginForm, "mobileNumber.value")) {
      updateFormStore({ form: "loginForm", field: "mobileNumber", value: "" });
      updateFormProperty({
        form: "loginForm",
        field: "mobileNumber",
        property: "isValid",
        value: true,
      });
    }
  };

  const disableEmail = () => {
    if (_get(loginForm, "emailAddress.value")) {
      updateFormStore({ form: "loginForm", field: "emailAddress", value: "" });
      updateFormProperty({
        form: "loginForm",
        field: "emailAddress",
        property: "isValid",
        value: true,
      });
    }
  };

  const handleFocus = (e) => {
    if (
      e.target.name === "mobileNumber" &&
      _get(loginForm, "emailAddress.value")
    ) {
      setOpenConfirmationPopup(true);
      return true;
    }
    if (
      e.target.name === "emailAddress" &&
      _get(loginForm, "mobileNumber.value")
    ) {
      setOpenConfirmationPopup(true);
      return true;
    }
  };

  const handleCloseClick = () => {
    if (_get(loginForm, "emailAddress.value")) {
      disableEmail();
      setOpenConfirmationPopup(false);
    } else {
      disableMobile();
      setOpenConfirmationPopup(false);
    }
  };

  const handleCancel = () => {
    document.activeElement.blur();
    setOpenConfirmationPopup(false);
  };

  return (
    <StyledWidget style={{ paddingBottom: 20 }}>
      <ModalComponent
        open={isPopupOpen}
        setOpen={setOpenConfirmationPopup}
        message={`By proceeding, the current ${
          _get(loginForm, "emailAddress.value")
            ? "Email Address"
            : "Mobile Number"
          } will be cleared`}
        handleCloseClick={handleCloseClick}
        isCancelAvailable
        handleCancel={handleCancel}
      />
      <div className="auth-header">
        <div className="auth-wrapper">
          <div className="body-section">
            <div className="godhan-title">Godhan</div>
            <h2
              style={{ marginTop: 5, marginBottom: 10 }}
              className="godhan-sub-title"
            >
              Login
          </h2>
          </div>
          {/* <AuthBanner title="Login" /> */}
          <Notification />
          <div className="select-title">Select an option to proceed</div>
          <TextField
            style={{ marginTop: 15 }}
            className={_get(loginForm, "mobileNumber.value") && "disabled-view"}
            name="emailAddress"
            label=""
            placeholder="E-Mail"
            variant="outlined"
            color="primary"
            margin="normal"
            value={_get(loginForm, "emailAddress.value")}
            defaultValue={_get(loginForm, "emailAddress.value")}
            onChange={(e) => {
              handleChange(e);
            }}
            onClick={(e) => handleFocus(e)}
            onKeyPress={handleKeyPress}
            onBlur={(e) => {
              handleBlur(e);
            }}
            onFocus={() => globalUtils.scrollOnClick("emailAddress")}
            error={!_get(loginForm, "emailAddress.isValid")}
            helperText={
              !_get(loginForm, "emailAddress.isValid") &&
              _get(loginForm, "emailAddress.errorText")
            }
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <div className="select-title or-title">Or</div>
          <div
            style={{ maxHeight: 46 }}
            className="display-flex MuiFormControl-marginNormal"
          >
            <TextField
              name={_get(loginForm, "mobileNumber.name")}
              className={_get(loginForm, "emailAddress.value") && "disabled-view"}
              placeholder="Mobile number"
              variant="outlined"
              color="primary"
              type="tel"
              fullWidth
              style={{ marginTop: 0, height: "100%" }}
              value={_get(loginForm, "mobileNumber.value")}
              defaultValue={_get(loginForm, "mobileNumber.value")}
              onChange={(e) => {
                handleChange(e);
              }}
              onKeyPress={handleKeyPress}
              onBlur={(e) => {
                handleBlur(e);
              }}
              onClick={(e) => handleFocus(e)}
              onFocus={() => globalUtils.scrollOnClick("mobileNumber")}
              error={!_get(loginForm, "mobileNumber.isValid")}
              helperText={
                !_get(loginForm, "mobileNumber.isValid") &&
                _get(loginForm, "mobileNumber.errorText")
              }
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="button-wrapper">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              aria-label="log in"
              disabled={isLoginFormValid()}
              key={`${isLoginFormValid()}`}
              onClick={(e) => handleSubmit(e)}
              className="continue-button"
              fullWidth
            >
              Continue
      </Button>
            <div className="select-title-small justify-content">Alternately, you can</div>
            <br />

            <Button
              variant="outlined"
              color="primary"
              type="submit"
              className="oauth-button"
              fullWidth
              endIcon={<FacebookIcon style={{ color: "#3b5998" }} />}>
              <a href={globalConstants.oauthConstants.FACEBOOK_AUTH_URL} className="black-color">
                Continue with
              </a>
            </Button>
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              fullWidth
              className="oauth-button"
              endIcon={<GoogleIcon style={{ color: '#c71610' }} />}>
              <a href={globalConstants.oauthConstants.GOOGLE_AUTH_URL} className="black-color">
                Continue with
              </a>
            </Button>
          </div>
          <div className="justify-content new-user-label">
            New user?&nbsp;<Link to="/signup" className="underline-text">Signup</Link>&nbsp;or&nbsp;<Link to="/" className="underline-text" style={{ textDecoration: 'underline' }}> Skip
            </Link>
          </div>
        </div>
      </div>
    </StyledWidget>
  );
};
const StyledWidget = loginWidgetStyle;

export const LoginWidget = withRouter(
  connect(loginMapStateToProps, loginMapDispatchToProps)(LoginComponent)
);
