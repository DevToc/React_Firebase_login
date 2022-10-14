import React from "react";
import { makeStyles } from "@material-ui/core";
import BackHeader from "../../components/back-header/BackHeader";
import { mapStateToProps, mapDispatchToProps } from "./models/mainModel";
import { connect } from "react-redux";
import NotificationCard from "./component/NotificationCard";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { BaseLayout } from "../../components";
import { Alert } from "@material-ui/lab";
import { globalConstants } from "../../utils";

const useStyles = makeStyles({
  page: {
    backgroundColor: "white",
    minHeight: "100vh",
  },
  notifications: {
    padding: "5px 15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const NotificationWidget = ({ notifications, markNotifAsRead }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (notification) => {
    history.push(
      notification.path === "/chat" ? "/profile?type=chat" : notification.path
    );
    markNotifAsRead(notification);
  };

  return (
    <BaseLayout>
      <div className={classes.page}>
        <BackHeader title="Notifications" />
        <div className={classes.notifications}>
          {notifications.length !== 0 ?
            notifications.map((notif) => {
              const [year, month, day, hour, minute] = notif.systemCreationDate;

              return (
                <NotificationCard
                  key={notif.notificationId}
                  title={notif.message}
                  time={moment([year, month, day, hour, minute]).format(
                    "hh:mm A"
                  )}
                  onClick={() => handleClick(notif)}
                />
              );
            }) : (
              <>
                <div className="notification-margin">
                  <Alert
                    variant="outlined"
                    severity={globalConstants.notificationMessageSeverity.WARNING}
                  >
                    You do not have any alerts
              </Alert>
                </div>
              </>
            )}
        </div>
      </div>
    </BaseLayout>
  );
};

export const MainNotificationWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationWidget);
