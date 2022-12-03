import React, { memo } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  box: {
    backgroundColor: "white",
    border: "2px solid rgba(43, 87, 154, 0.7)",
    borderRadius: "50%",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 17,
    color: "#344654",
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },

  boxChecked: {
    backgroundColor: "#8c450b",
    border: "2px solid rgba(43, 87, 154, 0.7)",
    borderRadius: "50%",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 17,
    color: "white",
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const CheckboxCircle = ({ checked, onChange, label, style = {} }) => {
  const classes = useStyles();

  return (
    <div
      style={style}
      onClick={onChange}
      className={checked ? classes.boxChecked : classes.box}
    >
      {label}
    </div>
  );
};

export default memo(CheckboxCircle);
