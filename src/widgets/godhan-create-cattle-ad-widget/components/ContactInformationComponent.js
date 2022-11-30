import React from 'react';
import { connect } from 'react-redux'
import { contactInformationMapStateToProps, contactInformationMapDispatchToProps } from '../models';
import { Typography, Container, makeStyles, TextField, Box, Grid, Switch, FormLabel, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { updateFormStore, validateField } from '../../../utils';
import * as _ from 'lodash';
import { Link } from 'react-router-dom';
import { LocationComponent } from '../../../components';
import { isGoogleMapsEnabled } from "../../../configs/appsettings.json";
import { Geolocation } from '@capacitor/core';
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Input from '../../../components/Input-component/InputComponent';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '7rem',
        height: '7rem',
        border: `1px dotted ${theme.palette.secondary.main}`,
        display: 'flex'
    },
    icon: {
        width: '2rem',
        height: '2rem',
        margin: 'auto'
    },
    close: {
        position: 'absolute',
        zIndex: 1,
        // marginTop: '-2rem'
    },
    imageCard: {
        position: 'relative'
    },

}));

const ContactInformation = (props) => {
    const { listingForm, getUserDetails, fetchLocation, fetchLocationBySearch } = props;
    const classes = useStyles();

    const handleChange = (e) => {
        const { value, name } = e.target
        updateFormStore({ form: 'listingForm', field: name, value })
    }

    const handleBlur = (e) => {
        const { value, name } = e.target
        validateField({ form: 'listingForm', field: name, data: value })
    }

    const handleToggleChange = (e) => {
        const { checked, name } = e.target
        updateFormStore({ form: 'listingForm', field: name, value: checked })
    }

    const handleLocationChange = (value) => {
        if (isGoogleMapsEnabled) {
            updateFormStore({ form: "listingForm", field: "searchBy", value });
        } else if (value.length > 0 && value.length % 2 === 0) {
            fetchLocationBySearch({
                search: value,
            });
        }
    };

    const handleLocationSelect = (value) => {
        if (isGoogleMapsEnabled) {
            geocodeByAddress(value)
                .then(async (results) => {
                    const res = await getLatLng(results[0]);
                    if (!_.isEmpty(res)) {
                        try {
                            updateFormStore({
                                form: "listingForm",
                                field: "latitude",
                                value: _.get(res, "lat"),
                            });
                            updateFormStore({
                                form: "listingForm",
                                field: "longitude",
                                value: _.get(res, "lng"),
                            });
                            updateFormStore({
                                form: "listingForm",
                                field: "selectedLocation",
                                value,
                            });
                            updateFormStore({
                                form: "listingForm",
                                field: "searchBy",
                                value: value,
                            });
                        } catch (err) {
                            console.error("error updating location to store");
                        }
                    }
                })
                .catch((error) => console.error("Error", error));
        } else {
            if (!_.isEmpty(value)) {
                updateFormStore({
                    form: "listingForm",
                    field: "latitude",
                    value: _.get(value, "latitude"),
                });
                updateFormStore({
                    form: "listingForm",
                    field: "longitude",
                    value: _.get(value, "longitude"),
                });
                updateFormStore({
                    form: "listingForm",
                    field: "selectedLocation",
                    value: _.get(value, "area"),
                });
            }
        }
    };
    const handleCurrentLocationClick = async () => {
        try {
            const position = await Geolocation.getCurrentPosition();
            updateFormStore({
                form: "listingForm",
                field: "latitude",
                value: _.get(position, "coords.latitude"),
            });
            updateFormStore({
                form: "listingForm",
                field: "longitude",
                value: _.get(position, "coords.longitude"),
            });
            fetchLocation({
                latitude: _.get(position, "coords.latitude"),
                longitude: _.get(position, "coords.longitude"),
            });
        } catch (e) {
            window.alert("Search with location for better results");
        }
    };


    return (
        <>
            <Grid
                container
                alignItems="center"
                spacing={1}
            >
                <Grid item xs={12}>
                    <FormLabel className="form-label">Add a location for your listing</FormLabel>
                    <LocationComponent
                        userDetails={getUserDetails}
                        fetchLocation={fetchLocation}
                        formSearchByFieldValue={_.get(listingForm, "searchBy.value")}
                        handleChange={handleLocationChange}
                        handleSelect={handleLocationSelect}
                        placeholder="Set Location (*)"
                        useCurrentLocation
                        handleCurrentLocationClick={handleCurrentLocationClick}
                        style={{ marginBottom: 8 }}
                        inputStyle={{
                            paddingTop: 7,
                            paddingBottom: 7,
                        }}
                        containerStyle={classes.locationContainer}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormLabel className="form-label">Contact number</FormLabel>
                    <Input
                        name={_.get(listingForm, `contactNumber.name`)}
                        label={_.get(listingForm, `contactNumber.placeholder`)}
                        variant='outlined'
                        color='primary'
                        margin='normal'
                        fullWidth
                        disabled
                        value={_.get(listingForm, `contactNumber.value`)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={_.get(listingForm, `contactNumber.type`, 'text')}
                        error={!_.get(listingForm, `contactNumber.isValid`)}
                        helperText={!_.get(listingForm, `contactNumber.isValid`) && _.get(listingForm, `contactNumber.errorText`)}
                    />
                    <br />
                    {
                        _.get(listingForm, 'contactNumber.value') ? (
                            <>
                                <FormControl component='fieldset' className='dynamic-form-radio-group' color='primary'>
                                    <FormLabel className="form-label">{_.get(listingForm, `isNumberDisplayed.placeholder`)}</FormLabel>
                                    <RadioGroup
                                        aria-label="isNumberDisplayed"
                                        row={true}
                                        name={_.get(listingForm, 'isNumberDisplayed.name')}
                                        value={_.get(listingForm, 'isNumberDisplayed.value')}
                                        defaultValue={_.get(listingForm, 'isNumberDisplayed.value')}
                                        onChange={handleChange}>
                                        <div>
                                            <FormControlLabel value="false" control={<Radio color="primary" />} label="No" />
                                            <FormControlLabel value="true" control={<Radio color="primary" />} label="Yes" />
                                        </div>
                                    </RadioGroup>
                                </FormControl >
                            </>
                        ) : (
                                <Typography component='div' variant="div">
                                    Your phone number is not available.
                                        Update it <Link to="/profile"> here.</Link>
                                </Typography>
                            )
                    }
                </Grid>
                <Grid item xs={12}>
                    <FormLabel className="form-label">Email address</FormLabel>
                    <Input
                        name={_.get(listingForm, `contactEmail.name`)}
                        label={_.get(listingForm, `contactEmail.placeholder`)}
                        variant='outlined'
                        color='primary'
                        margin='normal'
                        fullWidth
                        disabled
                        value={_.get(listingForm, `contactEmail.value`)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={_.get(listingForm, `contactEmail.type`, 'text')}
                        error={!_.get(listingForm, `contactEmail.isValid`)}
                        helperText={!_.get(listingForm, `contactEmail.isValid`) && _.get(listingForm, `contactEmail.errorText`)}
                    />
                    <br />
                    {
                        _.get(listingForm, 'contactEmail.value') ? (
                            <>
                                <FormControl component='fieldset' className='dynamic-form-radio-group' color='primary'>
                                    <FormLabel className="form-label">{_.get(listingForm, `isEmailDisplayed.placeholder`)}</FormLabel>
                                    <RadioGroup
                                        aria-label="isEmailDisplayed"
                                        row={true}
                                        name={_.get(listingForm, 'isEmailDisplayed.name')}
                                        value={_.get(listingForm, 'isEmailDisplayed.value')}
                                        defaultValue={_.get(listingForm, 'isEmailDisplayed.value')}
                                        onChange={handleChange}>
                                        <div>
                                            <FormControlLabel value="false" control={<Radio color="primary" />} label="No" />
                                            <FormControlLabel value="true" control={<Radio color="primary" />} label="Yes" />
                                        </div>
                                    </RadioGroup>
                                </FormControl >
                            </>
                        ) : (
                                <Typography component='div' variant="div">
                                    <p>Your email address is not available.
                                        Update it <Link to="/profile"> here.</Link> </p>
                                </Typography>
                            )
                    }
                </Grid>
            </Grid>
        </>
    )
}

export const ContactInformationComponent = connect(contactInformationMapStateToProps, contactInformationMapDispatchToProps)(ContactInformation);