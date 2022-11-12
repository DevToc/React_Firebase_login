import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { useTheme, Avatar, IconButton, Grid } from "@material-ui/core";
import * as _ from "lodash";
import {
  viewProfileMapDispatchToProps,
  viewProfileMapStateToProps,
} from "../models";
import { displayProfileDetails } from "../utils";
import {
  EditProfile,
  ProfileVerification,
  ProfileOptionsCart,
} from "../components";
import { viewProfileStyle } from "../style";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import handWithPen from "../../../assets/icons/profile/handWithPen.png";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import FormLabelInfo from "../../../components/FormLabelInfo";

const ViewProfileComponent = ({
  setSelectedOption,
  userDetails,
  setAuxiliaryOption,
  handleSignOut,
  uploadProfilePicture,
  selectedOption,
  setErrorPopup
}) => {
  const [isEditable, setEditable] = useState(false);
  const [isVerification, setVerificationStatus] = useState(false);
  const [currentId] = useState({});

  const history = useHistory();

  const imageInputRef = useRef(null);

  const handleSignOutButtonClick = () => {
    handleSignOut();
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("profile", e.target.files[0]);
      uploadProfilePicture(formData);
    }
  };

  const handleChange = () => {
    setErrorPopup({
      message:
        "Select a different country and sign up with a new account to change the country.",
      isSuccessful: true,
      handleClose: () => {
        handleSignOutButtonClick();
        setTimeout(() => {
          history.push("/launch");
        }, 10)
      }
    });
  }

  const renderSelection = () => {
    if (isEditable) {
      return (
        <EditProfile
          currentId={currentId}
          setEditable={setEditable}
          setSelectedOption={setSelectedOption}
        />
      );
    }
    if (isVerification) {
      return (
        <ProfileVerification setVerificationStatus={setVerificationStatus} />
      );
    }
    return (
      <div className="profile">
        <div className="navigation">
          <div
            onClick={() => history.push("/")}
            style={{ display: "flex", alignItems: "center" }}
          >
            <ArrowBackIosIcon className="backIcon" />
            <span className="backText">Back</span>
          </div>g
          <Link onClick={handleSignOutButtonClick} className="logout">
            Logout
          </Link>
        </div>
        <header className="profileHeader">
          <div
            className="avatarContainer"
            style={{ marginTop: 20, marginBottom: 12 }}
          >
            <input
              // accept="image/*"
              onChange={handleImageUpload}
              type="file"
              hidden
              // capture
              ref={imageInputRef}
            />
            <div style={{ position: "relative" }}>
              <Avatar src={userDetails.profileImg} className="avatar" />
              <IconButton
                onClick={() => imageInputRef.current.click()}
                size="small"
                style={{ position: "absolute", top: -7, right: -7 }}
              >
                <EditIcon style={{ color: "white" }} />
              </IconButton>
            </div>
            <div className="userName">{userDetails.name}</div>
          </div>
          <ProfileOptionsCart
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            setAuxiliaryOption={setAuxiliaryOption}
            setEditable={setEditable}
          />
        </header>

        <div className="personalInfo">
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <h2 className="infoHeading">Personal Info</h2>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div className="infoContainer">
              <Grid container className="parent-container" spacing={0}>
                {displayProfileDetails.map((el, index) => (
                  <>
                    < Grid
                      item
                      xs={6}
                      md={6}
                      lg={6}
                      className="display-features"
                      key={index} id={index}
                    >
                      <span style={{ fontSize: '16px' }}>{_.get(el, "label")}</span>
                    </Grid>
                    < Grid
                      item
                      xs={6}
                      md={6}
                      lg={6}
                      className="display-features"
                      key={index} id={index}
                    >
                      <FormLabelInfo className="form-label">
                        {_.get(userDetails, el.property) &&
                          _.get(userDetails, el.property) !== 0
                          ? _.get(userDetails, el.property)
                          : "Not Available"}
                        &nbsp;
                        {_.get(el, "isChangeLinkRequired") &&
                          <span className="footerLink" onClick={handleChange}>
                            Change
                        </span>
                        }
                      </FormLabelInfo>
                    </Grid>
                  </>
                ))}
              </Grid>
            </div>
          </div>
        </div>

        <footer className="profileFooter">
          <Link to="contact-us">
            <button className="contactButton">
              Contact Us <img src={handWithPen} alt="edit-icon" />
            </button>
          </Link>
          <p className="feedbackText">
            For any complaint, feedback, assistance
          </p>
          <div
            className="footer-link-wrapper"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: 360,
              padding: "0 5px",
            }}
          >
            <Link to="/privacyPolicy" className="footerLink">
              Privacy Policy
            </Link>
            <Link to="terms-of-use" className="footerLink">
              Terms of Use
            </Link>
            <Link to="aboutUs" className="footerLink">
              About Us
            </Link>
          </div>
          <a
            href="https://www.godhan.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              style={{ fontWeight: "bold", marginTop: 5 }}
              className="footerLink"
            >
              www.godhan.com
            </div>
          </a>
        </footer>
      </div >
    );
  };
  return (
    <StyledViewProfile theme={useTheme()}>
      {renderSelection()}
    </StyledViewProfile>
  );
};

const StyledViewProfile = viewProfileStyle;
export const ViewProfile = connect(
  viewProfileMapStateToProps,
  viewProfileMapDispatchToProps
)(ViewProfileComponent);
