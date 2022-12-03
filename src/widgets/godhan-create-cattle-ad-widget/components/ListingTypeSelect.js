import React from 'react';
import {
    FormControl, Hidden,
    FormLabel, RadioGroup, FormControlLabel, Radio,
} from '@material-ui/core';
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import { listingTypeSelectMapStateToProps, listingTypeSelectMapDispatchToProps } from '../models';
import { connect } from 'react-redux';
import { updateFormStore } from "../../../utils";

const ListingTypeSelect = (props) => {

    const { listingForm } = props;
    const availableOptions = [
        {
            id: 'Sell',
            label: 'Sell',
            description: "Sell your cattle"
        },
        {
            id: 'Wanted',
            label: 'Wanted',
            description: 'Want to buy cattle'
        }
    ];

    const handleChange = (e) => {
        const { value } = e.target
        updateFormStore({ form: "listingForm", field: "selectedListingType", value });
    }

    return (
        <>
            <FormControl component='fieldset' className='dynamic-form-radio-group' color='primary'>
                <RadioGroup
                    aria-label="selectedListingType"
                    row={true}
                    name={_get(listingForm, 'selectedListingType.name')}
                    value={_get(listingForm, 'selectedListingType.value')}
                    defaultValue={_get(listingForm, 'selectedListingType.value')}
                    onChange={handleChange}>
                    {
                        !_isEmpty(availableOptions) && availableOptions.map((option) => (
                            <div>
                                <FormControlLabel value={option.id} control={<Radio color="primary" />} label={_get(option, 'description')} />
                            </div>
                        ))
                    }
                </RadioGroup>
            </FormControl >
        </>
    )
}

export const ListingTypeSelectComponent = connect(listingTypeSelectMapStateToProps, listingTypeSelectMapDispatchToProps)(ListingTypeSelect)