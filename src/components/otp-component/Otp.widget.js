import React from "react";
import { otpWidgetStyle } from "./otp.style";
import { Button, Input } from "@material-ui/core";
import { Notification } from "../Notification";

const Otp = ({
  type,
  email,
  phone,
  value,
  onChange,
  disabled = false,
  onSubmit,
  resendOtp,
  handleChange,
  handlePaste,
}) => {
  return (
    <StyledWidget>
      <div className="otp-container margin-left-right-auto" onPaste={handlePaste}>
        <div className="display-flex justify-flex-end">
          <div className="mar-1" onClick={handleChange}>X</div>
        </div>
        <div className="otp-sub-title justify-content margin-subtitle">
          OTP sent on your {type}
        </div>
        <div className="otp-sub-title justify-content">
          {type === "Email" ? email : phone}
          <div onClick={handleChange} className="display-link">Change</div>
          {/* &nbsp;<Link to={to}>Change</Link> */}
        </div>
        <Notification className="notification-container" />
        <br />
        <br />
        <div className="otp-sub-title justify-content">Enter OTP</div>
        <br />
        <div className="otp-input">
          <Input
            name="OTP"
            placeholder={"Enter OTP"}
            value={value}
            autoFocus
            style={{ fontSize: '18px' }}
            type="number"
            onChange={onChange}
            onKeyDown={(e) => e.keyCode === 69}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          aria-label="submit-otp"
          disableElevation
          className="confirm-button"
          onClick={onSubmit}
          disabled={disabled}
          key={`${disabled}`}
        >
          Confirm
        </Button>
        <div className='otp-sub-title justify-content margin-alignment'>
          Didn't receive it? &nbsp;
              <div className="resend-otp" onClick={resendOtp}>
            Resend OTP
            </div>
        </div>
        <br />
      </div>
    </StyledWidget>
  );
};

const StyledWidget = otpWidgetStyle;

export const OtpWidget = Otp