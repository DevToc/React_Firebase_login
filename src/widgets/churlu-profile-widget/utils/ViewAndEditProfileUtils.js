import OtpInput from "react-otp-input";
import React from "react";
import * as _ from "lodash";
import { Box, Typography } from "@material-ui/core";

export const otpInput = (
  handleOtpChange,
  handleOtpBlur,
  otpForm,
  fieldName
) => (
  <>
    <OtpInput
      numInputs={6}
      inputStyle="otp-input"
      containerStyle="otp-input-container"
      focusStyle="otp-input--focused"
      shouldAutoFocus
      value={_.get(otpForm, `${fieldName}.value`)}
      onChange={(e) => handleOtpChange(e, fieldName)}
      onBlur={(e) => handleOtpBlur(e, fieldName)}
      error={!_.get(otpForm, `${fieldName}.isValid`)}
      helperText={
        !_.get(otpForm, `${fieldName}.isValid`) &&
        _.get(otpForm, `${fieldName}.errorText`)
      }
      isInputNum="true"
    />
  </>
);

export const verifyOtp = (otpForm, verifyYourOtp, fieldName) => (
  <Typography
    component="h3"
    align="left"
    color="primary"
    onClick={verifyYourOtp}
    className="otp-button"
  >
    <Box
      fontWeight="bold"
      color="primary"
      className={
        _.get(otpForm, `${fieldName}.value.length`) < 6
          ? "text-disabled"
          : "pointer-cursor"
      }
    >
      Verify OTP
    </Box>
  </Typography>
);

export const getOtp = (
  sendOtp,
  profileForm,
  userDetails,
  fieldName,
  fieldFromUserDetails
) => (
  <Typography
    component="h3"
    align="left"
    color="primary"
    onClick={() => sendOtp(fieldName)}
  >
    <Box
      fontWeight="bold"
      color="primary"
      className={
        _.get(profileForm, `${fieldName}.value`) ===
          _.get(userDetails, fieldFromUserDetails) ||
        !_.get(profileForm, `${fieldName}.isValid`)
          ? "text-disabled"
          : "pointer-cursor"
      }
    >
      Get OTP
    </Box>
  </Typography>
);
