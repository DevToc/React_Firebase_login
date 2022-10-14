import _get from 'lodash/get';
import * as services from '../../../services'

const { itemActions } = services

export const stripButtonMapStateToProps = (state) => ({
    price: _get(state, 'form.sponsorshipForm.selectedAmount.value'),
    userId: _get(state, 'user.userData.id'),
    productId: _get(state, 'item.createdProductId'), 
    sponsorshipForm: _get(state, 'form.sponsorshipForm'),
    userName: _get(state, 'user.userData.name')
});

export const stripButtonMapDispatchToProps = (dispatch) => ({
    postPayment: (payload) =>
        dispatch(itemActions.makePayment(payload))
})