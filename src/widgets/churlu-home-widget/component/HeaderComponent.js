import React from "react";
import { FullWidthTabs } from "../component";
import { makeStyles } from "@material-ui/core";
import { Slick } from "./Slick";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Search } from "../../../components";

const useStyles = makeStyles((theme) => ({
  treeRoot: {
    flexGrow: 1,
  },
  root: {
    margin: "1rem",
    textTransform: "capitalize",
  },
  link: {
    display: "flex",
    alignItems: "center",
  },
  inputRoot: {
    alignItems: "center",
    display: "flex",
    height: "95%",
    padding: "0px",
    borderRadius: "4px",
    border: "1.5px solid lightgray",
    boxShadow: "none",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  userDataContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
  userName: {
    marginLeft: 5,
    fontWeight: "600",
    color: "#001D48",
    fontSize: 18,
  },
  userLocationContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    color: "#001D48",
    overflow: "hidden",
    width: "50%",
    justifyContent: "flex-end",
  },
  userLocation: {
    fontSize: 18,
    color: "#001D48",
    fontWeight: "500",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  countryCode: {
    fontSize: 18,
    color: "#001D48",
    fontWeight: "500",
  },
  "@media (max-width:300px)": {
    userLocation: {
      fontSize: '12px !important',
    },
    userName: {
      fontSize: '12px !important',
    }
  }
}));

export const HeaderComponent = ({
  isHomePage = true,
  options = [],
  homeForm,
  userData = {},
  handleSearch,
  setIsKeyBoardOpen
}) => {
  const classes = useStyles();

  const displayLocation = homeForm.selectedLocation?.value;
  const countryCode = homeForm.selectedLocationCountryCode?.value;

  return (
    isHomePage && (
      <>
        <div
          // style={{ position: "sticky", zIndex: 5, top: 0 }}
          className="display-flex header"
        >
          <div className="left-pane">
            <div className={classes.userDataContainer}>
              <Link className={classes.link} to="profile">
                <Avatar
                  style={{ width: 35, height: 35 }}
                  src={userData.profileImg}
                />
                <span className={classes.userName}>
                  {userData?.name?.split(" ")[0]}
                </span>
              </Link>
              <Link to="location" className={classes.userLocationContainer}>
                <LocationOnOutlinedIcon color="#001D48" />
                <span className={classes.userLocation}>
                  {displayLocation ? displayLocation : "Set Location"}
                </span>
                {countryCode && (
                  <span className={classes.countryCode}>
                    ,&nbsp;{countryCode}
                  </span>
                )}
              </Link>
            </div>
            <div className="tabs-header">
              <FullWidthTabs />
            </div>
            <Search
              homeForm={homeForm}
              options={options}
              isHomePage={isHomePage}
              handleSearch={handleSearch}
              setIsKeyBoardOpen={setIsKeyBoardOpen}
            />
          </div>
        </div>

        <Slick />
      </>
    )
  );
};
