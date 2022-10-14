import React from 'react';
import { connect } from 'react-redux'
import { categorySelectionButtonMapStateToProps, categorySelectionButtonMapDispatchToProps } from '../models';
import * as _ from 'lodash'
import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { globalUtils } from '../../../utils';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '5rem'
    },
    cancelButton: {
        marginRight: '2rem',
        backgroundColor: 'white'
    }
})


const CategorySelectionButtonComponent = (props) => {
    const { listingForm, currentLocation, selectedLocation, updateState} = props;

    const classes = useStyles();

    const isDisabled = () => (
        !_.get(listingForm, 'selectedListingType.value.id') || !_.get(listingForm, 'selectedCategory.value') 
        || !(currentLocation || selectedLocation || _.get(listingForm, 'latitude.value') || _.get(listingForm, 'longitude.value'))
    )

    const handleClick = () => {
        globalUtils.scrollTo("listing-header", 'auto');
        updateState('renderedOption', 1)
    }

    return _.get(listingForm, 'selectedListingType.value.id') ? (
        <>
            <div className={classes.root}>
                <Button
                    type='submit'
                    variant='outlined'
                    color='secondary'
                    size='large'
                    aria-label='cancel'
                    fullWidth
                    className={classes.cancelButton}
                >
                    <Link to="/">
                        Cancel
                    </Link>
                </Button>
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='large'
                    aria-label='log in'
                    fullWidth
                    disabled={isDisabled()}
                    onClick={handleClick}
                    key={`${isDisabled()}`}
                >
                    Next
              </Button>
            </div>
        </>
    ) : (<> </>)
}

export const CategorySelectionButton = connect(categorySelectionButtonMapStateToProps, categorySelectionButtonMapDispatchToProps)(CategorySelectionButtonComponent);
