import React, { memo } from "react";
import { makeStyles } from "@material-ui/core";
import NumberFormat from "react-number-format";
import { globalUtils } from "../../utils";
// import { globalUtils } from "../../utils";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    border: "2px solid rgba(140, 69, 11, 0.7)",
    borderRadius: 5,
    width: "100%",
  },
  input: {
    width: "100%",
    backgroundColor: "transparent",
    // marginLeft: 15,
    padding: "9px 0 9px 9px",
    color: "#344654",
    // fontSize: 19,
    border: 0,
    outline: 0,
  },
  wrapper: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    color: "red",
  },
  disabledBox: {
    backgroundColor: "lightgray",
  },
});

const InputComponent = ({
  left,
  right,
  placeholder = "",
  value = "",
  onChange,
  type = "text",
  disabled = false,
  style = {},
  name = "",
  error,
  errorText,
  numberFormat = false,
  format,
  mask,
  onBlur,
  inputStyle = {},
  containerStyle = {},
  disabledWithoutGrayBg = false,
  onClick,
  id = "",
  isAutoComplete = "off",
}) => {
  const classes = useStyles();

  const handleFocus = () => {
    const elem = id || name;
    if (elem) {
      globalUtils.scrollTo(elem, "auto");
      setTimeout(() => {
        window.scrollBy({ top: -140 });
      }, 11);
    }
  };

  return (
    <div
      onClick={onClick ? onClick : null}
      style={style}
      className={classes.wrapper}
    >
      <div
        style={
          error ? { ...containerStyle, borderColor: "red" } : containerStyle
        }
        className={`${classes.container} ${
          disabled && !disabledWithoutGrayBg ? classes.disabledBox : ""
        }`}
      >
        {left && left}
        {numberFormat ? (
          <NumberFormat
            mask={mask}
            format={format}
            style={error ? { ...inputStyle, color: "red" } : inputStyle}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e)}
            className={classes.input}
            pattern={type === "number" ? "\\d*" : null}
            type={type}
            disabled={disabled}
            onBlur={onBlur}
            id={id || name}
            onFocus={handleFocus}
          />
        ) : (
          <input
            style={error ? { ...inputStyle, color: "red" } : inputStyle}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={classes.input}
            type={type}
            disabled={disabled}
            onBlur={onBlur}
            id={id || name}
            onFocus={handleFocus}
            pattern={type === "number" ? "\\d*" : null}
            autoComplete={isAutoComplete}
            // onFocus={handleFocus}
            // onClick={handleFocus}
          />
        )}
        {right && right}
      </div>

      <span className={classes.errorText}>
        {error && errorText && errorText}
      </span>
    </div>
  );
};

export default memo(InputComponent);
