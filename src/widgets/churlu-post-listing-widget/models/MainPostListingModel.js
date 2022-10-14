import * as services from '../../../services';
import * as _ from 'lodash';


const { formActions, userActions } = services;


export const mainPostListingMapStateToProps = (state) => ({
    selectedOption: _.get(state, 'form.listingForm.selectedListingType.value'),
    sellList: _.get(state, 'refData.sellList', []),
    rentList: _.get(state, 'refData.rentList', []),
    wantedList: _.get(state, 'refData.wantedList', []),
    sellData: _.get(state, 'refData.sellData', {}),
    rentData: _.get(state, 'refData.rentData', {}),
    wantedData: _.get(state, 'refData.wantedData', {}),
    listingForm: _.get(state, 'form.listingForm'),
    newProduct: _.get(state, 'item.newProduct.productID', ''),
    userDetails: _.get(state, 'user.userData', {}),
    loader: _.get(state, 'user.loader', false),
    itemUnderEdit: _.get(state, 'user.selectedProductForEdit', {}),
});

export const mainPostListingMapDispatchToProps = (dispatch) => ({
    setFormData: (payload) =>
        dispatch(formActions.setFormConstants(payload)),
    clearSelectedItem: (payload) =>
        dispatch(userActions.clearSelectedItem(payload)),
    createNotification: (payload) =>
        dispatch(userActions.setErrorPopup(payload))
})