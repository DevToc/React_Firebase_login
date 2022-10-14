import React from "react";
import { connect } from "react-redux";
import * as _ from "lodash";
import { useTheme } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";

import {
  listedProductMapDispatchToProps,
  listedProductMapStateToProps,
} from "../models";
import { globalUtils } from "../../../utils";
import { listedProductsStyle } from "../style";
import BackHeader from "../../../components/back-header/BackHeader";
import ListingCard from "./ListingCard";

const ListedProductsComponent = ({
  products,
  updateItemStatus,
  setItemSelectedForEdit,
  getProduct,
  setSelectedOption,
  title = "My Listing",
  isPublicProfile,
  setAuxiliaryOption
}) => {
  const history = useHistory();

  const handleItemStatusUpdate = (option, productId) => {
    updateItemStatus({ status: option.id, id: productId });
  };

  const handleEdit = (product) => {
    setItemSelectedForEdit(product);
    getProduct({ id: _.get(product, "productID") });
  };

  return (
    <>
      <StyledListedProduct theme={useTheme()}>
        <BackHeader title={title} onGoBack={() => {if(isPublicProfile){ setAuxiliaryOption(0)} setSelectedOption(3);  history.goBack();}} />
        <div className="listingContainer">
          {products.map((product) => {
            return (
              <ListingCard
                key={product.productID}
                thumbnail={product.imageURL[0]}
                title={product.productTitle}
                status={product.listingStatus}
                onUpdateStatus={(option) =>
                  handleItemStatusUpdate(option, product.productID)
                }
                postedDate={globalUtils.getFormattedDate(
                  product.listedOn,
                  "YYYY-MM-DDThh:mm:ss:000Z"
                )}
                onEdit={() => handleEdit(product)}
                onPreview={() => history.push(`/product/${product.productID}`)}
                isPublicProfile={isPublicProfile}
              />
            );
          })}
        </div>
      </StyledListedProduct>
    </>
  );
};

const StyledListedProduct = listedProductsStyle;

export const ListedProducts = connect(
  listedProductMapStateToProps,
  listedProductMapDispatchToProps
)(ListedProductsComponent);
