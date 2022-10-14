import _get from 'lodash/get';
import { userActions, refDatActions } from '../../../services';

export const itemActionMapStateToProps = (state) => ({
    sellerProfileForm: _get(state, 'form.sellerProfileForm', {})
});

export const itemActionsMapDispatchToProps = (dispatch) => ({
    updateItemStatus: (payload) =>
        dispatch(userActions.updateItemStatus(payload)),
    getSponsorshipOptions: (payload) =>
        dispatch(refDatActions.fetchSponsorshipOptions(payload))


})