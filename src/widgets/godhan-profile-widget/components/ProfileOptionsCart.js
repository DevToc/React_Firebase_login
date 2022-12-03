import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import {
  profileOptionsCartMapDispatchToProps,
  profileOptionsCartMapStateToProps,
} from "../models";
import { withRouter } from "react-router";
import _get from 'lodash/get';
import listingsImage from "../../../assets/icons/profile/listings.png";
import savesImage from "../../../assets/icons/profile/saves.png";
import editImage from "../../../assets/icons/profile/edit.png";
import { globalUtils } from "../../../utils";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "0 25px",
  },
  tabs: {
    display: "flex",
    padding: 13,
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "white",
    border: "2px solid rgba(43, 87, 154, 0.7)",
    maxWidth: 500,
    borderRadius: 5,
  },
  tab: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  },
  tabLabel: {
    fontSize: 16,
    color: "#001D48",
    fontWeight: "600",
    lineHeight: "19px",
    textAlign: "center"
  },
  tabImage: {
    marginBottom: 4,
  },
}));

// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     "aria-controls": `full-width-tabpanel-${index}`,
//   };
// }

export const ProfileOptionsCartComponent = ({
  selectedOption,
  setSelectedOption,
  fetchSellerProfie,
  clearListedProducts,
  fetchFavouriteItems,
  fetchFavouriteIds,
  setAuxiliaryOption,
  history,
  setEditable,
  isPublic,
  otherListing = 0,
  product
}) => {
  const classes = useStyles();
  const handleSelection = (option) => {
    clearListedProducts();
    switch (option) {
      case 0:
        fetchSellerProfie({
          offset: 0,
        });
        break;
      //   case 1:
      //     history.push("/chat");
      //     // fetchCurrentConversations({
      //     //   currentUser: _get(userDetails, 'id')
      //     // })
      //     // clearListedProducts()
      //     break;
      case 1:
        fetchFavouriteItems({});
        fetchFavouriteIds();
        break;
      case 2:
        setEditable(true);
        break;
      default:
        break;
    }
    setAuxiliaryOption(0);
    setSelectedOption(option);
  };

  const handleOtherListingClick = () => {
    if (otherListing - 1 > 0) {
      setAuxiliaryOption(6);
      const userId = globalUtils.getValueFromUrlQuery("userId") || _get(product, 'userID')
      const productId = globalUtils.getValueFromUrlQuery("id")
      fetchSellerProfie({
        offset: 0,
        id: userId
      });
      history.push(`/profile?id=${productId}&userId=${userId}&view=list`)
    }
  }

  if (isPublic)
    return (
      <div className={classes.container}>
        <div style={{ justifyContent: "center" }} className={classes.tabs}>
          <div onClick={() => handleOtherListingClick()} className={classes.tab}>
            <img className={classes.tabImage} src={listingsImage} alt="" />
            <span className={classes.tabLabel}>
              Total Listings - {otherListing}
            </span>
          </div>
        </div>
      </div>
    );

  return (
    <div className={classes.container}>
      <div className={classes.tabs}>
        <div
          onClick={() => {
            history.push("/profile?type=previouslyListedItems");
            handleSelection(0);
          }}
          className={classes.tab}
        >
          <img className={classes.tabImage} src={listingsImage} alt="" />
          <span
            style={window.screen.width < 350 ? { fontSize: 15 } : null}
            className={classes.tabLabel}
          >
            My Listing
          </span>
        </div>
        <div
          onClick={() => {
            history.push("/profile?type=saveditems");
            handleSelection(1);
          }}
          className={classes.tab}
        >
          <img className={classes.tabImage} src={savesImage} alt="" />
          <span
            style={window.screen.width < 350 ? { fontSize: 15 } : null}
            className={classes.tabLabel}
          >
            Saved Items
          </span>
        </div>
        <div onClick={() => {
          history.push("/profile?type=editProfile");
          handleSelection(2)
        }} className={classes.tab}>
          <img className={classes.tabImage} src={editImage} alt="" />
          <span
            style={window.screen.width < 350 ? { fontSize: 15 } : null}
            className={classes.tabLabel}
          >
            Edit Profile
          </span>
        </div>
      </div>
    </div>
  );
};

export const ProfileOptionsCart = withRouter(
  connect(
    profileOptionsCartMapStateToProps,
    profileOptionsCartMapDispatchToProps
  )(ProfileOptionsCartComponent)
);
