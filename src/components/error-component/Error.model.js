import _get from 'lodash/get';
import * as services from '../../services';

const { userActions } = services;

export const errorMapStateToProps = (state) => ({
    isErrorExists: _get(state, 'user.isErrorExists', false),
    errorMessage: _get(state, 'user.errorMessage.message', ''),
    isSuccessful: _get(state, 'user.errorMessage.isSuccessful', false),
    onCancel: _get(state, 'user.errorMessage.onCancel', () => { }),
    isCancelAvailable: _get(state, 'user.errorMessage.isCancelAvailable', false),
    handleClose: _get(state, 'user.errorMessage.handleClose', () => { })
});

export const errorMapDispatchToProps = (dispatch) => ({
    clearError: () =>
        dispatch(userActions.clearErrorPopup())
});
