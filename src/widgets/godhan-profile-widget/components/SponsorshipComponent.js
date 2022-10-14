import React from 'react';
import { connect } from 'react-redux'
import { sponsorshipMapDispatchToProps, sponsorshipMapStateToProps } from '../models'
import { SelectSponsorshipOptions, MakePayment } from '../../../components';
import { Typography, Box, useTheme, Button } from '@material-ui/core';
import styled from 'styled-components'
import { updateFormStore } from '../../../utils';
import _get from 'lodash/get';

const Sponsorship = (props) => {

    const {
        sponsorshipOptions, sponsorshipForm, userId, productId, 
        userName, setSponsorship, postPayment, setSelectedOption
    } = props;

    const handleDropdownChange = (e, option) => {
        const { value, name } = e.target
        updateFormStore({ form: 'sponsorshipForm', field: name, value });
        updateFormStore({ form: 'sponsorshipForm', field: 'typeOfSponsorship', value: option.id })
        updateFormStore({ form: 'sponsorshipForm', field: 'selectedAmount', value: (parseInt(value) * parseInt(option.amount)) })
    }

    const handleCancel = () => setSponsorship(false)

    const handleSuccess = () => setSelectedOption({ id: 'previouslyListedItems' })
    return (
        <>
            <StyledSponsorshipComponent theme={useTheme()}>
                <Typography component='h1' variant='h5'>
                    <Box fontWeight='bold' component='span'>
                        Sponsor your Listing
                </Box>
                </Typography>
                <SelectSponsorshipOptions
                    sponsorshipOptions={sponsorshipOptions}
                    sponsorshipForm={sponsorshipForm}
                    handleDropdownChange={handleDropdownChange}
                />

                <div className="button-component">
                    <Button
                        type='submit'
                        variant='outlined'
                        color='secondary'
                        size='large'
                        aria-label='cancel'
                        fullWidth
                        onClick={handleCancel}
                        className='cancel-button'
                    >
                        Cancel
                    </Button>
                    {
                        !_get(sponsorshipForm, 'selectedAmount.value')
                            || !_get(sponsorshipForm, 'typeOfSponsorship.value')
                            || !_get(sponsorshipForm, 'selectedDuration.value')
                            ? (
                                <Button
                                    type='submit'
                                    variant='outlined'
                                    color='primary'
                                    size='large'
                                    aria-label='cancel'
                                    fullWidth
                                    className='cancel-button'
                                    disabled
                                >
                                    Pay now
                            </Button>
                            ) : (
                                <MakePayment
                                    sponsorshipForm={sponsorshipForm}
                                    price={_get(sponsorshipForm, 'selectedAmount.value')}
                                    userId={userId}
                                    productId={productId}
                                    userName={userName}
                                    postPayment={postPayment}
                                    onSuccess={handleSuccess}
                                />
                            )
                    }
                </div>
            </StyledSponsorshipComponent>
        </>
    );
    }

    const StyledSponsorshipComponent = styled.div`
.button-component{
  display: flex;
  .cancel-button{
    margin-right: 10px;
  }
  span{
    width: 100%;  
  }

}
.radio-option {
    text - decoration: blink;
    color: #484848;
    font-weight: bold;
    .option-row{
        display: table;
        width: 100%;
        table-layout: fixed;
        .option{
            display: table-cell;
            text-align: center;
        }
    }
  }
  .main {
    background: aliceblue;
    margin-bottom: 5px;
  }
  .MuiListItemIcon-root {
    color: ${(props) => props.theme.palette.primary.main};
  }`


    export const SponsorshipComponent = connect(sponsorshipMapStateToProps, sponsorshipMapDispatchToProps)(Sponsorship)
