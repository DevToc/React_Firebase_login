import React, { useEffect } from "react";
import { otpWidgetStyle } from "./otp.style";
import _get from "lodash/get";
import { connect } from "react-redux";
import { otpMapStateToProps, otpMapDispatchToProps } from "./otp.model";
import { AuthBanner, Notification } from "../../components";
import { withRouter } from "react-router-dom";
import {
  updateFormStore,
  validateField,
  globalUtils,
} from "../../utils";
import { Button, Input, useTheme } from "@material-ui/core";

const Otp = (props) => {
  const {
    loginForm,
    otp,
    clearNotification,
    checkOtpValidity,
    resendOtp,
    otpStatus,
    history,
  } = props;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { clearNotification() }, [])
  useEffect(() => {
    if (otpStatus === "signup") {
      if (globalUtils.getCurrentPage() === "otp-confirmation") {
        history.push("register-user");
      }
      if (globalUtils.getCurrentPage() === "forgot-password") {
        history.push("change-password");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpStatus]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isOtpButtonDisabled()) {
      postOtp();
    }
  };
  const isOtpButtonDisabled = () =>
    !_get(otp, "value") ||
    !_get(otp, "isValid") ||
    _get(otp, "value.length", 0) !== 6;

  const handleChange = (e) => {
    const { value } = e.target;
    if ((parseInt(value, 10) && value.length > 6)) {
      return;
    }
    updateFormStore({ form: "loginForm", field: "otp", value });
    validateField({ form: "loginForm", field: "otp", data: value });
  };

  const resendOtpToNumber = () => {
    clearNotification();
    if (_get(loginForm, "emailAddress.value")) {
      resendOtp({
        email: _get(loginForm, "emailAddress.value"),
      });
    } else {
      resendOtp({
        mobileNumber: _get(loginForm, "mobileNumber.value"),
      });
    }
  };

  const postOtp = () => {
    clearNotification();
    updateFormStore({ form: "loginForm", field: "otp", value: otp });
    if (_get(loginForm, "emailAddress.value")) {
      checkOtpValidity({
        email: _get(loginForm, "emailAddress.value"),
        otp: _get(otp, "value"),
      });
    } else {
      checkOtpValidity({
        mobileNumber: _get(loginForm, "mobileNumber.value"),
        otp: _get(otp, "value"),
      });
    }
    updateFormStore({ form: "loginForm", field: "otp", value: "" });
  };

  // const handlePaste = (e) => {
  //   const clipboardData = e.clipboardData || e.originalEvent.clipboardData || window.clipboardData;
  //   const otp = clipboardData.getData('text');
  //   if (otp.length === 6) {
  //     updateFormStore({ form: "loginForm", field: "otp", value: otp });
  //   }
  // }

  const handleChangeButtonClick = () => {
    history.goBack()
  }

  return (
    <StyledWidget theme={useTheme()}>
      <div className="auth-header">
        <div className="auth-wrapper">
          <AuthBanner
            title={
              globalUtils.getCurrentPage() === "otp-confirmation"
                ? "Signup"
                : "Forgot Password"
            }
          />
          <span className="otp-container-box">
            <Notification />
          </span>
          <div className="otp-container margin-left-right-auto">
            <div className="display-flex justify-flex-end">
              <div onClick={handleChangeButtonClick}>
                <div className="mar-1">X</div>
              </div>
            </div>
            <div className="otp-sub-title justify-content margin-subtitle">
              OTP sent on your{" "}
              {_get(loginForm, "emailAddress.value") ? "Email" : "Mobile"}
            </div>
            <div className="otp-sub-title justify-content">
              <span className="otp-label">{_get(loginForm, "emailAddress.value") ||
                _get(loginForm, "mobileNumber.value")}{" "}</span>
              &nbsp;<div className="display-link underline-text" onClick={handleChangeButtonClick}>Change</div>
            </div>
            <br />
            <div className="otp-sub-title justify-content">Enter OTP</div>
            <br />
            <div onKeyPress={handleKeyPress} className="otp-input">
              <Input
                name="OTP"
                placeholder={"Enter OTP"}
                value={_get(otp, "value")}
                autoFocus
                style={{ fontSize: '18px' }}
                type="number"
                onChange={handleChange}
                error={!_get(otp, "isValid")}
                helperText={!_get(otp, "isValid") && _get(otp, "errorText")}
                onKeyDown={(e) => e.keyCode === 69}
              />
            </div>
            <Button
              style={{ borderRadius: 5 }}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              aria-label="submit-otp"
              disableElevation
              fullWidth
              className="confirm-button"
              onClick={() => postOtp()}
              disabled={isOtpButtonDisabled()}
              key={`${isOtpButtonDisabled()}`}
            >
              Confirm
        </Button>
            <div className='otp-sub-title justify-content margin-alignment'>
              <p>Did not receive it? <span className="display-link underline-text" onClick={() => resendOtpToNumber()}> Resend OTP</span></p>
            </div>
          </div>
        </div></div>
    </StyledWidget>
  );
};

const StyledWidget = otpWidgetStyle;

export const OtpWidget = withRouter(
  connect(otpMapStateToProps, otpMapDispatchToProps)(Otp)
);
