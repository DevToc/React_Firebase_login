import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { useHistory } from "react-router-dom";
import { errorMapStateToProps, errorMapDispatchToProps } from './Error.model';
import { ModalComponent } from '../modal-component/Modal';
import { globalUtils } from '../../utils';

const ErrorHandler = (props) => {
    const { 
        isErrorExists, clearError, errorMessage, isSuccessful = false, isCancelAvailable,
        onCancel, handleClose
    } = props;
    const [isOpen, setOpen] = useState(false);
    // const history = useHistory();

    useEffect(() => {
        if (isErrorExists && !isOpen) {
            setOpen(true);
        }
        // eslint-disable-next-line
    }, [isErrorExists]);

    const handleCloseClick = () => {
        setOpen(false);
        clearError();
        handleClose()
        // history.goBack()
    }


    const handleCancelClick = () => {
        setOpen(false);
        clearError();
        onCancel()
    }
    return (
        <>
            <ModalComponent
                open={isOpen}
                setOpen={handleCloseClick}
                message={errorMessage || `Something went wrong. Please try again later. If the issue persists, please email us at ${globalUtils.getCountryProperty("email")}`}
                handleCloseClick={handleCloseClick}
                buttonLabel={isSuccessful? "OK": "Go Back"}
                background={isSuccessful ? "rgb(140, 69, 11, 0.2)": "rgba(211, 35, 35, 0.2)"}
                buttonColor={isSuccessful ? "#8c450b" : "#D32323"}
                isCancelAvailable={isCancelAvailable}
                handleCancel={handleCancelClick}
            >
            </ModalComponent>
        </>
    )
}

export const ErrorComponent = connect(errorMapStateToProps, errorMapDispatchToProps)(ErrorHandler);