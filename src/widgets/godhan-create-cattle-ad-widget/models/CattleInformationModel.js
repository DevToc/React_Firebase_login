import _get from 'lodash/get';

export const cattleInformationMapStateToProps = (state) => ({
    listingForm: _get(state, 'form.listingForm'),
    getUserDetails: _get(state, "user.userData")
});

export const cattleInformationMapDispatchToProps = (dispatch) => ({
    
})