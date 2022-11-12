/* eslint-disable */

import React, { memo } from "react";
import { connect } from 'react-redux';
import _get from 'lodash/get';
import styled from "styled-components";
import { useTheme, Typography, Badge } from "@material-ui/core";
import { Link } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import HomeIcon from "../assets/icons/home";
import ChatIcon from "../assets/icons/chat";
import StarIcon from "../assets/icons/star";
import NotificationIcon from "../assets/icons/notification";
import { globalUtils } from "../utils";

const BottomNavComponent = memo(({ notification }) => (
  <StyledNav theme={useTheme()}>
    <div className="navbar footer">
      <li style={{ marginLeft: '-10px' }}>
        <Link to="/">
          <div className="container">
            <HomeIcon />

            <span className="nav-text">
              <Typography className="typography">Home</Typography>
            </span>
          </div>
        </Link>
      </li>
      <li>
        <Link
          to={globalUtils.isTokenAvailable() ? "/profile?type=chat" : "/login"}
        >
          <div className={"container"}>
            <ChatIcon />

            <span className="nav-text">
              <Typography className="typography">Chat</Typography>
            </span>
          </div>
        </Link>
      </li>
      <li>
        <Link to={globalUtils.isTokenAvailable() ? "/listing" : "login"}>
          <div style={{ position: "relative", top: -14 }} className="container">
            <div className="back-circle">
              <AddCircleOutlineOutlinedIcon
                style={{ width: 35, height: 35 }}
                className="nav-icon"
              />
            </div>
            <span className="nav-text">
              <Typography className="typography">Post Ad</Typography>
            </span>
          </div>
        </Link>
      </li>
      <li>
        <Link
          to={
            globalUtils.isTokenAvailable()
              ? "/profile?type=saveditems"
              : "login"
          }
        >
          <div className="container">
            <StarIcon />

            <span className="nav-text">
              <Typography className="typography">Saved</Typography>
            </span>
          </div>
        </Link>
      </li>

      <li style={{ marginRight: '-10px' }}>
        <Link to={globalUtils.isTokenAvailable() ? "/notifications" : "login"}>
          <div className="container">
            <NotificationIcon className="nav-icon" />
            {_get(notification, "length", 0) > 0 && (
              <Badge
                badgeContent={_get(notification, "length", 0)}
                className="notification-badge"
              />
            )}
            <span className="nav-text">
              <Typography className="typography">
                Alerts
              </Typography>
            </span>
          </div>
        </Link>
      </li>
    </div>
  </StyledNav>
));

const bottomNavMapStateToProps = (state) => ({
  notification: _get(state, 'notification.userNotifications', [])
});

const bottomNavMapDispatchToProps = () => ({});

export const BottomNav = connect(bottomNavMapStateToProps, bottomNavMapDispatchToProps)(BottomNavComponent);

const StyledNav = styled.nav`
  .navbar {
    //overflow: hidden;
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-top: 2px solid #8c450b;
    z-index: 1 !important;
    max-height: 50px;
    align-items: center;
    background-color: #8c450b;
  }

  .navbar li {
    display: block;
  }

  .navbar li:hover {
    .nav-icon {
      color: #8c450b;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nav-text {
    font-size: 14px;
    color: white;
  }

  .nav-icon {
    display: flex;
    flex-direction: column;
    width: 20px;
    height: 20px;
    color: white !important;
  }

  .typography {
    font-size: 14px !important;
  }

  .back-circle {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #8c450b;
    border-radius: 50%;
  }

  .MuiBadge-badge{
    margin-top: -15px;
    margin-right: -12px;
    background-color: yellow;
    color: black;
  }
  @media (min-width: 380px) {
    .typography {
      font-size: 14px !important;
      width: 76px;
      text-align: center;
    }
  }
`;
