import * as services from "../../../services";
import * as _ from "lodash";

const { locationActions, formActions } = services;

export const listingTypeSelectMapStateToProps = (state) => ({
    listingForm: _.get(state, "form.listingForm"),
});

export const listingTypeSelectMapDispatchToProps = (dispatch) => ({

});
