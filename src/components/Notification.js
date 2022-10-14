import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import React from 'react';
import { connect } from 'react-redux';
import { notificationActions } from '../services';

const NotificationComponent = ({ notification, clearNotification, style = {}, className="" }) => (
    <>
        <div style={style} className={`${className} ${!_isEmpty(notification) ? "mar-2" : ""}`} id="notification-component">
            {
                !_isEmpty(notification) && _get(notification, 'length', 0) > 0 && notification.map((notif) => (
                    <Alert
                        variant="outlined"
                        severity={_get(notif, 'severity')}
                        action={
                            <CloseIcon color="primary" onClick={clearNotification} />
                        }
                    >
                        {notif.message}
                    </Alert>
                ))
            }
        </div>
    </>
)

const mapStateToProps = (state) => ({
    notification: _get(state, 'notification.notification')
})

const mapDispatchToProps = (dispatch) => ({
    clearNotification: (payload) =>
        dispatch(notificationActions.clearNotification(payload))
});

export const Notification = connect(mapStateToProps, mapDispatchToProps)(NotificationComponent)
