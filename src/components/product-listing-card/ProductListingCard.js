import React from "react";
import {
  Card,
  Grid,
  IconButton,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import _get from "lodash/get";
import _includes from "lodash/includes";
import { globalUtils } from "../../utils";
import StarIconBlue from "../../assets/icons/starBlue";
import StarIconWhite from "../../assets/icons/starWhite";
import { Link } from "react-router-dom";
import BedIcon from "../../assets/icons/Bed";
import BathIcon from "../../assets/icons/Bath";
import CarIcon from "../../assets/icons/Car";
import SeatingCapacityIcon from "../../assets/icons/SeatingCapacity";
import cardStyle from "./CardStyle";
import ClampLines from "react-clamp-lines";
import CalendarIcon from "../../assets/icons/product/calendar";
import SpeedometerIcon from "../../assets/icons/product/speedometer";
import GearIcon from "../../assets/icons/product/gear";

const StyledCard = cardStyle;

const realestateOptions = [
  "Apartment",
  "House",
  "Condo & Granny Flats",
  "Roomates & Share Accommodation"
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    textAlign: "center",
    color: theme.palette.primary.main,
    border: 'solid #b5adad7d 0.8px',
    borderRadius: '6px'
    // borderRadius: '1.5rem'
  },
  media: {
    backgroundSize: "cover",
    border: "solid grey 1px",
    height: 200,
  },
  mediaSmall: {
    backgroundSize: "cover",
    border: "solid grey 1px",
    height: 165,
  },
  link: {
    textDecoration: "none",
    width: "100%",
  },
  actions: {
    display: "block",
  },
  starIconColor: {
    color: "rgba(0, 0, 0, 0.87)",
  },
  textAlignRight: {
    textAlign: "right",
  },
  featureItem: {
    paddingLeft: 10,
    display: "flex",
    alignItems: "center",
    marginBottom: 5,
  },
  featureValue: {
    fontFamily: "Dejavu-Sans",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    color: "#001D48",
    marginLeft: 6,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  starIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

export const ProductListingCard = (props) => {
  const { prod, handleFavorite, favouriteItemIds } = props;
  const classes = useStyles();

  const match = useMediaQuery("(max-width: 394px)");
  const matchSm = useMediaQuery("(max-width: 360px)");

  const getFeature = (key) => {
    return prod.additionalFeatures?.find((feature) => feature.key === key);
  };

  const getNum = (string) => parseInt(string?.toString().replace(/^\D+/g, ""));

  let description = (
    <Link
      to={`/product/${_get(prod, "productID", _get(prod, "wantedID"))}`}
      className={classes.link}
    >
      <ClampLines
        lines={2}
        buttons={false}
        className="description truncate"
        text={
          _get(prod, "productDescription", "")
            ? _get(prod, "productDescription", "")
            : _get(prod, "description", "")
        }
      />
    </Link>
  );

  if (realestateOptions.includes(prod.categoryName))
    description = (
      <div style={{ display: "flex" }}>
        <div className={classes.featureItem}>
          <BedIcon />
          <span className={classes.featureValue}>
            {getFeature("noOfBeds")?.value || 0}
          </span>
        </div>
        <div className={classes.featureItem}>
          <BathIcon />
          <span className={classes.featureValue}>
            {getFeature("baths")?.value || 0}
          </span>
        </div>
        <div className={classes.featureItem}>
          <CarIcon />
          <span className={classes.featureValue}>
            {getNum(getFeature("indoorParking")?.value) +
              getNum(getFeature("outdoorParking")?.value) +
              getNum(getFeature("streetParking")?.value) || 0}
          </span>
        </div>
      </div>
    );

  if (
    prod.categoryName === "Car"
  ) {
    const seats = getFeature("seatingCapacity")?.value;
    let seatingCapacity;
    if (seats) {
      seatingCapacity = seats + " Seats";
    }
    const transmissionType = getFeature("transmissionType")?.value;
    const model = getFeature("model")?.value;
    const kmDriven = getFeature("kmDriven")?.value;
    if (transmissionType || model || kmDriven || seats) {
      description = (
        <Grid style={{ marginTop: match ? 0 : 7 }} container>
          {model && <Grid
            item
            xs={6}
            style={match ? { paddingLeft: 0 } : null}
            className={classes.featureItem}
          >
            <CalendarIcon />
            <span
              style={matchSm ? { fontSize: 12, marginTop: 2 } : null}
              className={classes.featureValue}
            >
              {model}
            </span>
          </Grid>}
          {kmDriven && <Grid
            item
            xs={6}
            style={match ? { paddingLeft: 0 } : null}
            className={classes.featureItem}
          >
            <SpeedometerIcon />
            <span
              style={matchSm ? { fontSize: 12, marginTop: 2 } : null}
              className={classes.featureValue}
            >
              {kmDriven ? `${kmDriven} km` : 'NA'}
            </span>
          </Grid>}
          {seatingCapacity && <Grid
            item
            xs={6}
            style={match ? { paddingLeft: 0 } : null}
            className={classes.featureItem}
          >
            <SeatingCapacityIcon />
            <span
              style={matchSm ? { fontSize: 12, marginTop: 2 } : null}
              className={classes.featureValue}
            >
              {seatingCapacity}
            </span>
          </Grid>}
          {transmissionType && <Grid
            item
            xs={6}
            style={match ? { paddingLeft: 0 } : null}
            className={classes.featureItem}
          >
            <GearIcon />
            <span
              style={matchSm ? { fontSize: 12, marginTop: 2 } : null}
              className={classes.featureValue}
            >
              {transmissionType}
            </span>
          </Grid>}
        </Grid>
      );
    }
  }
  let rentDuration = getFeature("rentDuration")?.value;
  rentDuration = rentDuration?.startsWith("1") ? rentDuration.split(" ")[1] : rentDuration;

  return (
    <StyledCard>
      <Card className={classes.root}>
        <CardActionArea>
          <IconButton
            onClick={() => handleFavorite(prod)}
            className={classes.starIcon}
          >
            {_includes(
              favouriteItemIds,
              _get(prod, "productID", _get(prod, "wantedID"))
            ) ? (
                <StarIconBlue
                  className={classes.icon}
                  style={{ fontSize: "20px" }}
                />
              ) : (
                <StarIconWhite style={{ fontSize: "20px" }} />
              )}
          </IconButton>
          <Link
            to={`/product/${_get(prod, "productID", _get(prod, "wantedID"))}`}
            className={classes.link}
          >
            <CardMedia
              className={
                window.screen.width < 700 ? classes.mediaSmall : classes.media
              }
              image={_get(prod, "imageURL[0]", "/assets/images/logo.png")}
              title={_get(prod, "productName", "")}
            />

            <div
              className="card-price-tag"
              style={{
                width: "fit-content",
              }}
            >
              <div className="card-currency-tag">
                <span style={{ fontSize: 20, marginRight: -4 }}>
                  {_get(prod, "listedPrice") &&
                    globalUtils.getCountryProperty("currency")}
                </span>
                &nbsp;
                <span className="card-listedPrice-tag">
                  {globalUtils.getFormattedPrice(_get(prod, "listedPrice"))}
                </span>
              </div>
            </div>
          </Link>
          <CardContent style={{ padding: "0px 4px" }}>
            <div className="display-flex">
              <Link
                to={`/product/${_get(
                  prod,
                  "productID",
                  _get(prod, "wantedID")
                )}`}
                className={classes.link}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="display-title">
                    {_get(prod, "productTitle", "") || _get(prod, "title")}
                  </div>
                  {rentDuration && (
                    <span className="rentDuration">/{rentDuration}</span>
                  )}
                </div>
              </Link>
            </div>
            <div style={{ marginTop: 3 }}>{description}</div>
          </CardContent>
        </CardActionArea>

        <div className="product-extra-details">
          <div
            style={{
              fontFamily: "Dejavu-Sans",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: 14,
              color: "#001D48",
            }}
            className="text-limiter"
          >
            {_get(prod, "listedLocation", "")}
          </div>
          <div
            style={{
              fontFamily: "Dejavu-Sans",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: 14,
              color: "#001D48",
            }}
          >
            {globalUtils.getFormattedDate(
              _get(prod, "listedOn"),
              "YYYY-MM-DDThh:mm:ss:000Z"
            )}
          </div>
        </div>
      </Card>
    </StyledCard>
  );
};
