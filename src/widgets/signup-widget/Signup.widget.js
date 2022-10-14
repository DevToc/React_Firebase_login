import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signupWidgetStyle } from "./Signup.style";
import {
  signupMapDispatchToProps,
  signupMapStateToProps,
} from "./Signup.model";
import { AuthBanner, Notification, ModalComponent, } from "../../components";
import Select from "../../components/Select/Select";
import { TextField, InputAdornment, Button, Divider } from "@material-ui/core";
import _get from "lodash/get";
import { updateFormStore, validateField, globalConstants, updateFormProperty, globalUtils } from "../../utils";
import EmailIcon from "@material-ui/icons/Email";
import { Link, withRouter } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const SignupComponent = (props) => {
  const {
    loginForm,
    checkUserAvailability,
    history,
    authorizationStatus, createNotification,
    clearAuthStore, setNotification, setFormData, clearNotification
  } = props;

  const [isPopupOpen, setOpenConfirmationPopup] = useState(false);

  useEffect(() => {
    clearNotification();
    clearAuthStore();
    updateFormStore({ form: "loginForm", field: 'mobileNumberPrefix', value: localStorage.getItem('godhan-location') || 'CA' });
    if(globalUtils.isTokenAvailable()){
      history.push("/")
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (authorizationStatus) {
      case "existinguser":
        clearAuthStore();
        createNotification({
          message: 'Already Registered! Click on Cancel to go back. Click on OK to continue Login', isSuccessful: true,
          onCancel: () => history.goBack(),
          isCancelAvailable: true
        })
        history.push("/login");
        break;
      case "newuser":
        clearAuthStore();
        history.push("/otp-confirmation");
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

  }

  const handleFocus = (e) => {
    if (e.target.name === 'mobileNumber' && _get(loginForm, "emailAddress.value")) {
      setOpenConfirmationPopup(true);
      return true;
    }
    if (e.target.name === 'emailAddress' && _get(loginForm, "mobileNumber.value")) {
      setOpenConfirmationPopup(true);
      return true;
    }
  }

  const handleCloseClick = () => {
    if (_get(loginForm, "emailAddress.value")) {
      disableEmail();
      setOpenConfirmationPopup(false);
    } else {
      disableMobile();
      setOpenConfirmationPopup(false);
    }
  }

  const handleCancel = () => {
    document.activeElement.blur();
    setOpenConfirmationPopup(false);
  }

  const disableMobile = () => {
    if (_get(loginForm, 'mobileNumber.value')) {
      updateFormStore({ form: "loginForm", field: 'mobileNumber', value: '' })
      updateFormProperty({ form: "loginForm", field: 'mobileNumber', property: 'isValid', value: true })
    }
  }

  const disableEmail = () => {
    if (_get(loginForm, 'emailAddress.value')) {
      updateFormStore({ form: "loginForm", field: 'emailAddress', value: '' })
      updateFormProperty({ form: "loginForm", field: 'emailAddress', property: 'isValid', value: true })
    }
  }

  const handleKeyPress = () => { };

  const handleSubmit = () => {
    if(_get(loginForm, 'mobileNumberPrefix.value')){
      localStorage.setItem('godhan-location', _get(loginForm, 'mobileNumberPrefix.value'))
    }
    if (_get(loginForm, 'emailAddress.value') && _get(loginForm, 'mobileNumber.value')) {
      setNotification({
        message: 'Please enter either email or mobile.',
        severity: globalConstants.notificationMessageSeverity.WARNING,
      });
    } else {
      if (_get(loginForm, "emailAddress.value")) {
        return checkUserAvailability({
          email: _get(loginForm, "emailAddress.value"),
        });
      }
      checkUserAvailability({
        mobileNumber: _get(loginForm, "mobileNumber.value"),
        prefix: _get(loginForm, "mobileNumberPrefix.value"),
      });
    }
  };

  const isLoginFormValid = () => false;

  const handleMobileNumberPrefix = (value) => {
    handleChange({
      target: { name: _get(loginForm, "mobileNumberPrefix.name"), value },
    });
    if(value === 'AU' && globalUtils.getCountryFromLocalStorage() !== 'AU'){
      setFormData({
        loginForm: {
          ...loginForm,
          mobileNumber: {
            ..._get(loginForm, 'mobileNumber'),
            rules: ['ISNUMBER', 'MINLENGTH-9', 'MAXLENGTH-10']
          }
        }
      })
    }
    if(globalUtils.getCountryFromLocalStorage() === 'AU' && value !== 'AU'){
      setFormData({
        loginForm: {
          ...loginForm,
          mobileNumber: {
            ..._get(loginForm, 'mobileNumber'),
            rules: ['ISNUMBER', 'MINLENGTH-10', 'MAXLENGTH-10']
          }
        }
      })
    }
    localStorage.setItem("godhan-location", value);

  }

  return (
    <StyledWidget style={{ paddingBottom: 20 }}>
      <ModalComponent
        open={isPopupOpen}
        setOpen={setOpenConfirmationPopup}
        message={`By proceeding, the current ${_get(loginForm, "emailAddress.value") ? 'Email Address' : 'Mobile Number'} will be cleared`}
        handleCloseClick={handleCloseClick}
        isCancelAvailable
        handleCancel={handleCancel}
      />
      <AuthBanner title="Signup" />
      <Notification />
      <div className="select-title">Select an option to proceed</div>
      <TextField
        name="emailAddress"
        label=""
        placeholder="E-Mail"
        variant="outlined"
        color="primary"
        className={_get(loginForm, "mobileNumber.value") && "disabled-view"}
        margin="normal"
        value={_get(loginForm, "emailAddress.value")}
        defaultValue={_get(loginForm, "emailAddress.value")}
        onChange={(e) => { handleChange(e); }}
        onClick={(e) => handleFocus(e)}
        onBlur={(e) => { handleBlur(e) }}
        onKeyPress={handleKeyPress}
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
      <div style={{ marginTop: 8, marginBottom: 6 }} className="select-title">
        Or
      </div>
      <div className="display-flex MuiFormControl-marginNormal">
        <Select
          placeholderStyle={{ fontSize: 18, fontWeight: 600 }}
          style={{ marginRight: 10 }}
          value={_get(loginForm, "mobileNumberPrefix.value")}
          onChange={(value) => handleMobileNumberPrefix(value)}
          options={[
            { value: "IN", label: "+91" },
            { value: "CA", label: "+1" },
            { value: "AU", label: "+61" },
          ]}
        />

        <TextField
          name={_get(loginForm, "mobileNumber.name")}
          placeholder="Mobile Number"
          variant="outlined"
          color="primary"
          type="tel"
          fullWidth
          className={_get(loginForm, "emailAddress.value") && "disabled-view"}
          style={{ marginTop: 0 }}
          value={_get(loginForm, "mobileNumber.value")}
          defaultValue={_get(loginForm, "mobileNumber.value")}
          onChange={(e) => { handleChange(e); }}
          onClick={(e) => handleFocus(e)}
          onFocus={() => globalUtils.scrollOnClick("mobileNumber")}
          onKeyPress={handleKeyPress}
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
        onClick={() => handleSubmit()}
        className="continue-button"
      >
        Get OTP
      </Button>
      <div className="select-title-small justify-content">Or</div>
      <div className="login-with-label justify-content">Signup with</div>
      <Divider variant="middle" className="divider-login-with" />
      <div className="oauth-section">
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
      <div style={{ marginTop: 8 }} className="justify-content new-user-label">
        Already a member? &nbsp;<Link to="/login">Login</Link>
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
const StyledWidget = signupWidgetStyle;

export const SignupWidget = withRouter(
  connect(signupMapStateToProps, signupMapDispatchToProps)(SignupComponent)
);
