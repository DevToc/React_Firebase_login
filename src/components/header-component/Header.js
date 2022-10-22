import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  Button,
  Hidden,
  Tabs,
  Tab,
  Paper,
  Popover,
  Badge,
  Container,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { connect } from "react-redux";
import {
  loginButtons,
  headerMapStateToProps,
  getMenuOptions,
  renderHeader,
  headerMapDispatchToProps,
  getProfile,
  getNotifications,
} from "./HeaderUtils";
import { globalUtils, updateFormStore } from "../../utils";
import { Link } from "react-router-dom";
import _get from "lodash/get";
import { AccountCircle } from "@material-ui/icons";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";

const useStyles = makeStyles((theme) => ({
  rootPaper: {
    flexGrow: 0,
    boxShadow: "none",
    paddingLeft: "2rem",
  },
  Tab: {
    flexDirection: "row-reverse",
    borderRight: "solid gray 1px",
  },
  link: {
    textDecoration: "none",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    display: "block",
    color: "#000000",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
      width: "auto",
    },
    marginTop: "auto",
    marginBottom: "auto",
  },
  nav: {
    color: "#000000",
    backgroundColor: "white",
    marginBottom: "5px",
  },
  logoutIcon: {
    height: "20px",
    width: "20px",
    marginLeft: "20px",
  },
  loginButtons: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  textBlue: {
    verticalAlign: "top",
    color: "#224214",
  },
  text: {
    verticalAlign: "top",
    color: "#484848",
  },
  card: {
    width: "210px",
  },
  notificationCard: {
    width: "500px",
  },
  buttons: {
    color: "#224214",
    borderRadius: "25px",
    border: "solid 2px",
    borderColor: "#224214",
    borderBottomColor: "rgb(255, 206, 50)",
    borderRightColor: "rgb(255, 206, 50)",
    "&:hover, &:focus": {
      backgroundColor: "#ddd",
    },
  },
  anchorTagStyle: {
    color: "unset",
  },
  logoImage: {
    transform: "scale(3)",
    marginRight: "2rem",
  },
  logoImageSmall: {
    transform: "scale(3)",
    marginLeft: "2rem",
  },
  notificationWrapper: {
    margin: "1rem",
    marginTop: "auto",
  },
  notificationDisplay: {
    wordBreak: "break-word",
    width: "465px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "inline-block",
  },
  markUnread: {
    justifyContent: "flex-end",
    color: theme.palette.primary.main,
  },
}));

