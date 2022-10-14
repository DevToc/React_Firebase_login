import React, { useState } from "react";
import { connect } from "react-redux";
import * as _ from "lodash";
import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {
  editProfileMapDispatchToProps,
  editProfileMapStateToProps,
} from "../models";
import {
  Button,
  useTheme,
} from "@material-ui/core";
import {
  updateFormStore,
  validateField,
  updateFormProperty,
} from "../../../utils";
import { viewProfileStyle } from "../style";
import BackHeader from "../../../components/back-header/BackHeader";

const ChangePasswordComponent = ({
  postProfileUpdate,
  profileForm,
  setAuxiliaryOption,
}) => {

  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    postProfileUpdate({
      oldPassword: _.get(profileForm, "oldPassword.value"),
      newPassword: _.get(profileForm, "newPassword.value"),
    });
    setAuxiliaryOption(0);
  };

  const isSubmitButtonDisabled = () =>
    !_.get(profileForm, "oldPassword.value") ||
    !_.get(profileForm, "oldPassword.isValid") ||
    !_.get(profileForm, "newPassword.value") ||
    !_.get(profileForm, "newPassword.isValid") ||
    !_.get(profileForm, "confirmPassword.value") ||
    !_.get(profileForm, "confirmPassword.isValid");

  const handleChange = (e) => {
    const { value, name } = e.target;
    updateFormStore({ form: "profileForm", field: name, value });
    handleBlur(e);
  };

  const handleBlur = (e) => {
    const { value, name } = e.target;
    if (_.get(profileForm, "newPassword.value") && _.get(profileForm, "oldPassword.value")) {
      if (_.get(profileForm, "newPassword.value") === _.get(profileForm, "oldPassword.value")) {
        updateFormProperty({
          form: "profileForm",
          field: 'newPassword',
          property: "isValid",
          value: false,
        });
        return updateFormProperty({
          form: "profileForm",
          field: 'newPassword',
          property: "errorText",
          value: 'Old and New passwords cannot be the same.',
        });
      } else {
        validateField({ form: "profileForm", field: name, data: value });
      }
    }
    if (_.get(profileForm, "confirmPassword.value") && _.get(profileForm, "newPassword.value") &&
      _.get(profileForm, "confirmPassword.value") !== _.get(profileForm, "newPassword.value")) {
      updateFormProperty({
        form: "profileForm",
        field: 'confirmPassword',
        property: "isValid",
        value: false,
      });
      return // validateField({ form: "profileForm", field: name, data: value });
    }
    validateField({ form: "profileForm", field: name, data: value });
  };

  return (
    <ViewProfileStyle
      style={{
        // display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
      theme={useTheme()}
    >
      <BackHeader onGoBack={() => setAuxiliaryOption(0)} title="Edit Profile" />
      <div className="edit-profile">
        <h2 style={{ alignSelf: "flex-start" }} className="heading-lael">
          Change Password
        </h2>
        <TextField
          name={_.get(profileForm, "oldPassword.name")}
          placeholder={_.get(profileForm, "oldPassword.placeholder")}
          value={_.get(profileForm, "oldPassword.value")}
          error={!_.get(profileForm, "oldPassword.isValid")}
          helperText={
            !_.get(profileForm, "oldPassword.isValid") &&
            _.get(profileForm, "oldPassword.errorText")
          }
          variant="outlined"
          color="primary"
          fullWidth
          onChange={handleChange}
          onBlur={handleBlur}
          type={showOldPassword ? 'text' : 'password'}
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
                  onClick={() => setOldShowPassword(!showOldPassword)}
                  edge="end"
                >
                  {showOldPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br />
        <TextField
          name={_.get(profileForm, "newPassword.name")}
          placeholder={_.get(profileForm, "newPassword.placeholder")}
          value={_.get(profileForm, "newPassword.value")}
          error={!_.get(profileForm, "newPassword.isValid")}
          helperText={
            !_.get(profileForm, "newPassword.isValid") &&
            _.get(profileForm, "newPassword.errorText")
          }
          onChange={handleChange}
          onBlur={handleBlur}
          type={showNewPassword ? 'text' : 'password'}
          variant="outlined"
          color="primary"
          fullWidth
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
                  onClick={() => setNewShowPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br />
        <TextField
          name={_.get(profileForm, "confirmPassword.name")}
          placeholder={_.get(profileForm, "confirmPassword.placeholder")}
          value={_.get(profileForm, "confirmPassword.value")}
          error={!_.get(profileForm, "confirmPassword.isValid")}
          helperText={
            !_.get(profileForm, "confirmPassword.isValid") &&
            _.get(profileForm, "confirmPassword.errorText")
          }
          onChange={handleChange}
          onBlur={handleBlur}
          type={showConfirmPassword ? 'text' : 'password'}
          variant="outlined"
          color="primary"
          fullWidth
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          aria-label="log in"
          fullWidth
          disabled={isSubmitButtonDisabled()}
          key={`${isSubmitButtonDisabled()}`}
          onClick={handleSubmit}
          style={{
            borderWidth: 2,
            padding: '0 6px 0 9px',
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '18px',
            border: '2px solid #2b579a',
            borderRadius: '5px',
            alignItems: 'center',
            width: 150,
            marginTop: 40,
          }}
        >
          Submit
        </Button>
      </div>
      {/* <Container>
        <div className="edit-profile-component">
          <div className="profile-header-component">
            <ArrowBackIcon
              color="primary"
              className="pointer-cursor margin-top-arrow-profile"
              onClick={() => setAuxiliaryOption(0)}
            />
            <Typography component="h1" variant="h5">
              <Box fontWeight="bold" component="span">
                Change Password
              </Box>
            </Typography>
          </div>
          <Typography component="h6" variant="subtitle2">
            <Box fontWeight="normal" marginBottom="20px">
              Please enter your new password
            </Box>
          </Typography>
          <TextField
            name={_.get(profileForm, "oldPassword.name")}
            label={_.get(profileForm, "oldPassword.placeholder")}
            variant="outlined"
            color="primary"
            type={showPassword ? "text" : "password"}
            fullWidth
            autoFocus
            margin="normal"
            value={_.get(profileForm, "oldPassword.value")}
            error={!_.get(profileForm, "oldPassword.isValid")}
            helperText={
              !_.get(profileForm, "oldPassword.isValid") &&
              _.get(profileForm, "oldPassword.errorText")
            }
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
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
            name={_.get(profileForm, "newPassword.name")}
            label={_.get(profileForm, "newPassword.placeholder")}
            variant="outlined"
            color="primary"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={_.get(profileForm, "newPassword.value")}
            error={!_.get(profileForm, "newPassword.isValid")}
            helperText={
              !_.get(profileForm, "newPassword.isValid") &&
              _.get(profileForm, "newPassword.errorText")
            }
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
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
          <TextField
            name={_.get(profileForm, "confirmPassword.name")}
            label={_.get(profileForm, "confirmPassword.placeholder")}
            variant="outlined"
            color="primary"
            type={thirdPasswordField ? "text" : "password"}
            fullWidth
            margin="normal"
            value={_.get(profileForm, "confirmPassword.value")}
            error={!_.get(profileForm, "confirmPassword.isValid")}
            helperText={
              !_.get(profileForm, "confirmPassword.isValid") &&
              _.get(profileForm, "confirmPassword.errorText")
            }
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowThirdPasswordField}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            aria-label="forgot-password"
            disableElevation
            onClick={handleSubmit}
            disabled={isSubmitButtonDisabled()}
          >
            Submit
          </Button>
        </div>
      </Container> */}
    </ViewProfileStyle>
  );
};

const ViewProfileStyle = viewProfileStyle;

export const ChangePassword = connect(
  editProfileMapStateToProps,
  editProfileMapDispatchToProps
)(ChangePasswordComponent);
