import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { cattleInformationMapStateToProps, cattleInformationMapDispatchToProps } from '../models';
import { FormLabel, FormControl } from '@material-ui/core';
import _get from 'lodash/get';
import { updateFormStore, validateField, updateFormProperty } from '../../../utils';
import Input from '../../../components/Input-component/InputComponent';
import Select from "../../../components/Select/Select";
import { femaleCattle } from '../utils';
import { validationExp } from '../../../utils/form-validators/FormValidations';

const CattleInformation = (props) => {
    const { listingForm } = props;
    const [isCattleFemale, setCattleFemale] = useState(false);

    useEffect(() => {
        const femaleCattleFound = femaleCattle.find((el) => el === _get(listingForm, "selectedCattleObject.value.name"))
        if (femaleCattleFound) {
            setCattleFemale(true)
        }
    }, [])
    const handleChange = (e) => {
        const { value, name } = e.target;
        updateFormStore({ form: "listingForm", field: name, value });
    };

    const handleBlur = (e) => {
        const { value, name } = e.target;
        if (value && !new RegExp(validationExp.ISAMOUNT).test(value)) {
            updateFormProperty({ form: "listingForm", field: name, property: "isValid", value: false, });
            return;
        }
        validateField({ form: "listingForm", field: name, data: value });
    };

    const handleSelectChange = (value) => {
        updateFormStore({ form: "listingForm", field: 'babiesCount', value });
    }

    return (
        <>
            <div>
                <div>
                    <FormLabel className="form-label">{_get(listingForm, `averageWeight.placeholder`)}</FormLabel>
                    <Input
                        name={_get(listingForm, `averageWeight.name`)}
                        placeholder={_get(listingForm, `averageWeight.helperText`)}
                        value={_get(listingForm, `averageWeight.value`)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!_get(listingForm, `averageWeight.isValid`)}
                        errorText={
                            !_get(listingForm, `averageWeight.isValid`) &&
                            _get(listingForm, `averageWeight.errorText`)
                        }
                    />
                </div>
                <div>
                    <FormLabel className="form-label">{_get(listingForm, `averageAge.placeholder`)}</FormLabel>
                    <Input
                        name={_get(listingForm, `averageAge.name`)}
                        placeholder={_get(listingForm, `averageAge.helperText`)}
                        value={_get(listingForm, `averageAge.value`)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!_get(listingForm, `averageAge.isValid`)}
                        errorText={
                            !_get(listingForm, `averageAge.isValid`) &&
                            _get(listingForm, `averageAge.errorText`)
                        }
                    />
                </div>
                <div>
                    <FormLabel className="form-label">{_get(listingForm, `averageBirthWeight.placeholder`)}</FormLabel>
                    <Input
                        name={_get(listingForm, `averageBirthWeight.name`)}
                        placeholder={_get(listingForm, `averageBirthWeight.helperText`)}
                        value={_get(listingForm, `averageBirthWeight.value`)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!_get(listingForm, `averageBirthWeight.isValid`)}
                        errorText={
                            !_get(listingForm, `averageBirthWeight.isValid`) &&
                            _get(listingForm, `averageBirthWeight.errorText`)
                        }
                    />
                </div>
                {
                    isCattleFemale && (
                        <div>
                            <FormLabel className="form-label">{_get(listingForm, `babiesCount.placeholder`)}</FormLabel>
                            <FormControl className="w-100">
                                <Select
                                    optionsContainerStyle={{ zIndex: 7 }}
                                    placeholderStyle={{ width: 200 }}
                                    style={{ marginBottom: 18 }}
                                    value={_get(listingForm, 'babiesCount.value', '')}
                                    onChange={handleSelectChange}
                                    options={[
                                        { label: "Select Breed", value: '' },
                                        ..._get(listingForm, 'babiesCount.options', '').map((option) => ({
                                            label: option,
                                            value: option,
                                        })),
                                    ]}
                                    defaultPlaceholder="Select"
                                    selectStyle={{ height: 40 }}
                                />
                            </FormControl>
                            <div>
                                <FormLabel className="form-label">{_get(listingForm, `milkStatus.placeholder`)}</FormLabel>
                                <Input
                                    name={_get(listingForm, `milkStatus.name`)}
                                    placeholder={_get(listingForm, `milkStatus.helperText`)}
                                    value={_get(listingForm, `milkStatus.value`)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!_get(listingForm, `milkStatus.isValid`)}
                                    errorText={
                                        !_get(listingForm, `milkStatus.isValid`) &&
                                        _get(listingForm, `milkStatus.errorText`)
                                    }
                                />
                            </div>
                            <div>
                                <FormLabel className="form-label">{_get(listingForm, `dailyMilkCapacity.placeholder`)}</FormLabel>
                                <Input
                                    name={_get(listingForm, `dailyMilkCapacity.name`)}
                                    placeholder={_get(listingForm, `dailyMilkCapacity.helperText`)}
                                    value={_get(listingForm, `dailyMilkCapacity.value`)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!_get(listingForm, `dailyMilkCapacity.isValid`)}
                                    errorText={
                                        !_get(listingForm, `dailyMilkCapacity.isValid`) &&
                                        _get(listingForm, `dailyMilkCapacity.errorText`)
                                    }
                                />
                            </div>
                        </div>
                    )
                }
                <br />
            </div>
        </>
    )
}

export const CattleInformationComponent = connect(cattleInformationMapStateToProps, cattleInformationMapDispatchToProps)(CattleInformation);