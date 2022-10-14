import React from 'react';
import {
    RadioGroup, FormControlLabel, Radio, List, ListItem,
    Divider, Typography, Box, Select, MenuItem, FormControl
} from '@material-ui/core'
import { globalUtils, updateFormStore } from '../../utils';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

export const SelectSponsorshipOptions = (props) => {
    const { sponsorshipForm, sponsorshipOptions, handleDropdownChange } = props;

    const handleChange = (e) => {
        const { name, value } = e.target
        updateFormStore({ form: 'sponsorshipForm', field: name, value })
        if (_get(sponsorshipForm, 'selectedAmount.value')) {
            updateFormStore({ form: 'sponsorshipForm', field: 'selectedAmount', value: '' })
        }
    }


    return (
        <>
            <Typography component='h6' variant='subtitle2'>
                <Box fontWeight='normal' marginBottom='20px'>
                    Select a suitable sponsorship option
            </Box>
            </Typography >
            <RadioGroup
                aria-label={_get(sponsorshipForm, 'typeOfSponsorship.name')}
                name={_get(sponsorshipForm, 'typeOfSponsorship.name')}
                value={_get(sponsorshipForm, 'typeOfSponsorship.value')}
                onChange={handleChange}
                color='primary'
            >
                {
                    !_isEmpty(sponsorshipOptions) && sponsorshipOptions.map((option, key) => (
                        <>
                            <div className='main'>
                                <List>
                                    <ListItem id={key}>
                                        <FormControlLabel
                                            value={_get(option, 'id')}
                                            control={<Radio color='primary' />}
                                            label={(
                                                <div className='option-row'>
                                                    <div className='option'>
                                                        {_get(option, 'label')}
                                                    </div>
                                                    <div className='option'>
                                                        <FormControl>
                                                            <Select
                                                                labelId='demo-simple-select-label'
                                                                id='demo-simple-select'
                                                                value={_get(sponsorshipForm, 'typeOfSponsorship.value') === option.id && _get(sponsorshipForm, 'selectedDuration.value')}
                                                                onChange={(e) => handleDropdownChange(e, option)}
                                                                fullWidth
                                                                name={_get(sponsorshipForm, 'selectedDuration.name')}
                                                            >
                                                                {
                                                                    _get(option, 'duration.length', 0) > 0 && option.duration.map((val) => (
                                                                        <MenuItem value={val}>{val}</MenuItem>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className='option'>
                                                        {_get(sponsorshipForm, 'selectedAmount.value') && _get(sponsorshipForm, 'typeOfSponsorship.value') === option.id ?
                                                            `${globalUtils.getCountryProperty('currency')} ${_get(sponsorshipForm, 'selectedAmount.value')}`
                                                            : 'Select days to proceed'
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                            className='radio-option'
                                        />
                                    </ListItem>
                                </List>
                                <Divider />
                            </div>
                        </>
                    ))
                }
            </RadioGroup>
        </>
    )
}