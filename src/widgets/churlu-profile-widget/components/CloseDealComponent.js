import React from 'react';
import { connect } from 'react-redux';
import { closeDealMapDispatchToProps, closeDealMapStateToProps } from '../models'
import { Button } from '@material-ui/core';

const CloseDealComponent = (props) => {

    // const { } = props; 

    const handleSubmit = () => {

    }

    return (
        <>
            <Button
                type='submit'
                variant='outlined'
                color='secondary'
                size='medium'
                aria-label='log in'
                onClick={handleSubmit}
              >Close Listing</Button>
        </>
    )
}

export const CloseDeal = connect(closeDealMapStateToProps, closeDealMapDispatchToProps)(CloseDealComponent)