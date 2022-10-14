import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { globalUtils } from "../../../utils";
import { connect } from 'react-redux'
import { stripButtonMapStateToProps, stripButtonMapDispatchToProps } from "../models";
import { Button } from "@material-ui/core";
import * as config from '../../../configs/appsettings.json'

const StripeButtonComponent = (props) => {
  const { handleSubmit } = props;
  const publishableKey = config.stripePublishableKey;
  const stripePrice = parseInt(globalUtils.getCountryProperty("featuredPrice"), 10);

  const onToken = (token) => {
    handleSubmit(token)
  };

  return (
    <StripeCheckout
      amount={stripePrice * 100}
      label="Pay Now"
      name={globalUtils.getCountryProperty('name')}
      image="/assets/images/logo.png"
      description={`Pay ${globalUtils.getCountryProperty('currency')}${stripePrice} to sponsor your listing`}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
      currency={globalUtils.getCountryProperty('featuredCurrency')}
      billingAddress
      zipCode={false}
      allowRememberMe
    >
      <Button
        type='submit'
        variant='outlined'
        color='primary'
        size='large'
        fullWidth
      >Pay now</Button>
    </StripeCheckout>
  );
};

export const StripeButton = connect(stripButtonMapStateToProps, stripButtonMapDispatchToProps)(StripeButtonComponent)