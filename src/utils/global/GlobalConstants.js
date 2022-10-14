import configs from "../../configs/appsettings.json";
import React from "react";
import { Link } from "react-router-dom";

const OAUTH2_REDIRECT_URI = `http://${window.location.host}/oauth2/redirect`;
const API_BASE_URL = configs.baseUrl;
export const globalConstants = {
  availableCountries: [
    {
      id: "AU",
      name: "Australia",
      flag: "../assets/images/australia-flag.png",
    },
    {
      id: "CA",
      name: "Canada",
      flag: "../assets/images/canada-flag.png",
    },
    {
      id: "IN",
      name: "India",
      flag: "../assets/images/india-flag.png",
    },
  ],
  notificationExclusion: [
    "login",
    "oauth2/redirect",
    "password",
    "signup",
    "forgot-password",
    "otp-confirmation",
    "change-password",
    "register-user",
    "profile"
  ],
  paginationLimit: 10,
  CHAT: "C",
  MICROSERVICES: "M",
  oauthConstants: {
    ACCESS_TOKEN: "token",
    GOOGLE_AUTH_URL:
      API_BASE_URL +
      "oauth2/authorize/google?redirect_uri=" +
      OAUTH2_REDIRECT_URI,
    FACEBOOK_AUTH_URL:
      API_BASE_URL +
      "oauth2/authorize/facebook?redirect_uri=" +
      OAUTH2_REDIRECT_URI,
  },
  iPadAndBelow: 800,
  getCountry: {
    "AU": "co.au",
    "IN": "co.in",
    "CA": "co.ca",
    "": "com"
  },
  godhanAddress: {
    "co.in": {
      name: "Godhan India",
      address: "90210 Dummy text",
      email: "support@godhan.com",
      currency: "₹",
      uiUrl: "https://godhan-ui.web.app",
      countryCode: "IN",
      distanceProperty: "km",
      featuredPrice: 10,
      featuredDuration: "30days",
      featuredCurrency: "INR",
      phoneNumberPrefix: "+91",
      latitude: 28.644800,
      longitude: 77.216721
    },
    "com": {
      name: "Godhan Canada",
      address: "90210 Dummy text",
      email: "support@godhan.com",
      currency: "$",
      uiUrl: "https://godhan.com",
      countryCode: "CA",
      distanceProperty: "km",
      featuredPrice: 100,
      featuredDuration: "30days",
      featuredCurrency: "CAD",
      phoneNumberPrefix: "+1",
      longitude: -97.137123,
      latitude: 49.88446
    },
    "co.ca": {
      name: "Godhan Canada",
      address: "90210 Dummy text",
      email: "support@godhan.com",
      currency: "$",
      uiUrl: "https://godhan.com",
      countryCode: "CA",
      distanceProperty: "miles",
      featuredPrice: 20,
      featuredDuration: "30days",
      featuredCurrency: "CAD",
      phoneNumberPrefix: "+1",
      longitude: -97.137123,
      latitude: 49.88446
    },
    "co.au": {
      name: "Godhan Australia",
      address: "90210 Dummy text",
      email: "support@godhan.com",
      currency: "$",
      uiUrl: "https://godhan-ui.web.app",
      countryCode: "AU",
      distanceProperty: "miles",
      featuredPrice: 50,
      featuredDuration: "30days",
      featuredCurrency: "AUD",
      phoneNumberPrefix: "+61",
      latitude: -35.473469,
      longitude: 149.012375
    },
  },
  notificationMessageSeverity: {
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
    SUCCESS: "success",
  },
  messageSent: (
    <div>
      Your message has been sent. You can find your messages{" "}
      <Link to="/profile?type=chat">here</Link>.
    </div>
  ),
  rootElements: {
    sell: 1,
    rent: 2,
    wanted: 3,
  },
  locationOptions: [
    { title: "5kms", value: 5 },
    { title: "10kms", value: 10 },
    { title: "15kms", value: 15 },
    { title: "20kms", value: 20 },
    { title: "25kms", value: 25 },
    { title: "30kms", value: 30 },
    { title: "40kms", value: 40 },
    { title: "45kms", value: 45 },
    { title: "50kms", value: 50 },
    { title: "55kms", value: 55 },
    { title: "60kms", value: 60 },
    { title: "65kms", value: 65 },
    { title: "70kms", value: 70 },
    { title: "75kms", value: 75 },
    { title: "80kms", value: 80 },
    { title: "85kms", value: 85 },
    { title: "90kms", value: 90 },
    { title: "100kms", value: 100 },
    { title: "100+", value: 1000 },
  ],
};
