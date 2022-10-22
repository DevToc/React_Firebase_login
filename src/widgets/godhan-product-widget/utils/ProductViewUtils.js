import React, { useState } from "react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _includes from "lodash/includes";
import {
  CardContent,
  CardHeader,
  Typography,
  Grid,
  TableContainer,
  TableCell,
  TableRow,
  Paper,
  Table,
  TableBody,
} from "@material-ui/core";
import {
  productOverviewProps,
  wantedProps,
  taskProps,
  productOverviewSellProps,
} from "./ProductView.props";
import { globalUtils } from "../../../utils";
import PermIdentityTwoToneIcon from "@material-ui/icons/PermIdentityTwoTone";
import bedroomImage from "../../../assets/icons/product/bedroom.png";
import bathroomImage from "../../../assets/icons/product/bathroom.png";
import streetImage from "../../../assets/icons/product/street.png";
import indoorImage from "../../../assets/icons/product/indoor.png";
import outdoorImage from "../../../assets/icons/product/outdoor.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

export const productOverviewHeader = () => (
  <CardHeader title="PRODUCT OVERVIEW"></CardHeader>
);

export const sellerInformationBody = (product) => (
  <CardContent>
    <div style={{ display: "flex", padding: "10px" }}>
      {_get(product, "profileImg") ? (
        <img
          alt={_get(product, "profileImg")}
          src={_get(product, "profileImg")}
          className="profile-picture"
        />
      ) : (
          <span
            style={{
              backgroundColor: "#224214",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              padding: "15px",
            }}
          >
            <PermIdentityTwoToneIcon
              style={{
                fontSize: "25px",
                marginLeft: "-7px",
                marginTop: "-8px",
                color: "white",
              }}
            />
          </span>
        )}
      <h4
        style={{ marginTop: "auto", marginBottom: "auto", marginLeft: "10px" }}
      >
        {_get(product, "userName", "NA")}
      </h4>
    </div>
    <TableContainer component={Paper}>
      <Table className="listed-products-table" aria-label="simple table">
        <TableBody>
          {_get(product, "contactEmailAddressDisplayed") &&
            globalUtils.isTokenAvailable() && (
              <TableRow>
                <div className="display-section">
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      width: "22%",
                      paddingLeft: "0px",
                      paddingRight: "0px",
                    }}
                  >
                    <Typography component="h4">Email:</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography component="h3">
                      <div style={{ wordBreak: "break-all" }}>
                        {_get(product, "contactEmail") ? (
                          <a
                            href={`mailto:${_get(product, "contactEmail")}`}
                            style={{ color: "#224214" }}
                          >
                            {_get(product, "contactEmail")}
                          </a>
                        ) : (
                            "Not Available"
                          )}
                      </div>
                    </Typography>
                  </TableCell>
                </div>
              </TableRow>
            )}
          {_get(product, "contactNumberDisplayed") &&
            globalUtils.isTokenAvailable() && (
              <TableRow>
                <div className="display-section">
                  <TableCell
                    component="th"
                    scope="row"
                    style={{
                      width: "22%",
                      paddingLeft: "0px",
                      paddingRight: "0px",
                    }}
                  >
                    <Typography component="h4">Contact:</Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography
                      component="h3"
                      style={{ wordBreak: "break-all" }}
                    >
                      <a
                        href={`tel:${_get(product, "contactNumber")}`}
                        style={{ color: "#224214" }}
                      >
                        {_get(product, "contactNumber")
                          ? `${globalUtils.getCountryProperty(
                            "phoneNumberPrefix"
                          )}-${_get(product, "contactNumber")}`
                          : "Not Available"}
                      </a>
                    </Typography>
                  </TableCell>
                </div>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </TableContainer>
    {/* </span> */}
  </CardContent>
);

const getProperties = (type) => {
  switch (type) {
    case "sell":
      return productOverviewSellProps;
    case "rent":
      return productOverviewProps;
    case "wanted":
      return wantedProps;
    case "task":
      return taskProps;
    default:
      return [];
  }
};

const getValue = (prop) => (prop.value === "false" ? "No" : "Yes");

const realestateOptions = [
  "Apartment",
  "House",
  "Condo & Granny Flats",
  "Roomates & Share Accommodation"
];

export const ProductFeatures = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getFeature = (key) => {
    return product.additionalFeatures?.find((feature) => feature.key === key);
  };

  const getNum = (string) => parseInt(string?.toString().replace(/^\D+/g, ""));

  const isRealEstate = realestateOptions.includes(product.categoryName);

  if (isRealEstate)
    return (
      <>
        <div>
          <CardContent>
            <h2 className="heading-sm">Key-Features</h2>
            <Grid container className="parent-container" spacing={0}>
              {getProperties(_get(product, "type")).map(
                (prop, index) =>
                  _get(product, `${_get(prop, "property")}`) && (
                    <>
                      <Grid
                        item
                        xs={6}
                        md={3}
                        lg={3}
                        className="display-features"
                        key={index} id={index}
                      >
                        <p className="text-small-with-font-weight margin-block key-font-weight" key={index} id={index}>
                          {_get(prop, "label", "Not Available")}:{" "}
                        </p>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        md={3}
                        lg={3}
                        className="display-features"
                      >
                        <p className="text-small margin-block">
                          {_get(prop, "isDate", false)
                            ? globalUtils.getFormattedDate(
                              _get(
                                product,
                                `${prop.property}`,
                                prop.default || "NA"
                              ),
                              "YYYY-MM-DDThh:mm:ss:000Z"
                            )
                            : _get(prop, 'isCapital', false) ? globalUtils.capitalizeFirstLetter(_get(product, prop.property, "NA"))
                              : _get(product, prop.property, prop.default || "NA")}
                        </p>
                      </Grid>
                    </>
                  )
              )}
              {product.type === 'sell' && (
                <>
                  <Grid item xs={6} md={3} lg={3} className="display-features">
                    <p className="text-small-with-font-weight margin-block key-font-weight">
                      {product.postTypeWanted} by
                    </p>
                  </Grid>
                  <Grid item xs={6} md={3} lg={3} className="display-features">
                    <p className="text-small margin-block">
                      {product.offeredBy}
                    </p>
                  </Grid>
                </>)}

              <Grid item xs={6} md={3} lg={3} className="display-features">
                <p className="text-small-with-font-weight margin-block key-font-weight">
                  {_includes(["sell", "rent"], product.type)
                    ? "Available From:"
                    : "Required By"}
                </p>
              </Grid>
              <Grid item xs={6} md={3} lg={3} className="display-features">
                <p className="text-small margin-block">
                  {_get(product, "listItemBy")
                    ? globalUtils.getFormattedDate(
                      _get(product, "listItemBy"),
                      "YYYY-MM-DDThh:mm:ss:000Z"
                    )
                    : "Immediately"}
                </p>
              </Grid>
            </Grid>
            {
              product.categoryName !== 'Parking Space' &&
              <>
                <h2 className="heading-sm">Rooms and Beds</h2>
                <Grid container className="parent-container" spacing={0}>
                  <Grid className="real-estate-features" item xs={6}>
                    <img src={bedroomImage} alt="" />
                    <span className="real-estate-text">Bedroom: {getFeature("noOfBeds")?.value || 0}</span>
                  </Grid>
                  <Grid className="real-estate-features" item xs={6}>
                    <img src={bathroomImage} alt="" />
                    <span className="real-estate-text">Bathroom: {getFeature("baths")?.value || 0}</span>
                  </Grid>
                </Grid>
              </>
            }
            <h2 className="heading-sm">Parking Space</h2>
            <Grid container className="parent-container" spacing={1}>
              <Grid className="real-estate-features" item xs={6}>
                <img
                  style={{ width: 30, height: 30 }}
                  src={indoorImage}
                  alt=""
                />
                <span className="real-estate-text">
                  Indoor: {getNum(getFeature("indoorParking")?.value) || 0}
                </span>
              </Grid>
              <Grid className="real-estate-features" item xs={6}>
                <img
                  style={{ width: 30, height: 30 }}
                  src={outdoorImage}
                  alt=""
                />
                <span className="real-estate-text">
                  Outdoor: {getNum(getFeature("outdoorParking")?.value) || 0}
                </span>
              </Grid>
              <Grid className="real-estate-features" item xs={6}>
                <img
                  style={{ width: 30, height: 30 }}
                  src={streetImage}
                  alt=""
                />
                <span className="real-estate-text">
                  Street: {getNum(getFeature("streetParking")?.value || 'NA')}
                </span>
              </Grid>
            </Grid>
            <Grid container className="parent-container">
              {isExpanded &&
                product.additionalFeatures
                  .filter(
                    (item) =>
                      !_includes(
                        [
                          "noOfBeds",
                          "baths",
                          "indoorParking",
                          "outdoorParking",
                          "streetParking",
                          "nearestTransport",
                          "nearestChildcare",
                          "nearestStore",
                          "nearestSchool",
                          "nearestStore",
                          "rent",
                          "rentDuration"
                        ],
                        item.key
                      )
                  )
                  .map((prop, key) => {
                    return (
                      <>
                        <Grid
                          item
                          xs={6}
                          md={3}
                          lg={3}
                          className="display-features"
                          key={key} id={key}
                        >
                          <p className="heading-sm margin-block" key={key} id={key}>{_get(prop, "label")}: </p>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          md={3}
                          lg={3}
                          className="display-features"
                        >
                          <p className="text-small margin-block">
                            {_get(prop, "label") === "Pet Friendly"
                              ? getValue(prop)
                              : _get(prop, "value", "Not available")}
                          </p>
                        </Grid>
                      </>
                    );
                  })}
              {product.categoryName !== 'Parking Space' && (
                <>
                  {isExpanded ? (
                    <Grid
                      style={{ marginTop: 10, marginBottom: 15, padding: 0 }}
                      className="real-estate-features"
                      item
                      xs={12}
                      onClick={() => setIsExpanded(false)}
                    >
                      <span style={{ margin: 0, fontWeight: 500, color: "black" }}>
                        Show Less
                  </span>
                      <ExpandLessIcon style={{ width: 28, height: 28 }} />
                    </Grid>
                  ) : (
                      <Grid
                        style={{ marginTop: 10, marginBottom: 15, padding: 0 }}
                        className="real-estate-features"
                        item
                        xs={12}
                        onClick={() => setIsExpanded(true)}
                      >
                        <span style={{ margin: 0, fontWeight: 500, color: "black" }}>
                          Show More
                  </span>
                        <ExpandMoreIcon style={{ width: 28, height: 28 }} />
                      </Grid>
                    )}
                </>
              )
              }
            </Grid>
            {
              product.categoryName !== 'Parking Space' &&
              (
                <>
                  <h2
                    style={{ marginBottom: 5, marginTop: 0 }}
                    className="heading-sm"
                  >
                    Nearest You
  </h2>
                  <Grid container className="parent-container" spacing={1}>
                    <Grid item xs={3} className="display-features">
                      Transport:{" "}
                    </Grid>
                    <Grid item xs={3} className="display-features">
                      {getFeature("nearestTransport")?.value || "Not Available"}
                    </Grid>
                    <Grid item xs={3} className="display-features">
                      Childcare:{" "}
                    </Grid>
                    <Grid item xs={3} className="display-features">
                      {getFeature("nearestChildcare")?.value || "Not Available"}
                    </Grid>
                    <Grid item xs={3} className="display-features">
                      Store:
                        </Grid>
                    <Grid item xs={3} className="display-features">
                      {getFeature("nearestStore")?.value || "Not Available"}
                    </Grid>
                    <Grid item xs={3} className="display-features">
                      School:{" "}
                    </Grid>
                    <Grid item xs={3} className="display-features">
                      {getFeature("nearestSchool")?.value || "Not Available"}
                    </Grid>
                  </Grid>
                </>
              )
            }

          </CardContent>
        </div>
      </>
    );

  return (
    <>
      <h2 className="heading-sm margin-block">Key-Features</h2>
      <div>
        <CardContent>
          <Grid container className="parent-container" spacing={0}>
            {getProperties(_get(product, "type")).map(
              (prop, index) =>
                _get(product, `${_get(prop, "property")}`) && (
                  <>
                    <Grid
                      item
                      xs={6}
                      md={3}
                      lg={3}
                      className="display-features"
                      key={index} id={index}
                    >
                      <p className="text-small-with-font-weight margin-block key-font-weight" key={index} id={index}>
                        {_get(prop, "label", "Not Available")}:{" "}
                      </p>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      md={3}
                      lg={3}
                      className="display-features"
                    >
                      <p className="text-small margin-block">
                        {_get(prop, "isDate", false)
                          ? globalUtils.getFormattedDate(
                            _get(
                              product,
                              `${prop.property}`,
                              prop.default || "NA"
                            ),
                            "YYYY-MM-DDThh:mm:ss:000Z"
                          )
                          : _get(prop, 'isCapital', false) ? globalUtils.capitalizeFirstLetter(_get(product, prop.property, "NA"))
                            : _get(product, prop.property, prop.default || "NA")}
                      </p>
                    </Grid>
                  </>
                )
            )}
            {product.type === 'sell' && (
              <>
                <Grid item xs={6} md={3} lg={3} className="display-features">
                  <p className="text-small-with-font-weight margin-block key-font-weight">
                    {product.postTypeWanted} by
                    </p>
                </Grid>
                <Grid item xs={6} md={3} lg={3} className="display-features">
                  <p className="text-small margin-block">
                    {product.offeredBy}
                  </p>
                </Grid>
              </>)}
            <Grid item xs={6} md={3} lg={3} className="display-features">
              <p className="text-small-with-font-weight margin-block key-font-weight">
                {_includes(["sell", "rent"], product.type)
                  ? "Available From:"
                  : "Required By"}
              </p>
            </Grid>
            <Grid item xs={6} md={3} lg={3} className="display-features">
              <p className="text-small margin-block">
                {_get(product, "listItemBy")
                  ? globalUtils.getFormattedDate(
                    _get(product, "listItemBy"),
                    "YYYY-MM-DDThh:mm:ss:000Z"
                  )
                  : "Immediately"}
              </p>
            </Grid>
            {!_isEmpty(product, "additionalFeatures") &&
              _get(product, "additionalFeatures") &&
              _get(product, "additionalFeatures").filter((val) => !_includes(['rent', 'rentDuration'], val.key)).map((prop, key) => {
                return (
                  <>
                    <Grid
                      item
                      xs={6}
                      md={3}
                      lg={3}
                      className="display-features"
                      key={key} id={key}
                    >
                      <p className="text-small-with-font-weight margin-block" key={key} id={key}>{_get(prop, "label")}: </p>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      md={3}
                      lg={3}
                      className="display-features"
                    >
                      <p className="text-small margin-block">
                        {_get(prop, "label") === "Pet Friendly"
                          ? getValue(prop)
                          : _get(prop, "value", "Not available")}
                      </p>
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </CardContent>
      </div>
    </>
  );
};
