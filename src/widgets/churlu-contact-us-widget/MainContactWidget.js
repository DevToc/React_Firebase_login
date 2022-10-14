/* eslint-disable */

import React, { useEffect } from "react";
import { connect } from "react-redux";
import _isEmpty from 'lodash/isEmpty';
import { useTheme } from "@material-ui/core";
import { RaiseTicket } from './components';
import {
  mainContactMapDispatchToProps,
  mainContactMapStateToProps,
} from "./models";
import { withRouter } from "react-router-dom";
import { mainContactStyle } from "./style/MainContactStyle";
import { formConstants } from "../godhan-profile-widget/utils";

const ProfileWidget = (props) => {
  const { ticketForm, setFormData, history, ticket, clearTicketInfo } = props;
  useEffect(() => {
    if (_isEmpty(ticketForm)) {
      setFormData(formConstants);
    }
    return(()=> {
      clearTicketInfo();
    })
  }, [])

  useEffect(() => {
    if (!_isEmpty(ticket)) {
      history.push("/profile");
    }
  }, [ticket])
  return (
    <StyledAuth>
      <RaiseTicket history={history} />
    </StyledAuth>
  )
};

const StyledAuth = mainContactStyle;

export const MainContactWidget = withRouter(
  connect(
    mainContactMapStateToProps,
    mainContactMapDispatchToProps
  )(ProfileWidget)
);
