import React from 'react';
import { connect } from 'react-redux'
import { ticketTrackingMapDispatchToProps, ticketTrackingMapStateToProps } from '../models'
import { Typography, Box, useTheme, Table, TableContainer, makeStyles, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get'
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { trackingTableHeaders } from '../utils';
import { globalUtils } from '../../../utils';
import { viewProfileStyle } from '../style'

const useStyles = makeStyles({
    table: {
        //   minWidth: 650,
    },
});

const TicketTrackingComponent = (props) => {
    const { ticketList, setAuxiliaryOption, setSelectedOption } = props;
    const classes = useStyles();

    return (
        <ViewProfileStyle theme={useTheme()}>
                <div className="edit-profile-component" id="ticket-tracking">
                    <div className='profile-header-component'>
                        <ArrowBackIcon
                            color='primary'
                            className="pointer-cursor margin-top-arrow-profile"
                            onClick={() => {
                                setAuxiliaryOption(0)
                                setSelectedOption(3);
                            }}
                        />
                        <Typography component='h1' variant='h5'>
                            <Box fontWeight='bold' component='span'>Track your tickets here</Box>
                        </Typography>
                    </div>
                    <div className="tracking-body">
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="caption table">
                                <caption>Please contact {globalUtils.getCountryProperty('email')} in case of any concerns</caption>
                                <TableHead>
                                    <TableRow>
                                        {trackingTableHeaders.map((header) => <TableCell>{header}</TableCell>)}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {!_isEmpty(ticketList) ? ticketList.map((ticket) => (
                                        <TableRow>
                                            <TableCell>{_get(ticket, 'id', '-')}</TableCell>
                                            <TableCell>{globalUtils.getFormattedDate(_get(ticket, 'ticketCreationDate', 'Not Available'), 'YYYY-MM-DDThh:mm:ss:000Z')}</TableCell>
                                            <TableCell>{globalUtils.getFormattedDate(_get(ticket, 'ticketLastUpdatedDate', 'Not Available'), 'YYYY-MM-DDThh:mm:ss:000Z')}</TableCell>
                                            <TableCell>{_get(ticket, 'type', 'Not Available')}</TableCell>
                                            <TableCell>{ticket.title || '-'}</TableCell>
                                        </TableRow>
                                    )) :
                                        <>
                                            <TableRow>
                                                <TableCell colSpan={5} align="center">No Results</TableCell>
                                            </TableRow>
                                        </>}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <br />
        </ViewProfileStyle>
    )
}

const ViewProfileStyle = viewProfileStyle;
export const TicketTracking = connect(ticketTrackingMapStateToProps, ticketTrackingMapDispatchToProps)(TicketTrackingComponent)