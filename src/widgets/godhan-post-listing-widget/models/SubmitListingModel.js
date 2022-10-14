import * as _ from "lodash";
import * as services from "../../../services";
import { notificationActions } from "../../../services";

const { itemActions } = services;
export const submitListingMapStateToProps = (state) => ({
  listingForm: _.get(state, "form.listingForm"),
  item: _.get(state, "user.selectedProductForEdit"),
  sellList: _.get(state, "refData.sellList", []),
  rentList: _.get(state, "refData.rentList", []),
  wantedList: _.get(state, "refData.wantedList", []),
});

export const submitListingMapDispatchToProps = (dispatch) => ({
  addListing: (payload) => dispatch(itemActions.addNewItem(payload)),
  createdWantedListing: (payload) =>
    dispatch(itemActions.createdWantedListing(payload)),
  setNotification: (payload) =>
    dispatch(notificationActions.setNotification(payload)),
});
