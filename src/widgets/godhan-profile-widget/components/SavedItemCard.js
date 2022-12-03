import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import StarIconFill from "../../../assets/icons/starBlue";
import StarIcon from "../../../assets/icons/starWhite";
import _get from "lodash/get";
import _includes from "lodash/includes";

const useStyles = makeStyles({
  card: {
    display: "flex",
    marginTop: 15,
    border: "1px solid rgba(140, 69, 11, 0.7)",
    alignItems: "center",
    position: "relative",
    maxWidth: 500,
    width: "100%",
    backgroundColor: "#F5F5F5",
  },
  thumbnail: {
    objectFit: "cover",
    height: "80px !important",
    width: 80,
    minWidth: 77,
  },

  content: {
    width: "100%",
    overflow: "hidden",
    padding: "5px 10px",
    position: "relative",
  },

  title: {
    fontWeight: "normal",
    fontSize: 18,
    color: "#001D48",
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "75%",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  author: {
    color: "#001D48",
    fontSize: 15,
    fontWeight: "500",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "75%",
  },

  description: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "75%",
  },

  starButton: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});

const ListingCard = ({ onClick, onStarClick, product, favouriteItemIds }) => {
  const classes = useStyles();

  const { imageURL, productTitle, userName, productDescription } = product;

  return (
    <div className={classes.card}>
      <img
        src={imageURL[0] || "/assets/images/logo.png"}
        className={classes.thumbnail}
        alt=""
        onClick={onClick}
      />

      <div className={classes.content}>
        <h2 className={classes.title} onClick={onClick} >{productTitle}</h2>
        <div className={classes.description}>{productDescription}</div>

        <div className={classes.row}>
          <div className={classes.author}>{userName}</div>
        </div>

        <IconButton className={classes.starButton} onClick={onStarClick}>
          {_includes(
            favouriteItemIds,
            _get(product, "productID", _get(product, "wantedID"))
          ) ? (
            <StarIconFill />
          ) : (
            <StarIcon />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default ListingCard;
