import React, { memo, useState } from "react";
import { makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ClickAwayListener from "react-click-away-listener";

const useStyles = makeStyles({
  select: {
    padding: "0 20px 8px 20px",
    background: "#FFFFFF",
    border: "2px solid rgba(43, 87, 154, 0.7)",
    borderRadius: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  label: {
    fontSize: 18,
    color: "#344654",
    fontWeight: "500",
    marginTop: 8,
    cursor: "pointer",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  optionsContainer: {
    paddingLeft: 20,
    paddingBottom: 12,
    background: "white",
    border: "2px solid rgba(43, 87, 154, 0.7)",
    borderRadius: "0px 0px 5px 5px",
    position: "absolute",
    width: "100%",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: -3,
  },
  icon: {
    // width: 50,
    // height: 12,
    marginTop: 8,
  },
  "@media (max-width:300px)": {
    select: {
      padding: "0 5px 8px 5px",
    }
  }
});

const Select = ({
  value,
  onChange,
  options,
  style = {},
  optionsContainerStyle = {},
  defaultValueIndex = 0,
  defaultPlaceholder,
  placeholderStyle = {},
  selectStyle = {},
}) => {
  const classes = useStyles();

  const [isOpened, setIsOpened] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setIsOpened(false)}>
      <div style={{ position: "relative", ...style }}>
        <div
          onClick={() => setIsOpened((val) => !val)}
          className={classes.select}
          style={selectStyle}
        >
          <span style={placeholderStyle} className={classes.label}>
            {options.find((option) => option.value === value)?.label ||
              options.find((option) => option.value === value)?.value ||
              defaultPlaceholder ||
              options[defaultValueIndex].label}
          </span>
          {isOpened ? (
            <ExpandLessIcon className={classes.icon} />
          ) : (
            <ExpandMoreIcon className={classes.icon} />
          )}
        </div>
        {isOpened && (
          <div
            style={optionsContainerStyle}
            className={classes.optionsContainer}
          >
            {options.map((option) => (
              <span
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpened(false);
                }}
                className={classes.label}
              >
                {option.label || option.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default memo(Select);
