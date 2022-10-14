import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loginWidgetStyle } from "./LoginWidget.style";
import {
  loginMapStateToProps,
  loginMapDispatchToProps,
} from "./LoginWidget.model";
import { AuthBanner, Notification, ModalComponent } from "../../components";
import { TextField, InputAdornment, Button, Divider } from "@material-ui/core";
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
import { Link, withRouter } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Select from "../../components/Select/Select";

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
    updateFormStore({
      form: "loginForm",
      field: "mobileNumberPrefix",
      value: localStorage.getItem("godhan-location") || "CA",
    });
    if(globalUtils.isTokenAvailable()){
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

  const handleKeyPress = () => {};

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
        if (_get(loginForm, "mobileNumberPrefix.value")) {
          localStorage.setItem(
            "godhan-location",
            _get(loginForm, "mobileNumberPrefix.value")
          );
        }
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

  const handleMobileNumberPrefix = (value) => {
    handleChange({
      target: { name: _get(loginForm, "mobileNumberPrefix.name"), value },
    });
    if (value === "AU" && globalUtils.getCountryFromLocalStorage() !== "AU") {
      setFormData({
        loginForm: {
          ...loginForm,
          mobileNumber: {
            ..._get(loginForm, "mobileNumber"),
            rules: ["ISNUMBER", "MINLENGTH-9", "MAXLENGTH-10"],
          },
        },
      });
    }
    if (globalUtils.getCountryFromLocalStorage() === "AU" && value !== "AU") {
      setFormData({
        loginForm: {
          ...loginForm,
          mobileNumber: {
            ..._get(loginForm, "mobileNumber"),
            rules: ["ISNUMBER", "MINLENGTH-10", "MAXLENGTH-10"],
          },
        },
      });
    }
    localStorage.setItem("godhan-location", value);
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
      <AuthBanner title="Login" />
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
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <div className="select-title or-title">Or</div>
      <div
        style={{ maxHeight: 46 }}
        className="display-flex MuiFormControl-marginNormal"
      >
        <Select
          placeholderStyle={{ fontSize: 18, fontWeight: 600 }}
          style={{ marginRight: 10, height: "100%" }}
          selectStyle={{ height: "100%" }}
          value={_get(loginForm, "mobileNumberPrefix.value")}
          onChange={(value) => {
            handleMobileNumberPrefix(value);
          }}
          options={[
            { value: "IN", label: "+91" },
            { value: "CA", label: "+1" },
            { value: "AU", label: "+61" },
          ]}
        />

        <TextField
          name={_get(loginForm, "mobileNumber.name")}
          className={_get(loginForm, "emailAddress.value") && "disabled-view"}
          placeholder="Mobile Number"
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
        />
      </div>
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
      >
        Continue
      </Button>
      <div className="select-title-small justify-content">Or</div>
      <div className="login-with-label justify-content">Login with</div>
      <Divider variant="middle" className="divider-login-with" />
      <div style={{ marginTop: 10 }} className="oauth-section">
        <div className="row">
          <a href={globalConstants.oauthConstants.FACEBOOK_AUTH_URL}>
            <img
              src="/assets/images/fb-icon.svg"
              alt="fb-icon"
              className="fb-icon"
            />
          </a>
          <a href={globalConstants.oauthConstants.GOOGLE_AUTH_URL}>
            <img
              src="/assets/images/google-icon.svg"
              alt="google-icon"
              className="fb-icon"
            />
          </a>
        </div>
        <div className="row">
          <div className="oauth-label">
            <a href={globalConstants.oauthConstants.FACEBOOK_AUTH_URL}>
              Facebook
            </a>
          </div>
          <div className="oauth-label">
            <a href={globalConstants.oauthConstants.GOOGLE_AUTH_URL}>Google</a>
          </div>
        </div>
        <Divider variant="middle" className="divider-login-with post-login" />
      </div>
      <div className="justify-content new-user-label">
        New User? &nbsp;<Link to="/signup">Signup</Link>
      </div>
      <Link to="/">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          aria-label="log in"
          className="continue-button"
          style={{
            width: 100,
            height: 30,
            padding: 0,
            paddingLeft: 13,
          }}
        >
          Skip <ChevronRightIcon className="righ-arrow" />
        </Button>
      </Link>
    </StyledWidget>
  );
};
const StyledWidget = loginWidgetStyle;

export const LoginWidget = withRouter(
  connect(loginMapStateToProps, loginMapDispatchToProps)(LoginComponent)
);
