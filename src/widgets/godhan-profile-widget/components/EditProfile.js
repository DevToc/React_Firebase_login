import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Button, useTheme} from "@material-ui/core";
import {editProfileMapDispatchToProps, editProfileMapStateToProps,} from "../models";
import _isEmpty from "lodash/isEmpty";
import {viewProfileStyle} from "../style";
import {globalConstants, globalUtils, updateFormStore, validateField,} from "../../../utils";
import * as _ from "lodash";
import BackHeader from "../../../components/back-header/BackHeader";
import Input from "../../../components/Input-component/InputComponent";
import {OtpWidget} from "../../../components/otp-component/Otp.widget";
import {formConstants} from "../utils";
import {useHistory} from "react-router";

const EditProfileComponent = ({
  setAuxiliaryOption,
  profileForm,
  userDetails,
  resendOtpToUser,
  otpForm,
  checkOtpValidity,
  postProfileUpdate,
  setNotification,
  clearNotification,
  setSelectedOption,
  handleDeleteConfirmation,
  setFormData,
  setErrorPopup,
  handleSignOut,
  error
}) => {
  const history = useHistory();
  const [otpDisplayed, displayOtp] = useState(false);
  const [emailOtpDisplayed, displayEmailOTP] = useState(false);
  const [isEmailEditable, setEmailEditable] = useState(false);
  const [isMobileNumEditable, setMobileNumEditable] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const resendOtp = (payload) => {
    clearNotification();

    if (_.get(payload, "email")) {
      resendOtpToUser({ email: _.get(payload, "email") });
    }
    if (_.get(payload, "mobileNumber")) {
      resendOtpToUser({ mobileNumber: _.get(payload, "mobileNumber") });
    }
  };

  useEffect(() => {
    sessionStorage.setItem("godhan-flow", "edit-profile");
    // if (!_.get(profileForm, 'mobileNumber.value') && !_.get(profileForm, 'emailAddress.value') && !_isEmpty(userDetails)) {
    if (_isEmpty(profileForm)) {
      setFormData(formConstants);
    }
    updateFormStore({
      form: "profileForm",
      field: "name",
      value: _.get(userDetails, "name", ""),
    });
    updateFormStore({
      form: "profileForm",
      field: "emailAddress",
      value: _.get(userDetails, "email", ""),
    });
    updateFormStore({
      form: "profileForm",
      field: "mobileNumber",
      value: _.get(userDetails, "mobileNumber", ""),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!_isEmpty(profileForm)) {
      updateFormStore({
        form: "profileForm",
        field: "name",
        value: _.get(userDetails, "name", ""),
      });
      updateFormStore({
        form: "profileForm",
        field: "emailAddress",
        value: _.get(userDetails, "email", ""),
      });
      updateFormStore({
        form: "profileForm",
        field: "mobileNumber",
        value: _.get(userDetails, "mobileNumber", ""),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "name")
      updateFormStore({ form: "profileForm", field: name, value });
    if (name === "emailAddress") {
      if (
        _.get(userDetails, "mobileNumber") !== null && _.get(profileForm, "mobileNumber.value") !==
        _.get(userDetails, "mobileNumber", "")
      ) {
        setErrorPopup({
          message:
            "Your mobile number has not been validated yet. Click on the Submit button to validate your mobile number",
          isSuccessful: false,
          // handleClose: () => { }
        });
      } else {
        updateFormStore({ form: "profileForm", field: name, value });
      }
    }
    if (name === "mobileNumber") {
      if (
        _.get(userDetails, "email", "") !== null &&
        _.get(profileForm, "emailAddress.value") !==
        _.get(userDetails, "email", "")
      ) {
        setErrorPopup({
          message:
            "Your email address has not been validated yet. Click on the Submit button to validate your email address",
          isSuccessful: false,
        });
      } else if (value.length > 10 || isNaN(value)) {
        return;
      } else {
        updateFormStore({ form: "profileForm", field: name, value });
      }
    }
  };

  const handleBlur = (e) => {
    const { value, name } = e.target;
    validateField({ form: "profileForm", field: name, data: value });
    if (!value) {
      updateFormStore({ form: "profileForm", field: name, value });
      validateField({ form: "profileForm", field: name, data: value });
    }
  };

  const sendOtp = (fieldName) => {
    if (_.get(profileForm, `${fieldName}.isValid`)) {
      if (
        _.get(profileForm, "mobileNumber.value") !==
        _.get(userDetails, "mobileNumber") &&
        fieldName === "mobileNumber"
      ) {
        displayOtp(true);
        resendOtp({ mobileNumber: _.get(profileForm, "mobileNumber.value") });
      }
      if (
        _.get(profileForm, "emailAddress.value") !==
        _.get(userDetails, "email") &&
        fieldName === "emailAddress"
      ) {
        displayEmailOTP(true);
        resendOtp({ email: _.get(profileForm, "emailAddress.value") });
      }
    }
    setNotification({
      message: `You are trying to update your ${
        fieldName === "mobileNumber" ? "mobile number" : "email address"
        }. To complete the update, please enter the otp sent to ${
        fieldName === "mobileNumber"
          ? _.get(profileForm, "mobileNumber.value")
          : _.get(profileForm, "emailAddress.value")
        }`,
      severity: globalConstants.notificationMessageSeverity.WARNING,
    });
  };

  const verifyYourOtp = () => {
    updateFormStore({
      form: "otpForm",
      field: "verificationStatus",
      value: true,
    });
    clearNotification();
    if (otpDisplayed) {
      checkOtpValidity({
        mobileNumber: _.get(profileForm, "mobileNumber.value"),
        otp: _.get(otpForm, "otp.value"),
      });
      displayOtp(false);
    } else {
      checkOtpValidity({
        email: _.get(profileForm, "emailAddress.value"),
        otp: _.get(otpForm, "emailOtp.value"),
      });
      displayEmailOTP(false);
    }
  };

  const handleOtpChange = (e, fieldName) => {
    const { value: otp } = e.target;
    if (otp.length > 6) {
      return;
    }
    if (fieldName === "otp") {
      updateFormStore({ form: "otpForm", field: "otp", value: otp });
      validateField({ form: "otpForm", field: "otp", data: otp });
    } else {
      updateFormStore({ form: "otpForm", field: "emailOtp", value: otp });
      validateField({ form: "otpForm", field: "otp", data: otp });
    }
  };

  const handleOtpBlur = (otp, fieldName) => {
    if (fieldName === "otp") {
      validateField({ form: "otpForm", field: "otp", data: otp });
      displayOtp(false);
    } else {
      validateField({ form: "otpForm", field: "emailOtp", data: otp });
      displayOtp(false);
    }
  };

  const handleSubmit = (flag = false) => {
    if (isMobileNumEditable && _.get(profileForm, "mobileNumber.value") !== _.get(userDetails, "mobileNumber"))
      return sendOtp("mobileNumber");
    if (isEmailEditable && _.get(profileForm, "emailAddress.value") !== _.get(userDetails, "email"))
      return sendOtp("emailAddress");
    postProfileUpdate({
      name: _.get(profileForm, "name.value"),
      pincode: _.get(profileForm, "pincode.value"),
    });
  };

  const isDisabled = () =>
    !_.get(profileForm, "pincode.isValid") ||
    !_.get(profileForm, "name.isValid");

  const handleChangeButtonClick = () => {
    if (_.get(error, 'isError')) {
      if (emailOtpDisplayed) {
        updateFormStore({
          form: "profileForm",
          field: "emailAddress",
          value: _.get(userDetails, "email", ""),
        });
      } else if (otpDisplayed) {
        updateFormStore({
          form: "profileForm",
          field: "mobileNumber",
          value: _.get(userDetails, "mobileNumber", ""),
        });
      }
    }
    displayEmailOTP(false);
    displayOtp(false);
  };

  const setEditableHandler = (type) => {
    if (type === "email") {
      setEmailEditable(true);
      setMobileNumEditable(false);
      if (!_.get(userDetails, "mobileNumber", "")) {
        // Clear mobile number
        updateFormStore({
          form: "profileForm",
          field: _.get(profileForm, "mobileNumber.name"),
          value: "",
        });
      }

    } else {
      setMobileNumEditable(true);
      setEmailEditable(false);
      if (!_.get(userDetails, "email", "")) {
        // Clear email
        updateFormStore({
          form: "profileForm",
          field: _.get(profileForm, "emailAddress.name"),
          value: userDetails.email,
        });
      }
    }
  };

  const handleDelete = () => {
    handleDeleteConfirmation({ handleClose });
  }
  const handleClose = () => {
    handleSignOut();
    history.push("/launch")
  }

  return (
    <>
      <ViewProfileStyle
        style={{
          justifyContent: "center",
          position: "relative",
        }}
        theme={useTheme()}
      >
        <BackHeader
          onGoBack={() => {
            setFormData(formConstants);
            setSelectedOption(3);
            history.goBack();
          }}
          title="Edit Profile"
        />
        <div className="edit-profile">
          <h2 style={{ alignSelf: "flex-start" }} className="heading-label">
            Update Information
          </h2>
          <form autoComplete="off" style={{ width: "100%" }}>
            <Input
              style={{ marginBottom: 23 }}
              name="name"
              isAutoComplete="off"
              onChange={handleChange}
              placeholder={_.get(profileForm, "name.placeholder")}
              value={_.get(profileForm, "name.value")}
              onBlur={handleBlur}
              error={!_.get(profileForm, "name.isValid")}
              errorText={
                !_.get(profileForm, "name.isValid") &&
                _.get(profileForm, "name.errorText")
              }
            />
          </form>
          <form autoComplete="off" style={{ width: "100%" }}>
            {isEmailEditable ? (
              <Input
                style={{ marginBottom: 23 }}
                name={_.get(profileForm, "emailAddress.name")}
                onChange={handleChange}
                placeholder={_.get(profileForm, "emailAddress.placeholder")}
                value={_.get(profileForm, "emailAddress.value")}
                onBlur={handleBlur}
                error={!_.get(profileForm, "emailAddress.isValid")}
                errorText={
                  !_.get(profileForm, "emailAddress.isValid") &&
                  _.get(profileForm, "emailAddress.errorText")
                }
                isAutoComplete="off"
              />
            ) : (
                <Input
                  style={{ marginBottom: 23 }}
                  name={_.get(profileForm, "emailAddress.name")}
                  placeholder={_.get(profileForm, "emailAddress.placeholder")}
                  value={_.get(profileForm, "emailAddress.value")}
                  disabled
                  right={
                    <span
                      onClick={() => setEditableHandler("email")}
                      className="input-edit-button"
                    >
                      Edit
                  </span>
                  }
                />
              )}
          </form>
          <form autoComplete="off" style={{ width: "100%" }}>
            <div className="display-flex">
              <Input
                name="mobileNumberPrefix"
                variant="outlined"
                color="primary"
                margin="normal"
                value={globalUtils.getCountryProperty(
                  "phoneNumberPrefix",
                  _.get(userDetails, "countryCode")
                )}
                defaultValue={globalUtils.getCountryProperty(
                  "phoneNumberPrefix",
                  _.get(userDetails, "countryCode")
                )}
                disabled
                className="prefix"
                style={{
                  width: "30%",
                  marginRight: "10px",
                  paddingLeft: "0px",
                }}
                isAutoComplete="off"
              />
              {isMobileNumEditable ? (
                <Input
                  style={{ marginBottom: 23 }}
                  name={_.get(profileForm, "mobileNumber.name")}
                  onChange={handleChange}
                  placeholder={_.get(profileForm, "mobileNumber.placeholder")}
                  value={
                    typeof _.get(profileForm, "mobileNumber.value") === "string"
                      ? _.get(profileForm, "mobileNumber.value")
                      : ""
                  }
                  onBlur={handleBlur}
                  error={!_.get(profileForm, "mobileNumber.isValid")}
                  errorText={
                    !_.get(profileForm, "mobileNumber.isValid") &&
                    _.get(profileForm, "mobileNumber.errorText")
                  }
                  isAutoComplete="off"
                />
              ) : (
                  <Input
                    style={{ marginBottom: 23 }}
                    name={_.get(profileForm, "mobileNumber.name")}
                    placeholder={_.get(profileForm, "mobileNumber.placeholder")}
                    value={_.get(profileForm, "mobileNumber.value")}
                    s
                    disabled
                    right={
                      <span
                        onClick={() => setEditableHandler("mobileNumber")}
                        className="input-edit-button"
                      >
                        Edit
                    </span>
                    }
                  />
                )}
            </div>
          </form>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            aria-label="log in"
            disabled={isDisabled()}
            key={`${isDisabled()}`}
            onClick={() => handleSubmit(true)}
            style={{
                marginBottom: 50,
                borderWidth: 2,
                padding: '0 6px 0 9px',
                fontFamily: 'Lato',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '18px',
                backgroundColor: "#224214",
                border: '2px solid #224214',
                borderRadius: '5px',
                alignItems: 'center',
                width: 150,
                marginTop: 20,
            }}
          >
            Submit
          </Button>

          <span className="divider" />

          <Button
            variant="outlined"
            color="primary"
            size="large"
            aria-label="log in"
            onClick={() => setAuxiliaryOption(3)}
            style={{
                marginTop: 65,
                borderWidth: 2,
                padding: '0 6px 0 9px',
                fontFamily: 'Lato',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '18px',
                backgroundColor: "white",
                color: '#224214',
                border: '2px solid #224214',
                borderRadius: '5px',
                alignItems: 'center',
                width: 160,
            }}
          >
            Change Password
          </Button>
          <span
            onClick={() => setDeleteModalVisible(true)}
            style={{ marginTop: 50 }}
            className="input-edit-button"
          >
            Delete Profile!
          </span>
          {isDeleteModalVisible && (
            <div className="deleteModal">
              <h1 className="deleteModalText">
                Are you sure want to delete the profile?
              </h1>
              <div className="space-evenly">
                <Button
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: "red",
                    width: '40%',
                    fontSize: 24,
                    color: "white",
                    fontFamily: "Lato",
                    padding: 0,
                  }}
                  onClick={() => {
                    setDeleteModalVisible(false);
                    handleDelete();
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: "white",
                    width: '40%',
                    padding: 0,
                    fontFamily: "Lato",
                    fontSize: 20,
                  }}
                  onClick={() => setDeleteModalVisible(false)}
                >
                  No
                </Button>
              </div>
            </div>
          )}
        </div>
        {emailOtpDisplayed && (
          <div className="edit-profile-otp-wrapper">
            <OtpWidget
              handleChange={handleChangeButtonClick}
              type="Email"
              email={_.get(profileForm, "emailOtp.value")}
              value={_.get(otpForm, "emailOtp.value")}
              onChange={(e) => handleOtpChange(e, "emailOtp")}
              onBlur={(e) => handleOtpBlur(e, "emailOtp")}
              onSubmit={verifyYourOtp}
              error={!_.get(otpForm, `emailOtp.isValid`)}
              errorText={
                !_.get(otpForm, `emailOtp.isValid`) &&
                _.get(otpForm, `emailOtp.errorText`)
              }
              resendOtp={() =>
                resendOtp({ email: _.get(profileForm, "emailAddress.value") })
              }
            />
          </div>
        )}
        {otpDisplayed && (
          <div className="edit-profile-otp-wrapper">
            <OtpWidget
              handleChange={handleChangeButtonClick}
              type="Mobile"
              phone={_.get(profileForm, "mobileNumber.value")}
              value={_.get(otpForm, "otp.value")}
              onChange={(e) => handleOtpChange(e, "otp")}
              onBlur={(e) => handleOtpBlur(e, "otp")}
              onSubmit={verifyYourOtp}
              error={!_.get(otpForm, `otp.isValid`)}
              errorText={
                !_.get(otpForm, `otp.isValid`) &&
                _.get(otpForm, `otp.errorText`)
              }
              resendOtp={() => {
                if (isMobileNumEditable)
                  resendOtp({
                    mobileNumber: _.get(profileForm, "mobileNumber.value"),
                  });
                if (isEmailEditable)
                  resendOtp({ email: _.get(profileForm, "otp.value") });
              }}
            />
          </div>
        )}
      </ViewProfileStyle>
    </>
  );
};

const ViewProfileStyle = viewProfileStyle;

export const EditProfile = connect(
  editProfileMapStateToProps,
  editProfileMapDispatchToProps
)(EditProfileComponent);
