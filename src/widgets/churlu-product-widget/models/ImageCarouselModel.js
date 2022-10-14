import _get from "lodash/get";
import * as services from "../../../services";

const { itemActions } = services;

export const imageCarouselMapDispatchToProps = (dispatch) => ({
  updateFavoriteStatus: (payload) =>
    dispatch(itemActions.updateItemFavorite(payload)),
});

export const imageCarouselMapStateToProps = (state) => ({
  product: _get(state, "item.product", {}),
  favouriteItemIds: _get(state, "item.favouriteItems", []),
  locationForDisplay: _get(
    state,
    "location.currentLocation.locationForDisplay"
  ),
  userID: _get(state, "user.userData.id"),
});
