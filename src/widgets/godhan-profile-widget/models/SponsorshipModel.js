import * as services from '../../../services'
import _get from 'lodash/get'

const { refDatActions, itemActions} = services;

export const sponsorshipMapStateToProps = (state) => ({
    sponsorshipForm: _get(state, 'form.sponsorshipForm', {}),
    sponsorshipOptions: _get(state, 'refData.sponsorshipOptions', {}),
    userId: _get(state, 'user.userData.id'),
    productId: _get(state, 'item.createdProductId'),
});


export const sponsorshipMapDispatchToProps = (dispatch) => ({
    getSponsorshipOptions: (payload) =>
        dispatch(refDatActions.fetchSponsorshipOptions(payload)),
    postPayment: (payload) =>
        dispatch(itemActions.makePayment(payload))
})