/* eslint-disable */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTheme } from "@material-ui/core";
import {
  mainProfileMapDispatchToProps,
  mainProfileMapStateToProps,
} from "./models";
import { ManageOptions, ProfileOptionsCart } from "./components";
import { profileOptionsCartProps, formConstants } from "./utils";
import { LoaderComponent } from "../../components";
import _get from "lodash/get";
import { globalUtils } from "../../utils";
import { updateFormStore } from "../../utils";
import _isEmpty from "lodash/isEmpty";
import { withRouter } from "react-router-dom";
import { mainProfileStyle } from "./style/MainProfileStyle";

const ProfileWidget = (props) => {
  const {
    fetchUserDetails,
    setFormData,
    loader,
    fetchCurrentConversations,
    clearMessageList,
    clearListedProducts,
    otpStatus,
    socket,
    userDetails,
    fetchSellerProfie,
    fetchFavouriteIds,
    deletedUser,
    history,
    otpForm,
    clearOtpStatus, clearProductList,
    profileForm,
    product
  } = props;

  const type = globalUtils.getValueFromUrlQuery("type");
  const isChatPage = type === "chat";
  var options =
    type != null &&
    profileOptionsCartProps.find((val) => val.pageIdentifier === type);
  if (isChatPage) {
    options = profileOptionsCartProps.find((val) => val.id === 1);
  }

  const publicUserId = globalUtils.getValueFromUrlQuery("id");

  const [selectedOption, setSelectedOption] = useState(
    !_isEmpty(options) ? options.id : 3
  );
  const [auxiliaryOption, setAuxiliaryOption] = useState(
    globalUtils.getValueFromUrlQuery("type") === "ticket" ? 1 : 0
  );

  useEffect(() => {
    if (publicUserId) setSelectedOption(3);
    else if (isChatPage) setSelectedOption(4);
  }, [isChatPage, publicUserId]);

  useEffect(() => {
    if (globalUtils.getValueFromUrlQuery("id") && globalUtils.getValueFromUrlQuery("view") === 'list') {
      fetchSellerProfie({
        offset: 0,
        id: _get(product, 'userID')
      });
      setAuxiliaryOption(6);
      return;
    }
    if (!globalUtils.isTokenAvailable()) {
      history.push("/login");
    } else {
      if (_isEmpty(userDetails)) {
        fetchUserDetails();
      }
      if (_isEmpty(profileForm)) {
        setFormData(formConstants);
      }
      if (isChatPage && _get(userDetails, "id")) {
        fetchCurrentConversations({
          currentUser: _get(userDetails, "id"),
        });
      }
      switch (globalUtils.getValueFromUrlQuery("type")) {
        case "previouslyListedItems":
          fetchSellerProfie({ offset: 0 });
          break;
        case "saveditems":
          fetchFavouriteIds();
          break;
        default:
          break;
      }
    }
    clearProductList()
    return () => {
      clearListedProducts();
    };
  }, []);

  useEffect(() => {
    return () => {
      setFormData(formConstants);
      clearMessageList();
      if (!_isEmpty(socket)) {
        socket.removeAllListeners();
        socketUtils.disconnectChat(socket);
      }
    };
  }, []);

  useEffect(() => {
    if (otpStatus === "signup") {
      if (_.get(otpForm, "verificationStatus.value", false)) {
        updateFormStore({
          form: "otpForm",
          field: "verificationStatus",
          value: false,
        });
        clearOtpStatus();
        fetchUserDetails();
      }
    }
  }, [otpStatus, deletedUser]);

  return (
    <div>
      <StyledAuth theme={useTheme()}>
        <ManageOptions
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          auxiliaryOption={auxiliaryOption}
          setAuxiliaryOption={setAuxiliaryOption}
          publicUserId={publicUserId}
        />
      </StyledAuth>
      <LoaderComponent loader={loader} />
    </div>
  );
};

const StyledAuth = mainProfileStyle;

export const MainProfileWidget = withRouter(
  connect(
    mainProfileMapStateToProps,
    mainProfileMapDispatchToProps
  )(ProfileWidget)
);
