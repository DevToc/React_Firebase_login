import React from 'react';
import { connect } from 'react-redux'
import { contactInformationMapStateToProps, contactInformationMapDispatchToProps } from '../models'
import { Typography, Container, makeStyles, TextField, Box, Grid, Switch } from '@material-ui/core';
import { updateFormStore, validateField } from '../../../utils';
import * as _ from 'lodash';
import { Link } from 'react-router-dom';

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
    contactInfoSection: {
        border: '1px solid lightgray',
        borderRadius: '4px',
        boxSizing: 'border-box',
        padding: '10px',
        marginBottom: '10px',
        marginTop: '15px'
    }
}));

const ContactInformationComponent = (props) => {
    const { listingForm } = props;
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


    return (
        <>
            <Container className={classes.container}>
                <Typography component="h6" variant="h6" className="">
                    <bold>Contact Information</bold>
                </Typography>
                <div className={classes.contactInfoSection}>

                    <Grid container alignItems='center' spacing={3}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <TextField
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

                            <Typography variant='body2' color='textSecondary' component='span' >
                                <Box fontWeight={500}>
                                    {_.get(listingForm, `contactNumber.helperText`)}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            {
                                _.get(listingForm, 'contactNumber.value') ? (
                                    <>
                                        <Typography component='h6' variant="h6">
                                            {_.get(listingForm, 'isNumberDisplayed.placeholder')}
                                        </Typography>
                                        <Grid component='label' container alignItems='center'>
                                            <Grid item>No</Grid>
                                            <Grid item>
                                                <Switch
                                                    checked={_.get(listingForm, 'isNumberDisplayed.value')}
                                                    onChange={handleToggleChange}
                                                    name={_.get(listingForm, 'isNumberDisplayed.name')}
                                                    color='primary'
                                                />
                                            </Grid>
                                            <Grid item>Yes</Grid>
                                        </Grid>
                                    </>
                                ) : (
                                        <Typography component='div' variant="div">
                                            Your phone number is not available.
                                        Update it <Link to="/profile"> here.</Link>
                                        </Typography>
                                    )
                            }
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <TextField
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

                            <Typography variant='body2' color='textSecondary' component='span' >
                                <Box fontWeight={500}>
                                    {_.get(listingForm, `contactEmail.helperText`)}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            {
                                _.get(listingForm, 'contactEmail.value') ? (
                                    <>

                                        <Typography component='h6' variant="h6">
                                            {_.get(listingForm, 'isEmailDisplayed.placeholder')}
                                        </Typography>

                                        <Grid component='label' container alignItems='center'>
                                            <Grid item>No</Grid>
                                            <Grid item>
                                                <Switch
                                                    checked={_.get(listingForm, 'isEmailDisplayed.value')}
                                                    onChange={handleToggleChange}
                                                    name={_.get(listingForm, 'isEmailDisplayed.name')}
                                                    color='primary'
                                                />
                                            </Grid>
                                            <Grid item>Yes</Grid>
                                        </Grid>
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
                </div>

            </Container>
        </>
    )
}

export const ContactInformation = connect(contactInformationMapStateToProps, contactInformationMapDispatchToProps)(ContactInformationComponent);

