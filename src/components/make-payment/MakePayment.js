import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import { globalUtils } from '../../utils';
import * as config from '../../configs/appsettings.json'

export const MakePayment = (props) => {
    const {
        price, userId, postPayment, productId, userName, onSuccess = () => { }, additionalProps
    } = props;

    const publishableKey = config.stripePublishableKey;

    const onToken = (token) => {
        postPayment({
            token,
            amount: price * 100,
            userId,
            productId,
            userName,
            typeOfSponsorship: 'Featured',
            selectedDuration: globalUtils.getCountryProperty("featuredDuration"),
            numOfExpDays: parseInt(globalUtils.getCountryProperty("featuredDuration").replace(/[^0-9]/g, ''), 10),
            isHours: false,
            ...additionalProps
        })
        onSuccess()
    };


    return (
        <>
            <StripeCheckout
                amount={price * 100}
                label="Pay Now"
                name={globalUtils.getCountryProperty('name')}
                image="/assets/images/logo.png"
                description={`Pay ${globalUtils.getCountryProperty('currency')}${price} to sponsor your listing`}
                panelLabel="Pay Now"
                token={onToken}
                stripeKey={publishableKey}
                currency={globalUtils.getCountryProperty('featuredCurrency')}
                billingAddress
                zipCode={false}
                allowRememberMe
            >
                Promote
            </StripeCheckout>

        </>
    )
}