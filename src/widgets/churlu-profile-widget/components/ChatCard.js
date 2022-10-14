import React from "react";
import { makeStyles, Avatar } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    padding: "6px 0",
    borderTop: "1px solid rgba(50, 50, 50, 0.5)",
    borderBottom: "1px solid rgba(50, 50, 50, 0.5)",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    "&:first-child": {
      borderTop: 0,
    },
  },
  content: {
    paddingLeft: 25,
    width: "100%",
    minWidth: 0,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    overflow: "hidden",
  },
  primaryText: {
    fontWeight: "600",
    fontSize: 17,
    color: "#001D48",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "@media(max-width: 370px)": {
      maxWidth: "50%",
    },
  },
  secondaryText: {
    fontWeight: "500",
    fontSize: 15,
    color: "rgba(0, 29, 72, 0.9)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "70%",
    "@media(max-width: 370px)": {
      maxWidth: "50%",
    },
  },
});

const ChatCard = ({ image, title, lastMessage, name, date, onClick }) => {
  const classes = useStyles();

  return (
    <div onClick={onClick} className={classes.card}>
      <Avatar style={{ width: 48, height: 48 }} src={image} />
      <div className={classes.content}>
        <div className={classes.row}>
          <span
            style={{ maxWidth: "calc(70% - 48px)" }}
            className={classes.primaryText}
          >
            {title}
          </span>
          <span className={classes.primaryText}>{name}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.secondaryText}>{lastMessage}</span>
          <span className={classes.secondaryText}>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
