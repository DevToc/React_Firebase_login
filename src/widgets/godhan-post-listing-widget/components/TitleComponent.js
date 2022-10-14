import React from 'react';
import { Typography, Box, makeStyles, Divider } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { globalUtils } from '../../../utils';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    buttonHeading: {
        display: 'contents'
    },
    title: {
        justifyContent: 'center'
    },
    headerSection: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '2rem'
    },

}))


export const TitleComponent = ({ renderedOption, updateState }) => {
    const classes = useStyles()

    return (
        <>
            <div className={classes.headerSection}>
                {
                    renderedOption > 0 && globalUtils.getCurrentPage() !== 'editListing' && (
                        <ArrowBackIcon
                            color="primary"
                            className="pointer-cursor"
                            onClick={() => {
                                updateState('renderedOption', 0);
                                updateState('isChangeComponent', true);
                            }}
                        />
                    )
                }
                <Typography component='h1' variant='h4' className={classes.root} id="listing-header">
                    <Box fontWeight='bold' component='span' className={classes.buttonHeading}>

                        <span className={classes.title}>ADD A NEW LISTING</span>
                    </Box>
                </Typography>

            </div>
            <Divider variant='middle' />
            <br />
        </>
    )
}