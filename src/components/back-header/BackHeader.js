import React from "react";
import { makeStyles } from "@material-ui/core";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  header: {
    width: "100%",
    // position: "sticky",
    backgroundColor: "white",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)",
    padding: "10px 12px",
    display: "flex",
    alignItems: "center",
    borderBottom: 0,
    // zIndex: 2,
    color: "#001D48",
    justifyContent: "space-between",
    fontFamily: "Merriweather-Regular",
  },

  backContainer: {
    display: "flex",
    alignItems: "center",
  },

  icon: {
    height: 22,
  },

  title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    color: "inherit",
    marginLeft: -4,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const BackHeader = ({
  title = "Back",
  onGoBack,
  right,
  style = {},
  titleStyle = {},
  backIconStyle = {},
  skipHeaderClass = false,
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <div
        style={style}
        className={`${classes.header} ${skipHeaderClass ? "" : "header"}`}
      >
        <div
          onClick={onGoBack || history.goBack}
          className={classes.backContainer}
        >
          <ArrowBackIos style={backIconStyle} className={classes.icon} />
          <span style={titleStyle} className={classes.title}>
            {title}
          </span>
        </div>
        {right && right}
      </div>
    </>
  );
};

export default BackHeader;
