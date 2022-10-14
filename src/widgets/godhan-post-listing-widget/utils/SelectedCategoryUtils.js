import React from 'react'
import { Card, Typography } from '@material-ui/core'
import * as _ from 'lodash'
import { globalUtils, updateFormStore } from '../../../utils'


const handleClearLocation = (clearLocation) => {
    updateFormStore({ form: 'listingForm', field: 'selectedLocation', value: null });
    updateFormStore({ form: 'listingForm', field: 'searchBy', value: '' });
    clearLocation()
}
export const getTask = (classes, selectedListingType, selectedLocation, currentLocation, handleClick = "", isChangeComponent = false, clearLocation) => (
    <>
        <Card className="card">
            <Typography component='h6' variant='span' className={classes.root}>
                <span className="selectedCategoryHeader">Type:  &nbsp;</span>
                <span className={classes.selectedValue}>{selectedListingType || 'None'}</span>
                {isChangeComponent && selectedListingType &&
                    <span className="clear" onClick={() => updateFormStore({ form: 'listingForm', field: 'selectedListingType', value: '' })}>X </span>}
            </Typography>
            <Typography component='h6' variant='span' className={classes.root}>
                <span className="selectedCategoryHeader">Location: &nbsp;</span>
                <span className={classes.selectedValue}>{currentLocation || selectedLocation || 'None'}</span>
                {isChangeComponent && (currentLocation || selectedLocation) &&
                    <span className="clear" onClick={() => handleClearLocation(clearLocation)}>X </span>}
            </Typography>
            {
                handleClick && (
                    <Typography component='h6' variant='span' className={classes.link} onClick={handleClick}>
                        <span className="selectedCategoryHeader">Change</span>
                    </Typography>
                )
            }
        </Card>
    </>
)

export const getSell = (classes, selectedListingType, listingForm, currentLocation, selectedLocation, handleClick = "", isChangeComponent = false, clearLocation) => (
    <>
        <Card className="card">

            <Typography component='h6' variant='span' className={classes.root}>
                <span className="selectedCategoryHeader">Type: &nbsp;</span>
                <span className={classes.selectedValue}>{selectedListingType}
                </span>
                {isChangeComponent && selectedListingType &&
                    <span className="clear" onClick={() => updateFormStore({ form: 'listingForm', field: 'selectedListingType', value: '' })}>X </span>}
            </Typography>
            <Typography component='h6' variant='span' className={classes.root}>
                <span className="selectedCategoryHeader">Category: &nbsp;</span>
                <span className={classes.selectedValue}>{_.get(listingForm, 'selectedCategoryName.value') || 'None'}</span>
                {isChangeComponent && _.get(listingForm, 'selectedCategoryName.value') &&
                    <span className="clear" onClick={() => updateFormStore({ form: 'listingForm', field: 'selectedCategoryName', value: '' })}>X </span>}
            </Typography>
            <Typography component='h6' variant='span' className={classes.root}>
                <span className="selectedCategoryHeader">Location: &nbsp;</span>
                <span className={classes.selectedValue}>{currentLocation || selectedLocation || 'None'}</span>
                {isChangeComponent && (currentLocation || selectedLocation) &&
                    <span className="clear" onClick={() => handleClearLocation(clearLocation)}>X </span>}
            </Typography>
            {
                handleClick && globalUtils.getCurrentPage() !== 'editListing' && (
                    <Typography component='h6' variant='span' className={classes.link} onClick={handleClick}>
                        <span className="selectedCategoryHeader">Change</span>
                    </Typography>
                )
            }
        </Card>
    </>
)
