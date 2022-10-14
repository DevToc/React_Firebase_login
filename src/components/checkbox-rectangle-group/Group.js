import React, { memo } from "react";
import CheckboxRectangle from "../CheckboxRectangle/CheckboxRectangle";
import Grid from "@material-ui/core/Grid";

const Group = ({ onChange, options, value, boxStyle }) => (
  <Grid spacing={3} container>
    {options.map((option) => (
      <Grid key={option.value} item xs={6}>
        <CheckboxRectangle
          style={boxStyle}
          label={option.label || option.value}
          onChange={() => onChange(option.value)}
          checked={value === option.value}
        />
      </Grid>
    ))}
  </Grid>
);

export default memo(Group);
