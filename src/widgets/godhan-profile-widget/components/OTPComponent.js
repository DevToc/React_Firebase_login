import React from 'react'
import { connect } from 'react-redux'
import _get from 'lodash/get'
import { Box, Button, Container, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import OtpInput from 'react-otp-input'
import { otpMapDispatchToProps, otpMapStateToProps } from '../models'
import { globalConstants, updateFormStore, validateField } from '../../../utils'
import { oTPStyle } from '../style'


const OTPComponent = (props) => {
    const {
        checkOtpValidity, resendOtp, otp, selectedProperty, selectedValue,
        setNotification, clearNotification
    } = props

    const postOtp = () => {
        clearNotification()
        updateFormStore({ form: 'otpForm', field: 'otp', value: otp });
        checkOtpValidity({
            [selectedProperty]: selectedValue,
            otp: _get(otp, 'value')
        })
        updateFormStore({ form: 'otpForm', field: 'otp', value: '' })

    }

    const resendOtpToNumber = () => {
        const payload = {};
        if (selectedProperty === 'email') {
            payload.email = selectedValue
        }
        if (selectedProperty === 'mobileNumber') {
            payload.mobileNumber = selectedValue
        }
        resendOtp({
            [selectedProperty]: selectedValue
        })
        setNotification({
            message: 'OTP Sent!',
            severity: globalConstants.notificationMessageSeverity.SUCCESS
        })
    }

    const handleChange = (otp) => {
        updateFormStore({ form: 'otpForm', field: 'otp', value: otp })
    }

    const handleBlur = (otp) => {
        validateField({ form: 'otpForm', field: 'otp', data: otp })
    }

    const isOtpButtonDisabled = () => (!_get(otp, 'value') || !_get(otp, 'isValid') || _get(otp, 'value.length', 0) !== 6)

    const handlePaste = (e) => {
        const clipboardData = e.clipboardData || e.originalEvent.clipboardData || window.clipboardData;
        const otp = clipboardData.getData('text');
        if(otp.length === 6){
          updateFormStore({ form: "otpForm", field: "otp", value: otp });
        }
    }

    const renderOtpComponent = () => (
        <Container component='main' maxWidth='xs'>
            <Typography component='h1' variant='h5'>
                <Box fontWeight='bold' component='span'>
                    Did you get your OTP?
                </Box>
            </Typography>
            <Typography component='h6' variant='subtitle2'>
                <Box fontWeight='normal'>Please enter the OTP you received</Box>
            </Typography>
            <br />
            <br />
            <div onPaste={handlePaste}>
                <OtpInput
                    numInputs={6}
                    inputStyle='otp-input'
                    containerStyle='otp-input-container'
                    focusStyle='otp-input--focused'
                    shouldAutoFocus
                    value={_get(otp, 'value')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!_get(otp, 'isValid')}
                    helperText={!_get(otp, 'isValid') && _get(otp, 'errorText')}
                />
            </div>
            {/* <Link to="/auth/signup"> */}
            <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                size='large'
                aria-label='submit-otp'
                disableElevation
                onClick={() => postOtp()}
                disabled={isOtpButtonDisabled()}
                key={`${isOtpButtonDisabled()}`}
            >
                Submit
            </Button>
            {/* </Link> */}
            <div className='resend-otp'>
                <p onClick={() => resendOtpToNumber()}>Did not receive it? Resend OTP</p>
            </div>
        </Container>
    )

    return (
        <StyledOTP theme={useTheme()}>
            {renderOtpComponent()}
        </StyledOTP>
    )
}

const StyledOTP = oTPStyle

export const OTP = connect(
    otpMapStateToProps,
    otpMapDispatchToProps
)(OTPComponent)
