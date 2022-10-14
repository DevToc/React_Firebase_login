import React from "react";

import { Container } from "@material-ui/core";
import aboutustext from "./aboutustext";
import aboutUsContact from "./aboutUsContact";
import { BlankLayout, RichTextViewer } from "../../../components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";

export const AboutUsPage = (props, isAuthorized) => {
  return (
    <>
      <StyledAboutUs>
        <BlankLayout>
          <Container component="main" maxWidth="xl" className="view-height">
            <div>
              <ArrowBackIcon
                color="primary"
                onClick={() => {
                  props.history.goBack();
                }}
                className="back-arrow"
              />
            </div>
            <RichTextViewer value={aboutustext} />
            <div className="footer-banner">
              <div className="app-link">
                <ul className="store">
                  <li className="store-items">
                    <a
                      href="https://play.google.com/store"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="playstore-icon"
                    >
                      <img
                        src="/assets/badges/playstore.png"
                        alt="godhan playstore"
                      ></img>
                    </a>

                    <a
                      href="https://apps.apple.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="apple-icon"
                    >
                      <img
                        src="/assets/badges/applestore.png"
                        alt="godhan playstore"
                      ></img>
                    </a>
                  </li>
                </ul>
              </div>
              <img src="/assets/images/footer.png" alt="footer-banner"></img>
            </div>
            <RichTextViewer value={aboutUsContact} />
            <p>
              You can also submit your suggestion, complain on our web portal.
              <Link to={isAuthorized ? "/profile?type=ticket" : "login"}>
                Click here
              </Link>
            </p>
          </Container>
        </BlankLayout>
      </StyledAboutUs>
    </>
  );
};

const StyledAboutUs = styled.div`
  .back-arrow {
    cursor: pointer;
  }

  .footer-banner {
    position: relative;
    width: 100%;
    height: auto;
    margin: auto;
    margin-top: 3px;
    margin-left: 5px;
  }

  .app-link {
    position: absolute;
    margin-left: 46%;
    top: 42%;
  }

  ul {
    list-style: none;
  }

  .store .store-items img {
    list-style: none;
    justify-content: space-between;
    display: inline-block;
    height: 100px;
    width: 110px;
    margin: 0 18px;
    object-fit: cover;
  }
  @media only screen and (max-width: 600px) {
    .app-link {
      position: absolute;
      margin-left: 38%;
      top: 33%;
    }
    .store .store-items img {
      justify-content: space-between;
      display: inline-block;
      height: 50px;
      width: 55px;
      margin: 0 9px;
      object-fit: cover;
    }
  }
  @media only screen and (max-width: 760px) {
    .store-items {
      display: flex;
      position: relative;
    }
    .store-items img {
      height: 60px !important;
      width: 65px !important;
    }
    .playstore-icon {
      position: absolute;
      margin-left: -80% !important;
    }
  }
`;

export const AboutUs = withRouter(AboutUsPage);
