import React, { memo } from "react";
import { makeStyles } from "@material-ui/core";
import { globalUtils } from "../../utils";

const useStyles = makeStyles({
  textarea: {
    width: "100%",
    padding: "15px 9px",
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 15,
    border: "2px solid #224214",
    borderRadius: 5,
    color: "rgba(0, 0, 0, 0.76)",
    backgroundColor: "white",
    outline: "none",
  },
  textareaError: {
    width: "100%",
    padding: "15px 9px",
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 15,
    border: "2px solid #224214",
    borderRadius: 5,
    color: "red",
    backgroundColor: "white",
    outline: "none",
  },
  wrapper: {
    width: "100%",
  },
  errorText: {
    color: "red",
  },
});

const TextArea = ({
  value = "",
  onChange,
  style = {},
  placeholder = "",
  name = "",
  onBlur,
  error,
  errorText,
  rows,
  columns,
  id,
}) => {
  const classes = useStyles();

  const handleFocus = () => {
    const elem = id || name;
    if (elem) {
      globalUtils.scrollTo(elem, "auto");
      setTimeout(() => {
        window.scrollBy({ top: -80 });
      }, 11);
    }
  };

  return (
    <div className={classes.wrapper}>
      <textarea
        onFocus={handleFocus}
        name={name}
        style={style}
        value={value}
        onChange={onChange}
        className={classes.textarea}
        placeholder={placeholder}
        rows={rows}
        cols={columns}
        onBlur={onBlur}
        id={id || name}
      />

      <span className={classes.errorText}>
        {error && errorText && errorText}
      </span>
    </div>
  );
};

export default memo(TextArea);
