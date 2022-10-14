import React from "react";
import { connect } from "react-redux";
import {
  savedItemsMapDispatchToProps,
  savedItemsMapStateToProps,
} from "../models";
import { SavedItemsStyle } from "../style";
import { useTheme } from "@material-ui/core";
import * as _ from "lodash";
import BackHeader from "../../../components/back-header/BackHeader";
import SavedItemCard from "./SavedItemCard";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { globalConstants } from "../../../utils";

const SavedItemsComponent = ({
  productList,
  updateFavoriteStatus,
  favouriteItemIds,
  setSelectedOption,
}) => {
  const history = useHistory();

  const handleFavorite = (product) => {
    updateFavoriteStatus({
      ...product,
      isFavourite: !_.includes(
        favouriteItemIds,
        _.get(product, "productID", _.get(product, "wantedID"))
      ),
    });
  };

  return (
    <>
      <SavedItemsStyle theme={useTheme()}>
        <BackHeader
          onGoBack={() => {
            setSelectedOption(3);
            history.goBack();
          }}
          title="Saved Items"
        />
        {
            productList.content?.length === 0 && (
              <div className="notification-margin">
                <Alert
                  variant="outlined"
                  severity={globalConstants.notificationMessageSeverity.WARNING}
                >
                  You do not have any saved products
              </Alert>
              </div>
            )
          }
        <div className={`itemsContainer ${productList.content?.length === 0 ? '': 'bg-white'}`}>
          {productList.content &&
            productList.content.map((product) => (
              <SavedItemCard
                onClick={() => history.push("/product/" + product.productID)}
                favouriteItemIds={favouriteItemIds}
                product={product}
                onStarClick={() => handleFavorite(product)}
              />
            ))}
        </div>
      </SavedItemsStyle>
    </>
  );
};

export const SavedItems = connect(
  savedItemsMapStateToProps,
  savedItemsMapDispatchToProps
)(SavedItemsComponent);
