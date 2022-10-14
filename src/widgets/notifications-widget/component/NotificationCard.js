import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    display: "flex",
    marginTop: 15,
    border: "1px solid rgba(43, 87, 154, 0.7)",
    alignItems: "center",
    position: "relative",
    maxWidth: 500,
    width: "100%",
    backgroundColor: "#F5F5F5",
  },
  thumbnail: {
    objectFit: "cover",
    height: "65px !important",
    width: 65,
    minWidth: 65,
  },

  content: {
    width: "100%",
    overflow: "hidden",
    padding: "5px 10px",
  },

  title: {
    fontSize: 18,
    color: "black",
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    fontWeight: "400 !important",
  },
  time: {
    fontSize: 15,
    fontWeight: "500",
    color: "#344654",
    marginTop: 5,
  },
});

const NotificationCard = ({ onClick, title, time, thumbnail }) => {
  const classes = useStyles();

  return (
    <div onClick={onClick} className={classes.card}>
      <img
        src={thumbnail || "/assets/images/logo.png"}
        className={classes.thumbnail}
        alt=""
      />

      <div className={classes.content}>
        <h2 className={classes.title}>{title}</h2>
        <div className={classes.time}>{time}</div>
      </div>
    </div>
  );
};

export default NotificationCard;
