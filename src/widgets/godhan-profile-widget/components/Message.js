import React from "react";
import { makeStyles } from "@material-ui/core";
import SeenIcon from "../../../assets/icons/Seen";

const useStyles = makeStyles({
  row: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rowReverse: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  message: {
    padding: "7px 17px",
    backgroundColor: "white",
    maxWidth: "65%",
    fontSize: 20,
    color: "black",
    borderRadius: 30,
    marginLeft: 5,
  },
  messageReverse: {
    padding: "7px 17px",
    backgroundColor: "rgba(140, 69, 11, 1)",
    maxWidth: "65%",
    fontSize: 20,
    color: "white",
    borderRadius: 30,
    marginLeft: 5,
  },
  date: {
    fontSize: 13,
    color: "black",
    fontWeight: "500",
    marginRight: 8,
    marginTop: 5,
  },
  dateReverse: {
    fontSize: 13,
    color: "black",
    fontWeight: "500",
    marginLeft: 8,
    marginTop: 5,
  },
});

const Message = ({ message, seen, date, personal }) => {
  const classes = useStyles();

  return (
    <div style={{ marginBottom: 7 }}>
      <div className={personal ? classes.row : classes.rowReverse}>
        {seen && personal && <SeenIcon />}
        <span className={personal ? classes.message : classes.messageReverse}>
          {message}
        </span>
        {seen && !personal && <SeenIcon />}
      </div>
      <div className={personal ? classes.row : classes.rowReverse}>
        <span className={personal ? classes.date : classes.dateReverse}>
          {date}
        </span>
      </div>
    </div>
  );
};

export default Message;
