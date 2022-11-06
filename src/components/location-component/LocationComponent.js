import React from "react";
import { Box, makeStyles, IconButton } from "@material-ui/core";
import GpsIcon from "@material-ui/icons/GpsFixed";

import PlacesAutocomplete from "react-places-autocomplete";
import * as _ from "lodash";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    border: "2px solid rgba(43, 87, 154, 0.7)",
    borderRadius: 5,
    width: "100%",
  },
  input: {
    width: "100%",
    backgroundColor: "transparent",
    marginLeft: 15,
    padding: "9px 0 9px 9px",
    color: "#344654",
    fontSize: 19,
    border: 0,
    outline: 0,
  },
  wrapper: {
    width: "100%",
    position: "relative",
  },
  label: {
    fontSize: 18,
    color: "#344654",
    fontWeight: "500",
    marginTop: 8,
    cursor: "pointer",
  },
  optionsContainer: {
    paddingLeft: 20,
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
}));

export const LocationComponent = ({
  formSearchByFieldValue,
  useCurrentLocation,
  left,
  style = {},
  inputStyle = {},
  placeholder = "Search Places ...",
  name = "location",
  handleChange,
  handleSelect,
  showLabel = false,
  disabled = false,
  handleCurrentLocationClick,
  containerStyle,
  renderInsteadOfInput,
  userDetails,
  isSearchBySelectedLocation = true
}) => {
  const classes = useStyles();

  // these options will bias the autocomplete predictions toward a particular country,
  const countryCode = "IN";
  let searchOptions = {
    type: ['geocode']
  };
  if(isSearchBySelectedLocation){
    searchOptions = {
      ...searchOptions,
      componentRestrictions: { country: [countryCode] },
    }
  }

  return (
    <>
      {showLabel && (
        <h5 className="form-label">
          <Box component="span">Set Location</Box>
        </h5>
      )}
      <PlacesAutocomplete
        value={formSearchByFieldValue}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={style} className={classes.wrapper}>
            <div className={`${classes.container} ${containerStyle}`}>
              {left && left}
              {renderInsteadOfInput ? (
                renderInsteadOfInput
              ) : (
                <input
                  style={{ marginLeft: left ? 0 : 15, ...inputStyle }}
                  type="text"
                  name={name}
                  placeholder={placeholder}
                  className={classes.input}
                  {...getInputProps({
                    placeholder: placeholder,
                    className: classes.input,
                  })}
                  disabled={disabled}
                />
              )}

              {useCurrentLocation && (
                <IconButton
                  style={{ padding: 7 }}
                  onClick={handleCurrentLocationClick}
                >
                  <GpsIcon />
                </IconButton>
              )}
            </div>
            {handleSelect && suggestions.length > 0 && (
              <div className={classes.optionsContainer}>
                {loading && <span className={classes.label}>Loading...</span>}
                {suggestions.map((suggestion) => {
                  return (
                    <div {...getSuggestionItemProps(suggestion, {})}>
                      <span className={classes.label}>
                        {suggestion.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
};
