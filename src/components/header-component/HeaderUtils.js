import { Button, MenuItem, Typography, Card, Divider } from "@material-ui/core";
import React from 'react';
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty';
import * as services from '../../services';
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import Grid from '@material-ui/core/Grid';
import { notificationActions } from "../../services";
import PermIdentityTwoToneIcon from "@material-ui/icons/PermIdentityTwoTone";
const { itemActions, } = services


export const loginButtons = (classes) => (
    <>
        <Grid container spacing={1}>
            <Grid item xs={6}>

                <Link to="/login">
                    <Button size="middle" variant="contained" color="primary">Login</Button>
                </Link>
            </Grid>
            <Grid item xs={0}>
                <Link to="/signup">
                    <Button size="middle" variant="contained" color="primary">Join</Button>
                </Link>

            </Grid>
        </Grid>

    </>
)

export const headerMapStateToProps = (state) => ({
    sellData: _get(state, 'refData.sellData', {}),
    rentData: _get(state, 'refData.rentData', {}),
    wantedData: _get(state, 'refData.wantedData', {}),
    userDetails: _get(state, 'user.userData', {}),
    notificationList: _get(state, 'notification.userNotifications')
});

export const headerMapDispatchToProps = (dispatch) => ({
    fetchFilterOptions: (payload) =>
        dispatch(itemActions.fetchFilterOptions(payload)),
    fetchProductList: (payload) =>
        dispatch(itemActions.makeSearch(payload)),
    markAllNotificationsAsRead: (payload) =>
        dispatch(notificationActions.markAllNotificationsAsRead()),
    handleMarkAsRead: (payload) =>
        dispatch(notificationActions.markNotifAsRead(payload))
})

export const getMenuOptions = (options, handleClick, classes) => (
    !_isEmpty(options) && options.children.map((option, key) => (
        <>
            <Link to="/search" onClick={() => handleClick(option)}>
                <MenuItem id={key}>
                    <span className={classes.text}>{option.name}</span>
                </MenuItem>
            </Link>
        </>
    ))
);

export const renderHeader = (classes) => (
    <>
        <Link to="/" className={classes.loginButtons}>
            <img src="/assets/images/logo.png" alt="navBar" width="50" height="50" className={classes.logoImage} />
        </Link>
    </>
);

export const getProfile = (userDetails, handleSignOut, classes) => (
    <>
        <Card variant="outlined" className={classes.card}>
            <MenuItem>
                <PermIdentityTwoToneIcon color="primary" /> &nbsp;
                <span className={classes.textBlue}>{_get(userDetails, 'name')}</span>
            </MenuItem>
            <Divider variant='middle' />
            <Link to="/profile?type=previouslyListedItems">
                <MenuItem>
                    <ImageOutlinedIcon color="primary" /> &nbsp;
                    <span className={classes.textBlue}>My Listings</span>
                </MenuItem>
            </Link>

            <Divider variant='middle' />
            <Link to="/chat">
                <MenuItem>
                    <ChatBubbleOutlineOutlinedIcon color="primary" /> &nbsp;
                    <span className={classes.textBlue}>Inbox</span>
                </MenuItem>
            </Link>
            <Divider variant='middle' />
            <Link to="/profile?type=saveditems">
                <MenuItem>
                    <StarBorderOutlinedIcon color="primary" />  &nbsp;
                    <span className={classes.textBlue}>Saved Items</span>
                </MenuItem>
            </Link>

            <Divider variant='middle' />
            <Link to="/profile">
                <MenuItem>
                    <SettingsOutlinedIcon color="primary" />  &nbsp;
                    <grid>
                        <span className={classes.textBlue}>Profile</span>
                    </grid>
                </MenuItem>
            </Link>
            <Divider variant='middle' />
            <Link to="/profile?type=ticket">
                <MenuItem>
                    <ContactSupportOutlinedIcon color="primary" />  &nbsp;
                    <span className={classes.textBlue} >Help</span>
                </MenuItem>
            </Link>
            <Divider variant='middle' />
            <Link to='/' onClick={handleSignOut}>
                <MenuItem>
                    <ExitToAppIcon color="primary" /> &nbsp;
                    <span className={classes.textBlue}>Logout</span>
                </MenuItem>
            </Link>
        </Card>
    </>
);

export const getNotifications = (notificationList, handleClick, classes, handleLinkSelect) => (
    <>
        <Card variant="outlined" className={classes.notificationCard}>
            {_get(notificationList, 'length', 0) > 0 &&
                <><MenuItem className={classes.markUnread} onClick={handleClick}>
                    <Typography component="div" variant="div">
                        Mark all as read
                </Typography>
                </MenuItem>
                    <Divider variant='middle' />
                </>}
            {
                _get(notificationList, 'length', 0) > 0 ? (
                    notificationList.map((not, key) => (
                        <>
                            <Link to={not.path} onClick={() => handleLinkSelect(not)}>
                                <MenuItem className={`${classes.notificationDisplay} body-color`} id={key}>
                                    {not.message}
                                </MenuItem>
                                <Divider variant='middle' />
                            </Link>
                        </>
                    ))) : (
                        <>
                            <MenuItem className={classes.notificationDisplay}>
                                You have no unread notifications
                            </MenuItem>
                            <Divider variant='middle' />
                        </>
                    )
            }
        </Card>
    </>
)