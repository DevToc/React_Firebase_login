import {
  LaunchWidget,
  LoginWidget,
  PasswordWidget,
  SignupWidget,
  OtpWidget,
  ChangePasswordWidget,
  RegisterUserWidget,
  HomeWidget,
  MainSearchWidget,
  MainProductWidget,
  MainProfileWidget,
  MainNotificationWidget,
  MainPostListingWidget,
  MainLocationPage,
    MainContactWidget
} from "../../widgets";
import { OAuth2RedirectHandler } from "../pages/godhan-oauth-authentication/OauthPage"
import { AboutUs } from "../pages/godhan-about-us/AboutUs";
import { PrivacyPolicyPage } from "../pages/godhan-privacy-policy/PrivacyPolicyPage";
import { TermsAndConditions } from "../pages/godhan-terms-and-conditions/TermsAndConditions";

export const MobileRouterConfig = [
  {
    id: 1,
    path: "/",
    component: HomeWidget
  },
  {
    id: 2,
    path: "login",
    component: LoginWidget,
  },
  {
    id: 3,
    path: "oauth2/redirect",
    component: OAuth2RedirectHandler,
  },
  {
    id: 4,
    path: "password",
    component: PasswordWidget,
  },
  {
    id: 5,
    path: "signup",
    component: SignupWidget,
  },
  {
    id: 6,
    path: "otp-confirmation",
    component: OtpWidget,
  },
  {
    id: 7,
    path: "forgot-password",
    component: OtpWidget,
  },
  {
    id: 8,
    path: "change-password",
    component: ChangePasswordWidget,
  },
  {
    id: 9,
    path: "register-user",
    component: RegisterUserWidget,
  },
  {
    id: 10,
    path: "search",
    component: MainSearchWidget,
  },
  {
    id: 11,
    path: "product/:productId",
    component: MainProductWidget,
  },
  {
    id: 12,
    path: "profile",
    component: MainProfileWidget,
  },
  {
    id: 13,
    path: "notifications",
    component: MainNotificationWidget,
  },
  {
    id: 14,
    path: "listing",
    component: MainPostListingWidget,
  },
  {
    id: 15,
    path: "location",
    component: MainLocationPage,
  },
  {
    id: 16,
    path: "editListing",
    component: MainPostListingWidget,
  },
  {
    id: 17,
    path: "aboutUs",
    component: AboutUs,
  },
  {
    id: 18,
    path: "privacyPolicy",
    component: PrivacyPolicyPage,
  },
  {
    id: 19,
    path: "terms-of-use",
    component: TermsAndConditions,
  },
  {
    id: 20,
    path: "contact-us",
    component: MainContactWidget
  },
  {
    id: 21,
    path: "launch",
    component: LaunchWidget
  }
];
