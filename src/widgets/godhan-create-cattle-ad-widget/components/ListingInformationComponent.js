import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { listingInformationMapStateToProps, listingInformationMapDispatchToProps } from '../models';
import _get from 'lodash/get';
import _includes from 'lodash/includes';
import Input from "../../../components/Input-component/InputComponent";
import { updateFormStore, validateField } from '../../../utils';
import { FormLabel, FormControl, RadioGroup, FormControlLabel, Radio, Button, IconButton } from '@material-ui/core';
import TextArea from '../../../components/text-area/TextArea';
import { Camera, CameraResultType, CameraSource } from '@capacitor/core';
import { decode } from "base64-arraybuffer";
import { Input as InputComp } from "@material-ui/core";
import CameraAddIcon from "@material-ui/icons/CameraAltRounded";
import FileUploadRoundedIcon from '@material-ui/icons/AttachFile';
import CloseIcon from "@material-ui/icons/Close";

const ListingInformation = (props) => {
    const { listingForm, createNotification } = props;
    const inputRef = useRef(null);
    const [files, setFiles] = useState(_get(listingForm, "files.value") || []);


    const handleChange = (e) => {
        const { value, name } = e.target;
        updateFormStore({ form: "listingForm", field: name, value });
    };

    const handleBlur = (e) => {
        const { value, name } = e.target;
        validateField({ form: "listingForm", field: name, data: value });
    };

    const takePhoto = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Camera
        });
        const blob = new Blob([new Uint8Array(decode(image.base64String))], {
            type: `image/${image.format}`,
        });
        const file = new File([blob], "Name", {
            lastModified: new Date(),
            type: blob.type,
        });
        setFiles((currentFiles) => {
            const newFiles = [file, ...currentFiles];
            newFiles.length = 12;
            return newFiles;
        });
    }

    const handleRemove = (index) => {
        setFiles((currentFiles) => {
          const newFiles = [...currentFiles];
          newFiles[index] = null;
          return newFiles;
        });
      };
    

    const imageFromGallery = (e) => {
        if (
            e.target.files &&
            e.target.files.length > 0 &&
            _includes(e.target.files[0].type, "image")
        ) {

            if (e.target.files.length > 12) {
                createNotification({
                    message: 'You can add only 12 images', isSuccessful: false
                })
            } else {
                const selectedFiles = e.target.files;

                setFiles((currentFiles) => {
                    const newFiles = [...selectedFiles, ...currentFiles];
                    newFiles.length = 12;
                    return newFiles;
                });
            }
        }
    }


    return (
        <>
            <br />
            <div>
                <FormLabel className="form-label">{_get(listingForm, `productTitle.placeholder`)}</FormLabel>
                <Input
                    name={_get(listingForm, `productTitle.name`)}
                    placeholder={_get(listingForm, `productTitle.helperText`)}
                    value={_get(listingForm, `productTitle.value`)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!_get(listingForm, `productTitle.isValid`)}
                    errorText={
                        !_get(listingForm, `productTitle.isValid`) &&
                        _get(listingForm, `productTitle.errorText`)
                    }
                />
            </div>

            <div className="display-flex flex-row">
                <div>
                    <FormLabel className="form-label">{_get(listingForm, `listedPrice.placeholder`)}</FormLabel>
                    <Input
                        name={_get(listingForm, `listedPrice.name`)}
                        placeholder={_get(listingForm, `listedPrice.helperText`)}
                        value={_get(listingForm, `listedPrice.value`)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!_get(listingForm, `listedPrice.isValid`)}
                        errorText={
                            !_get(listingForm, `listedPrice.isValid`) &&
                            _get(listingForm, `listedPrice.errorText`)
                        }
                    />
                </div>
                <div className="display-flex flex-row" style={{ marginLeft: '10px', padding: '5px' }}>
                    <FormControl component='fieldset' className='dynamic-form-radio-group' color='primary'>
                        <FormLabel className="form-label">{_get(listingForm, `negotiable.placeholder`)}</FormLabel>
                        <RadioGroup
                            aria-label="negotiable"
                            row={true}
                            name={_get(listingForm, 'negotiable.name')}
                            value={_get(listingForm, 'negotiable.value')}
                            defaultValue={_get(listingForm, 'negotiable.value')}
                            onChange={handleChange}>
                            <div>
                                <FormControlLabel value="false" control={<Radio color="primary" />} label="No" />
                                <FormControlLabel value="true" control={<Radio color="primary" />} label="Yes" />

                            </div>
                        </RadioGroup>
                    </FormControl >
                </div>
            </div>
            <div className="display-flex flex-row">
                    <FormControl component='fieldset' className='dynamic-form-radio-group' color='primary'>
                        <FormLabel className="form-label">{_get(listingForm, `offeredBy.placeholder`)}</FormLabel>
                        <RadioGroup
                            aria-label="offeredBy"
                            row={true}
                            name={_get(listingForm, 'offeredBy.name')}
                            value={_get(listingForm, 'offeredBy.value')}
                            defaultValue={_get(listingForm, 'offeredBy.value')}
                            onChange={handleChange}>
                            <div>
                                <FormControlLabel value="false" control={<Radio color="primary" />} label="No" />
                                <FormControlLabel value="true" control={<Radio color="primary" />} label="Yes" />
                            </div>
                        </RadioGroup>
                    </FormControl >
                </div>
            <div>
                <FormLabel className="form-label">{_get(listingForm, `productDescription.placeholder`)}</FormLabel>
                <TextArea
                    name={_get(listingForm, `productDescription.name`)}
                    placeholder={_get(listingForm, `productDescription.helperText`)}
                    value={_get(listingForm, `productDescription.value`)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!_get(listingForm, `productDescription.isValid`)}
                    errorText={
                        !_get(listingForm, `productDescription.isValid`) &&
                        _get(listingForm, `productDescription.errorText`)
                    }
                    rows={3}
                />
            </div>
            <div>
                <span><FormLabel className="form-label">Add images of your cattle</FormLabel></span>
                <div>
                    <CameraAddIcon onClick={takePhoto} color="primary" />
                    <FileUploadRoundedIcon
                        onClick={() => inputRef.current?.click()}
                        color="primary"
                    />
                    <InputComp
                        type="file"
                        onChange={imageFromGallery}
                        inputRef={inputRef}
                        inputProps={{ multiple: true }}
                        hidden
                    />
                    {
                        files.map((file, i) => _get(file, 'name') && (
                            <div className="display-flex justify-content-between">
                                {_get(file, 'name')}
                                <IconButton
                                    onClick={() => handleRemove(i)}
                                    size="small"
                                    key={`icon_${i}`}
                                >
                                    <CloseIcon color="primary" />
                                </IconButton>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export const ListingInformationComponent = connect(listingInformationMapStateToProps, listingInformationMapDispatchToProps)(ListingInformation)