import React, { useState, memo } from "react";
import { Slider, withStyles } from "@material-ui/core";
import { globalUtils } from "../../utils";

const IOSSlider = withStyles({
  root: {
    color: "#3880ff",
    height: 2,
    padding: "15px 0",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "1px solid #224214",

    marginTop: -7,
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 2px)",
    top: -30,
    "& *": {
      background: "white",
      color: "black",
      fontSize: 16,
    },
  },
  track: {
    height: 7,
    backgroundColor: "#224214",
    borderRadius: 30,
  },
  rail: {
    height: 7,
    opacity: 0.5,
    backgroundColor: "#C4C4C4",
    borderRadius: 30,
  },
})(Slider);

const IOSSliderTransparentLabel = withStyles({
  root: {
    color: "#3880ff",
    height: 2,
    padding: "15px 0",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "1px solid #224214",

    marginTop: -7,
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 2px)",
    top: -30,
    "& *": {
      background: "transparent",
      color: "white",
      fontSize: 16,
    },
  },
  track: {
    height: 7,
    backgroundColor: "#224214",
    borderRadius: 30,
  },
  rail: {
    height: 7,
    opacity: 0.5,
    backgroundColor: "#C4C4C4",
    borderRadius: 30,
  },
})(Slider);

const Range = ({
  min = 0,
  max = 100,
  onChange,
  value,
  moneyValueLabel = false,
  plusValueLabel = false,
  transparentLabel,
  oneThumb = false,
  style = {},
}) => {
  if (!oneThumb && typeof value[0] === "string" && typeof value[1] === "string")
    value = null;

  const [rangeValue, setRangeValue] = useState(
    value || (oneThumb ? 0 : [parseInt(min, 10), parseInt(max, 10)])
  );

  const getValueLabel = (value) => {
    let newVal = value;

    if (plusValueLabel && newVal === max) newVal += "+";
    if (moneyValueLabel) newVal += globalUtils.getCountryProperty("currency");

    return newVal;
  };

  return transparentLabel ? (
    <IOSSliderTransparentLabel
      style={style}
      min={min}
      max={max}
      value={rangeValue}
      onChange={(e, val) => setRangeValue(val)}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      onChangeCommitted={onChange}
      valueLabelFormat={getValueLabel}
    />
  ) : (
    <IOSSlider
      style={style}
      min={min}
      max={max}
      value={rangeValue}
      onChange={(e, val) => setRangeValue(val)}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      onChangeCommitted={onChange}
      valueLabelFormat={getValueLabel}
    />
  );
};

export default memo(Range);
