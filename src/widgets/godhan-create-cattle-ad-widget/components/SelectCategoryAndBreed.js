import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectCategoryAndBreedMapDispatchToProps, selectCategoryAndBreedMapStateToProps } from '../models';
import { Select, MenuItem, FormLabel, FormControl, InputLabel } from '@material-ui/core';
import _get from 'lodash/get';
import { updateFormStore } from '../../../utils';

const SelectCategoryAndBreed = (props) => {
    const { sellData, wantedData, selectedListingType, listingForm } = props;
    const [breedOptions, setBreedOptions] = useState([]);
    const handleCattleSelection = (e) => {
        updateFormStore({
            form: "listingForm", field: "selectedCattle", value: {
                name: e.target.value.name, value: e.target.value.id
            }
        });
        setBreedOptions(e.target.value.children);
        updateFormStore({ form: "listingForm", field: "selectedBreed", value: {} })
    }

    const handleBreedSelection = (e) => {
        updateFormStore({
            form: "listingForm", field: "selectedBreed", value: {
                name: e.target.value.name, value: e.target.value.id
            }
        })
    }
    const categoryOptions = selectedListingType === 'Sell' ? sellData : wantedData;

    return (
        <>
            <FormLabel className="form-label">Choose the type of your cattle (*)</FormLabel>
            <br />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                {categoryOptions.children && <Select
                    value={_get(listingForm, 'selectedCattle.value.name')}
                    onChange={handleCattleSelection}
                    // selectStyle={{ height: 40 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem aria-label="all" value="" disabled>All Cattle</MenuItem>
                    {categoryOptions.children && categoryOptions.children.map((val) => (
                        <MenuItem aria-label={val.id} value={val} name={val.name}>
                            {val.name}
                        </MenuItem>
                    ))}
                </Select>}
            </FormControl>
            <br />
            <br />
            <FormLabel className="form-label">Select Breed of {_get(listingForm, 'selectedCattle.value.name')} (*)</FormLabel>
            <br />
            <Select
                value={_get(listingForm, 'selectedBreed.value.name')}
                onChange={handleBreedSelection}
            // selectStyle={{ height: 40 }}
            >
                <MenuItem aria-label="all" value="" disabled>All Breeds</MenuItem>
                {breedOptions && breedOptions.map((val) => (
                    <MenuItem aria-label={val.id} value={val} name={val.name}>
                        {val.name}
                    </MenuItem>
                ))}
            </Select>
            <br />
        </>
    )
}

export const SelectCategoryAndBreedComponent = connect(selectCategoryAndBreedMapStateToProps, selectCategoryAndBreedMapDispatchToProps)(SelectCategoryAndBreed);