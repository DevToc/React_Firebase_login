import React, { useState } from "react";
import { connect } from "react-redux";
import {
  productListingMapDispatchToProps,
  productListingMapStateToProps,
} from "../models";
import _isEmpty from "lodash/isEmpty";
import { Divider, Box, Badge, useMediaQuery } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import _get from "lodash/get";
import _includes from "lodash/includes";
import { globalConstants, globalUtils } from "../../../utils";
import { ProductListingCard } from "../../../components";
import { FiltersSearch } from "./FiltersSearchComponent";
import { updateFormStore } from "../../../utils";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { getPayload } from "../utils";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import BackHeader from "../../../components/back-header/BackHeader";
import { useHistory } from "react-router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductListingSearchComponent = (props) => {
  const {
    productList,
    updateFavoriteStatus,
    homeForm,
    searchForm,
    additionalFiltersForm,
    setCurrentConversation,
    favouriteItemIds,
    customFilters,
    fetchProductList,
    customFiltersForm,
    totalElements,
    totalSize,
    offset,
    filtersOpen,
    setOpen,
    options,
    filterOptions
  } = props;

  const handleFiltersChange = () => setOpen(!filtersOpen);

  const history = useHistory();
  const isMedium = useMediaQuery("(min-width:800px)");

  const [isPopoverOpened, setPopoverOpened] = useState(false);

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
    updateFormStore({ form: "homeForm", field: "selectedItem", value: prod });
    setCurrentConversation(_get(prod, "productID"));
  };

  const handleClick = () => {
    updateFormStore({ form: "homeForm", field: "offset", value: offset + 1 });
    fetchProductList({
      offset: offset + 1,
      limit: globalConstants.paginationLimit,
      payload: getPayload(
          homeForm,
          searchForm,
          additionalFiltersForm,
          customFiltersForm,
          _get(homeForm, "sortBy.value"),
          filterOptions
        ),
    });
  };

  const list = (anchor) => (
    <div
      role="presentation"
    >
      <div className="notch" />
      <BackHeader title="Filters" onGoBack={() => setOpen(false)} skipHeaderClass />
      <Grid container justify="center" spacing={3}>
        <Grid item sm={10} xs={10}>
          <FiltersSearch
            options={options}
            handleClose={handleFiltersChange}
            anchor={anchor}
            customFilters={customFilters}
          />
        </Grid>
      </Grid>
    </div>
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

  let anchor = "bottom";
  return (
    <div className="search-section">
      <Grid
        style={{ padding: "0 10px" }}
        container
        justify="center"
        spacing={isMedium ? 3 : 1}
      >
        {!_isEmpty(productList, "content") &&
          _get(productList, "content.length", 0) > 0 ? (
            productList.content.map((prod, key) => (
              <React.Fragment key={key}>
                <Grid item xs={6} sm={4} md={4} lg={3} id={key}>
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
              </React.Fragment>
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
                  <Typography component="h1" variant="h6">
                    <Box component="span">No items found</Box>
                  </Typography>
                </div>
                <Divider variant="middle" />
              </Grid>
            </>
          )}
      </Grid>
      {totalElements > totalSize && (
        <div className="show-more-component">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            aria-label="show-more"
            disableElevation
            onClick={handleClick}
          >
            Show more
          </Button>
        </div>
      )}

      <Dialog
        style={{ overflowX: "hidden" }}
        fullScreen
        open={filtersOpen}
        onClose={handleFiltersChange}
        TransitionComponent={Transition}
      >
        {list(anchor)}
      </Dialog>
    </div>
  );
};

export const ProductListingSearch = connect(
  productListingMapStateToProps,
  productListingMapDispatchToProps
)(ProductListingSearchComponent);
