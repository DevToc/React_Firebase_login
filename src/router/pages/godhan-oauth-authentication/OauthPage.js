/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { globalConstants, globalUtils } from '../../../utils'
import { Redirect, withRouter } from 'react-router-dom'
import * as services from '../../../services';

const { oauthConstants } = globalConstants;
const { authorizationAction } = services;

class OAuth2RedirectHandlerComponent extends Component {
    constructor(props) {
        super(props);
        const { updateLoginStatus } = props;
        const token = this.getUrlParameter('token');
        if (token) {
            globalUtils.setLocalStorageValue(oauthConstants.ACCESS_TOKEN, token);
            updateLoginStatus({
                accessToken: this.getUrlParameter('token')
            });
        }
    }

    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');
        if (token) {
            return <Redirect to={{
                pathname: "/",
            }} />;
        } else {
            return <Redirect to={{
                pathname: '/login',
                state: {
                    from: window.location.search,
                }
            }} />;
        }
    }
}
const oauthMapStateToProps = (state) => ({

});

const oauthMapDispatchToProps = (dispatch) => ({
    updateLoginStatus: (payload) =>
        dispatch(authorizationAction.loginSuccess(payload))
});

export const OAuth2RedirectHandler = withRouter(connect(oauthMapStateToProps, oauthMapDispatchToProps)(OAuth2RedirectHandlerComponent));