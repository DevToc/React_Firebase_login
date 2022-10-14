import React, { useState } from 'react';
import { connect } from 'react-redux';
import { itemActionMapStateToProps, itemActionsMapDispatchToProps } from '../models'
import {
    Typography, Box, FormControl, Hidden,
    FormLabel, RadioGroup, FormControlLabel, Radio, Button
} from '@material-ui/core';
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import { itemStatusesAvailable } from '../utils';
import { updateFormStore } from '../../../utils';
import _includes from 'lodash/includes'
import { SponsorshipComponent } from './SponsorshipComponent';

const ItemActionComponet = (props) => {
    const { sellerProfileForm, setSelectedOption, updateItemStatus, getSponsorshipOptions } = props;
    const [isSponsorship, setSponsorship] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormStore({ form: 'sellerProfileForm', field: name, value: value })
    }

    const handleSubmit = () => {
        if (_get(sellerProfileForm, 'selectedAction.value') === 'Extended') {
            getSponsorshipOptions();
            setSponsorship(true);
        }
        else {
            if (_get(sellerProfileForm, 'selectedAction.value')) {
                updateItemStatus({ status: _get(sellerProfileForm, 'selectedAction.value'), id: _get(sellerProfileForm, 'selectedItem.value.productID') })
            }
            setSelectedOption({ id: 'previouslyListedItems' })
        }
    }

    const getItemActions = () => (
        <div className="action-component">
            <div className='actions-header'>
                <Typography component='h1' variant='h6'>
                    <Box fontWeight='bold' component='span'>Update your listing</Box>
                </Typography>
            </div>
            <div className="action-body">
                <FormControl component='fieldset' className='dynamic-form-radio-group' color='primary'>
                    Your listing - {_get(sellerProfileForm, 'selectedItem.value.productTitle')}
                    <FormLabel component='legend'>Select one to proceed</FormLabel>
                    <RadioGroup
                        aria-label={_get(sellerProfileForm, 'selectedAction.name')}
                        name={_get(sellerProfileForm, 'selectedAction.name')}
                        value={_get(sellerProfileForm, 'selectedAction.value')}
                        onChange={handleChange}>
                        {
                            !_isEmpty(itemStatusesAvailable) && itemStatusesAvailable.map((option) => (
                                <div>
                                    {
                                        _includes(option.availableFor, _get(sellerProfileForm, 'selectedItem.value.listingStatus'))
                                        && (<>
                                            <FormControlLabel value={option.id} control={<Radio color="primary" />} label={_get(option, 'label')} />
                                            <Hidden smDown>
                                                <br />
                                                <FormLabel component='legend'>Note: {option.description}</FormLabel>
                                                <br />
                                            </Hidden>
                                        </>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="action-footer">
                <Button
                    type='submit'
                    variant='outlined'
                    color='secondary'
                    size='large'
                    aria-label='cancel'
                    fullWidth
                    onClick={() => setSelectedOption({ id: 'previouslyListedItems' })}
                    className='cancel-button'
                >
                    Cancel
              </Button>
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='large'
                    aria-label='log in'
                    fullWidth
                    disabled={!_get(sellerProfileForm, 'selectedAction.value')}
                    key={`${!_get(sellerProfileForm, 'selectedAction.value')}`}
                    onClick={handleSubmit}
                >
                    Submit
              </Button>
            </div>
        </div>
    );

    const getSponsorshipSection = () => (
        <>
            <SponsorshipComponent
                setSponsorship={setSponsorship}
                setSelectedOption={setSelectedOption}
            />
        </>
    );

    return (
        isSponsorship ? getSponsorshipSection() : getItemActions()
    )

}

export const ItemAction = connect(itemActionMapStateToProps, itemActionsMapDispatchToProps)(ItemActionComponet);