export const HeaderComponent = (props) => {
  const {
    isAuthorized,
    handleSignOut,
    clearAuthStore,
    sellData,
    rentData,
    fetchFilterOptions,
    fetchProductList,
    userDetails,
    wantedData,
    notificationList,
    markAllNotificationsAsRead,
    handleMarkAsRead,
  } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState("sell");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = !!anchorEl;

  const handleMenuClose = () => {
    setAnchorEl(null);
    document.getElementsByTagName("html")[0].style.overflow = "unset";
  };

  const handleChange = (event, newValue) => setValue(newValue);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
  };

  const handleSignoutObject = () => {
    localStorage.removeItem("token");
    clearAuthStore();
    handleSignOut();
    document.getElementsByTagName("html")[0].style.overflow = "unset";
  };

  const renderPopover = () => (
    <>
      <Popover
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        key={1}
      >
        {getOptions()}
      </Popover>
    </>
  );

  const getValue = () => {
    switch (value) {
      case "rent":
        return 0;
      case "sell":
        return 1;
      case "wanted":
        return 2;
      default:
        return null;
    }
  };
  const handleSearchClick = (category) => {
    updateFormStore({
      form: "homeForm",
      field: "listType",
      value: _get(category, "name"),
    });
    updateFormStore({
      form: "homeForm",
      field: "selectedCategoryId",
      value: _get(category, "id"),
    });
    updateFormStore({ form: "homeForm", field: "skipFormClear", value: true });
    updateFormStore({ form: "homeForm", field: "selectedType", value });
    const val = getValue();
    if (val !== null) {
      setTimeout(() => {
        document.getElementById(`full-width-tab-${val}`).click(null, val);
      }, 10);
    }
    globalUtils.handleSearch(
      fetchFilterOptions,
      fetchProductList,
      category,
      value
    );
    handleMenuClose();
  };

  // const handleTaskClick = () => {
  //   updateFormStore({ form: 'homeForm', field: 'selectedType', value: 'task' })
  //   updateFormStore({ form: 'homeForm', field: 'listType', value: '' })
  //   globalUtils.handleSearch(fetchFilterOptions, fetchProductList, '', 'task')
  //   globalUtils.scrollTo("search-header");
  // }

  const handleMarkAllRead = () => {
    markAllNotificationsAsRead();
    handleMenuClose();
  };

  const handleLinkSelect = (notification) => {
    handleMenuClose();
    handleMarkAsRead(notification);
  };

  const getOptions = () => {
    switch (value) {
      case "sell":
        return getMenuOptions(sellData, handleSearchClick, classes);
      case "rent":
        return getMenuOptions(rentData, handleSearchClick, classes);
      case "wanted":
        return getMenuOptions(wantedData, handleSearchClick, classes);
      case "profile":
        return getProfile(userDetails, handleSignoutObject, classes);
      case "notification":
        return getNotifications(
          notificationList,
          handleMarkAllRead,
          classes,
          handleLinkSelect
        );
      default:
        return null;
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <div>
        {renderPopover()}
        <Hidden mdUp>
          <div className="display-flex justify-space-between">
            <Link to="/" className={classes.loginButtons}>
              <img
                src="/assets/images/logo.png"
                alt="navBar"
                width="50"
                height="50"
                className={classes.logoImageSmall}
              />
            </Link>
            {!isAuthorized && (
              <span className={classes.loginButtons}>
                {loginButtons(classes)}
              </span>
            )}
            {isAuthorized && (
              <div
                className={classes.notificationWrapper}
                onClick={(e) => {
                  handleChange(e, "notification");
                  handleClick(e);
                }}
              >
                <NotificationsNoneIcon className="pointer-cursor notification-bell-icon" />
                {_get(notificationList, "length", 0) > 0 && (
                  <Badge
                    badgeContent={_get(notificationList, "length", 0)}
                    className="notification-badge"
                  />
                )}
              </div>
            )}
          </div>
        </Hidden>
        <Hidden mdDown>
          <AppBar position="static" className={classes.nav}>
            <Toolbar>
              <div className="display-flex">
                <span className="display-flex-menu">
                  {renderHeader(classes)}
                  <Paper className={classes.rootPaper}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      textColor="primary"
                      centered
                      TabIndicatorProps={{
                        style: {
                          display: "none",
                        },
                      }}
                    >
                      <Tab
                        label="Buy"
                        value="sell"
                        classes={{ wrapper: classes.Tab }}
                        icon={<ArrowDropDownIcon />}
                        onClick={handleClick}
                      />
                      <Tab
                        label="Rent"
                        value="rent"
                        classes={{ wrapper: classes.Tab }}
                        icon={<ArrowDropDownIcon />}
                        onClick={handleClick}
                      />
                      <Tab
                        label="Wanted"
                        value="wanted"
                        classes={{ wrapper: classes.Tab }}
                        icon={<ArrowDropDownIcon />}
                        onClick={handleClick}
                      />
                      {/*<Tab*/}
                      {/*  label={<div>*/}
                      {/*    <Link to="/search" className={classes.anchorTagStyle}>*/}
                      {/*      Tasks*/}
                      {/*      </Link>*/}
                      {/*  </div>}*/}
                      {/*  value="tasks"*/}
                      {/*  classes={{ wrapper: classes.Tab }}*/}
                      {/*  onClick={handleTaskClick}*/}
                      {/*/>*/}
                    </Tabs>
                  </Paper>
                </span>
                {globalUtils.isTokenAvailable() && (
                  <div
                    className={`${classes.notificationWrapper} ${classes.loginButtons}`}
                    onClick={(e) => {
                      handleChange(e, "notification");
                      handleClick(e);
                    }}
                  >
                    <NotificationsNoneIcon className="pointer-cursor" />
                    {_get(notificationList, "length", 0) > 0 && (
                      <Badge
                        badgeContent={_get(notificationList, "length", 0)}
                        className="notification-badge"
                      />
                    )}
                  </div>
                )}
                <span className={classes.loginButtons}>
                  {globalUtils.isTokenAvailable() ? (
                    <>
                      <Button
                        color="inherit"
                        onClick={(e) => {
                          handleChange(e, "profile");
                          handleClick(e);
                        }}
                      >
                        <AccountCircle />
                        <ArrowDropDownIcon />
                      </Button>
                    </>
                  ) : (
                    loginButtons(classes)
                  )}
                </span>
              </div>
            </Toolbar>
          </AppBar>
        </Hidden>
      </div>
    </Container>
  );
};

export const Header = connect(
  headerMapStateToProps,
  headerMapDispatchToProps
)(HeaderComponent);
