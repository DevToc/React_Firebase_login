import React, { memo } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  box: {
    padding: "8px 0 11px 0",
    backgroundColor: "white",
    border: "2px solid rgba(43, 87, 154, 0.7)",
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 17,
    color: "#344654",
    cursor: "pointer",
  },

  boxChecked: {
    padding: "8px 0 11px 0",
    backgroundColor: "#8c450b",
    border: "2px solid rgba(43, 87, 154, 0.7)",
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 17,
    color: "white",
  },
});

const CheckboxRectangle = ({ checked, onChange, label, style = {} }) => {
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

export default memo(CheckboxRectangle);
