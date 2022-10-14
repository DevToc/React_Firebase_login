import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import MyLocationIcon from "@material-ui/icons/LocationOnOutlined";

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        alignItems: 'center',
        display: 'flex',
        height: '95%',
        padding: '0px',
        borderRadius: '4px',
        border: '1.5px solid lightgray',
        boxShadow: 'none'
    },
    iconButton: {
        padding: 10,
    }
}))
export const LocationAutoCompleteComponent = (props) => {
    const classes = useStyles();
    const { formSearchByFieldValue = "", handleChange, handleSelect, handleClick } = props;
    // these options will bias the autocomplete predictions toward Canada,
    // and limit the results to addresses only
    const searchOptions = {
        componentRestrictions: { country: ['ca'] },
        types: ['geocode']
    }
    return (
        <>
            <PlacesAutocomplete
                value={formSearchByFieldValue}
                onChange={handleChange}
                onSelect={handleSelect}
                searchOptions={searchOptions}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <>
                        <Paper component="div" className={classes.inputRoot}>
                            <IconButton className={classes.iconButton} aria-label="menu" onClick={handleClick}>
                                <MyLocationIcon />
                            </IconButton>
                            <TextField
                                id="location"
                                name="location"
                                label=""
                                placeholder="Search Places ..."
                                variant='outlined'
                                color='primary'
                                fullWidth={!!window.screen.width < 700}
                                type="text"
                                className="all-categories-field"
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                })}
                            />
                        </Paper>

                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </PlacesAutocomplete>
        </>
    )
}