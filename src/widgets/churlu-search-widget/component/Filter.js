import React from "react";
import { makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  box: {
    padding: 6,
    border: "1px solid rgba(43, 87, 154, 0.7)",
    borderRadius: 3,
    color: "#001D48",
    fontSize: 16,
    margin: "0 4px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    whiteSpace: "nowrap",
  },
});

const Filter = ({ onClose, text, style = {}, onClick, isGlobalFilter = false, showCloseIcon = false }) => {
  const classes = useStyles();

  return isGlobalFilter ? (
    <>
      <div
        // onClick={() => onClick()}
        style={style}
        className={classes.box}
      >
        <span onClick={()=> onClick()}>
          {text}
        </span>
        {showCloseIcon && (
          <CloseIcon
            onClick={onClose}
            style={{ width: 20, height: 20, marginLeft: 3 }}
          />
        )}
      </div>
    </>
  ) :
    (
      <div
        onClick={!onClose ? onClick : null}
        style={style}
        className={classes.box}
      >
        {text}
        {onClose && (
          <CloseIcon
            onClick={onClose}
            style={{ width: 20, height: 20, marginLeft: 3 }}
          />
        )}
      </div>
    );
};

export default Filter;
