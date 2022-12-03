/* eslint-disable */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _get from 'lodash/get';
import _includes from "lodash/includes";
import { osVersion, osName, deviceDetect } from 'react-device-detect';
import { Device } from '@capacitor/core';
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "./assets/styles";
import { RouterMapper } from "./router";
import { createMuiTheme, Hidden, ThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { BottomNav, ScrollToTopComponent, LoaderComponent, ErrorComponent, Footer } from "./components";
import { appMapDispatchToProps, appMapStateToProps } from "./App.model";
import { globalUtils } from "./utils";
import * as configs from "./configs/appsettings.json";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8c450b",
    },
    secondary: {
      main: "#f5f7f7f7",
    },
    action: {
      main: "#B22222",
    },
  },
  typography: {
    fontFamily: [
      "DejaVuSansMono-Oblique",
      "Dejavu-Sans",
      "Inter",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

if (configs.environment === "production") {
  console.log = () => { };
}

const AppComponent = (props) => {
  const {
    isAuthorized,
    fetchUserDetails,
    loginSuccess,
    clearNotification,
    getSellCategories,
    getWantedCategories,
    getNotifications,
    loader, sellData, rentData, wantedData
  } = props;

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (window.scrollY !== 0) {
      document.body.scrollTop === 0;
    }
    getSellCategories();
    getWantedCategories();
    if (globalUtils.isTokenAvailable()) {
      getNotifications();
    }
    if (
      !isAuthorized &&
      !_includes("login", "signup", window.location.pathname) &&
      localStorage.getItem("token") != null &&
      localStorage.getItem("token") !== undefined
    ) {
      return fetchUserDetails();
    }
    if (globalUtils.isTokenAvailable()) {
      loginSuccess({
        accessToken: globalUtils.getToken(),
      });
      fetchUserDetails();
    }
  }, []);

  useEffect(() => {
    if (sellData?.id)
      if (!isLoaded) {
        setIsLoaded(true);
      }
  }, [sellData, rentData, wantedData])
  // <h1>{getComputedStyle(document.documentElement).getPropertyValue("--sat")}</h1>
  return (
    <ThemeProvider theme={theme}>
      <div className="fixed-header-section" />
      {
        isLoaded && (
          <BrowserRouter>
            <div className="allButFooter">
              <ScrollToTopComponent
                clearNotification={clearNotification}
                getNotifications={getNotifications}
              />
              <RouterMapper {...props} />
              <LoaderComponent loader={loader} />
              <ErrorComponent />
            </div>
            <Footer />
          </BrowserRouter>
        )
      }
      < div className="fixed-footer-section" />
    </ThemeProvider >
  );
};

export const App = connect(
  appMapStateToProps,
  appMapDispatchToProps
)(AppComponent);
