import React, { useState } from "react";
import { connect } from "react-redux";
import {
  productListingMapDispatchToProps,
  productListingMapStateToProps,
} from "../models";
import _isEmpty from "lodash/isEmpty";
import {
  Badge,
  Box,
  Divider,
  IconButton,
  Popover,
  TextField,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import _get from "lodash/get";
import _includes from "lodash/includes";
import { Link, useHistory } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import ClearIcon from "@material-ui/icons/Clear";
import { ProductListingCard } from "../../../components";
import { globalUtils } from "../../../utils/global";
import { updateFormStore } from "../../../utils";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { useMediaQuery } from "@material-ui/core";

const ProductListingComponent = (props) => {
  const [isPopoverOpened, setPopoverOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const isMedium = useMediaQuery("(min-width:800px)");

  const {
    productList,
    updateFavoriteStatus,
    homeForm,
    expressInterest,
    userID,
    username,
    isAuthorized,
    setCurrentConversation,
    favouriteItemIds,
  } = props;
  const history = useHistory();
  const handleFavorite = (product) => {
    if (globalUtils.isTokenAvailable()) {
      updateFavoriteStatus({
        ...product,
        isFavourite: !_includes(
          favouriteItemIds,
          _get(product, "productID", _get(product, "wantedID"))
        ),
      });
    } else {
      history.push("/login");
    }
  };

  const handleChatButtonClick = (event, prod) => {
    setPopoverOpened(!isPopoverOpened);
    setAnchorEl(event.currentTarget);
    updateFormStore({ form: "homeForm", field: "selectedItem", value: prod });
    setCurrentConversation(_get(prod, "productID"));
  };

  const handleClose = () => {
    setPopoverOpened(!isPopoverOpened);
    setAnchorEl(null);
    updateFormStore({ form: "homeForm", field: "selectedItem", value: {} });
  };

  const handleInterest = () => {
    const item = _get(homeForm, "selectedItem.value");
    if (String(userID) === String(_get(item, "userID"))) {
      handleClose();
      updateFormStore({
        form: "homeForm",
        field: "userMessage",
        value: "You cannot bid on a product you listed",
      });
      return;
    }
    updateFormStore({ form: "homeForm", field: "userMessage", value: null });
    expressInterest({
      currentUser: String(userID),
      currentUserName: username,
      listedBy: _get(item, "userName"),
      id: String(_get(item, "productID")),
      title: _get(item, "productTitle"),
      sellerId: String(_get(item, "userID")),
      isInitiateChat: true,
      image: _get(item, "imageURL[0]"),
      amount: globalUtils.isNumeric(_get(homeForm, "bidAmount.value"))
        ? `${globalUtils.getCountryProperty("currency")} ${_get(
          homeForm,
          "bidAmount.value"
        )}`
        : _get(homeForm, "bidAmount.value"),
    });
    updateFormStore({ form: "homeForm", field: "bidAmount", value: "" });
    handleClose();
  };

  const handleAmountChange = (e) => {
    const { value, name } = e.target;
    updateFormStore({ form: "homeForm", field: name, value });
  };

  const handleAmountBlur = (e) => {
    const { value, name } = e.target;
    updateFormStore({ form: "homeForm", field: name, value });
    // validateField({ form: 'homeForm', field: name, data: value })
  };

  const chatPopup = () => (
    <Popover
      id={id}
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      className="product-listing-make-offer-pop-over"
    >
      <Typography component="p" variant="body2">
        Do you want to know more about{" "}
        <b>{_get(homeForm, "selectedItem.value.productTitle")}</b>?
      </Typography>
      <div className="amount-section">
        <TextField
          name={_get(homeForm, "bidAmount.name")}
          placeholder={_get(homeForm, "bidAmount.placeholder")}
          value={_get(homeForm, "bidAmount.value")}
          variant="outlined"
          color="primary"
          type={_get(homeForm, "bidAmount.type")}
          fullWidth
          autoFocus
          multiline
          rows={2}
          margin="normal"
          onChange={handleAmountChange}
          onBlur={handleAmountBlur}
        // error={!_get(homeForm, 'bidAmount.isValid')}
        // helperText={!_get(homeForm, 'bidAmount.isValid') && _get(homeForm, 'bidAmount.errorText')}
        />
      </div>

      <div className="bid-buttons">
        <IconButton variant="outlined" color="primary" onClick={handleClose}>
          <ClearIcon />
        </IconButton>
        {isAuthorized ? (
          <>
            <IconButton
              variant="outlined"
              color="primary"
              onClick={handleInterest}
            >
              <SendIcon />
            </IconButton>
          </>
        ) : (
            <Link to="login">
              <IconButton variant="outlined" color="primary">
                <SendIcon />
              </IconButton>
            </Link>
          )}
      </div>
    </Popover>
  );

  const renderCardContent = (prod) => {
    return (
      <div className="home-page-card">
        <div className="ribbon">
          <span className="ribbon-content">
            {_get(prod, "type", "special")}
          </span>
        </div>
        <ProductListingCard
          prod={prod}
          handleFavorite={handleFavorite}
          favouriteItemIds={favouriteItemIds}
          handleChatButtonClick={handleChatButtonClick}
        />
      </div>
    );
  };

  return (
    <>
      <h2 className="heading">Recently Added</h2>
      <Grid container justify="center" spacing={isMedium ? 3 : 1}>
        {!_isEmpty(productList, "content") &&
          _get(productList, "content.length", 0) > 0 ? (
            productList.content.map((prod, key) => (
              <>
                <Grid item xs={6} sm={4} md={4} lg={3} id={key} key={key}>
                  {_get(prod, "sponsorListing", false) ? (
                    <>
                      <Badge className="badge" badgeContent="Featured">
                        {renderCardContent(prod)}
                      </Badge>
                    </>
                  ) : (
                      renderCardContent(prod)
                    )}
                </Grid>
              </>
            ))
          ) : (
            <>
              <Grid item>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <NotificationsNoneIcon fontSize="large" />
                  <Typography
                    component="h1"
                    variant="h6"
                    className="no-item-found"
                  >
                    <Box component="span">No items found</Box>
                  </Typography>
                </div>
                <Divider variant="middle" />
              </Grid>
            </>
          )}
      </Grid>
      {chatPopup()}
    </>
  );
};

export const ProductListing = connect(
  productListingMapStateToProps,
  productListingMapDispatchToProps
)(ProductListingComponent);
