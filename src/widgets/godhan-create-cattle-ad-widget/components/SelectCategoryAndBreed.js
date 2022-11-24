import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectCategoryAndBreedMapDispatchToProps, selectCategoryAndBreedMapStateToProps } from '../models';
import { FormLabel, FormControl } from '@material-ui/core';
import _get from 'lodash/get';
import Select from '../../../components/Select/Select'
import { formConstants } from '../utils';

const SelectCategoryAndBreed = (props) => {
    const { sellData, wantedData, selectedListingType, listingForm, setFormData } = props;
    const [breedOptions, setBreedOptions] = useState([]);
    const categoryOptions = selectedListingType === 'Sell' ? sellData : wantedData;

    const handleCattleSelection = (value) => {
        const currentElement = categoryOptions.children.find((element) => element.id === value);
        if (currentElement) {
            setFormData({
                listingForm: {
                    ...listingForm,
                    selectedCattle: {
                        ...formConstants.listingForm.selectedCattle,
                        value
                    }, selectedCattleObject: {
                        ...formConstants.listingForm.selectedCattleObject,
                        value: { name: currentElement.name, value: currentElement.id }
                    },
                    selectedBreed: formConstants.listingForm.selectedBreed,
                    selectedBreedObject: formConstants.listingForm.selectedBreedObject
                }
            });
        }
        setBreedOptions(currentElement.children)
    }

    const handleBreedSelection = (value) => {
        const currentElement = breedOptions.find((element) => element.id === value);
        setFormData({
            listingForm: {
                ...listingForm,
                selectedBreed: { ...formConstants.listingForm.selectedBreed, value },
                selectedBreedObject: { ...formConstants.listingForm.selectedBreedObject, value: currentElement }
            }
        });
    }

    return (
        <>
            <FormLabel className="form-label">Choose the type of your cattle (*)</FormLabel>
            <br />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                {categoryOptions?.children &&
                    <Select
                        optionsContainerStyle={{ zIndex: 7 }}
                        placeholderStyle={{ width: 200 }}
                        style={{ marginBottom: 18 }}
                        value={_get(listingForm, 'selectedCattle.value', '')}
                        onChange={handleCattleSelection}
                        options={[
                            { label: "All Cattle", value: '' },
                            ...categoryOptions.children.map((option) => ({
                                label: option.name,
                                value: option.id,
                            })),
                        ]}
                        defaultPlaceholder="All Cattle"
                        selectStyle={{ height: 40 }}
                    />}
            </FormControl>
            <br />
            <br />
            <FormLabel className="form-label">Select Breed of {_get(listingForm, 'selectedCattle.value.name')} (*)</FormLabel>
            <br />
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <Select
                    optionsContainerStyle={{ zIndex: 7 }}
                    placeholderStyle={{ width: 200 }}
                    style={{ marginBottom: 18 }}
                    value={_get(listingForm, 'selectedBreed.value', '')}
                    onChange={handleBreedSelection}
                    options={[
                        { label: "Select Breed", value: '' },
                        ...breedOptions.map((option) => ({
                            label: option.name,
                            value: option.id,
                        })),
                    ]}
                    defaultPlaceholder="Select Breed"
                    selectStyle={{ height: 40 }}
                />
            </FormControl>
            <br />
        </>
    )
}

export const SelectCategoryAndBreedComponent = connect(selectCategoryAndBreedMapStateToProps, selectCategoryAndBreedMapDispatchToProps)(SelectCategoryAndBreed);