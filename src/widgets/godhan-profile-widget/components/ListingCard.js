import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import _ from "lodash";
import { itemStatusesAvailable } from "../utils";
import { Link } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";

const useStyles = makeStyles({
  card: {
    display: "flex",
    marginTop: 15,
    border: "1px solid rgba(140, 69, 11, 0.7)",
    alignItems: "center",
    position: "relative",
    maxWidth: 500,
    width: "100%",
  },
  thumbnail: {
    objectFit: "cover",
    height: "70px !important",
    width: 75,
    minWidth: 75,
  },

  content: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    padding: "5px 10px",
  },

  title: {
    fontWeight: "normal",
    fontSize: 16,
    color: "#001D48",
    margin: 0,
  },

  statusInactive: {
    fontSize: 15,
    color: "rgba(211, 35, 35, 0.8)",
  },
  statusActive: {
    fontSize: 15,
    color: "#05C066",
  },
  statusExpired: {
    fontSize: 13,
    color: "black",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  postedDate: {
    color: "#344654",
    fontSize: 15,
  },

  actionsButton: {
    display: "flex",
    alignItems: "center",
  },

  actionItem: {
    marginTop: 5,
    fontSize: 17,
    color: "rgba(0, 29, 72, 0.8)",
  },

  actionsContainer: {
    padding: "0px 30px 10px 14px",
    position: "absolute",
    backgroundColor: "white",
    border: "1px solid rgba(140, 69, 11, 0.7)",
    zIndex: 1,
    right: -1,
    bottom: -165,
    minHeight: 157,
  },
  "@media (max-width:300px)": {
    thumbnail: {
      width: '60px',
      height: '60px',
      minWidth:'60px'
    }
  }
});

const ListingCard = ({
  thumbnail,
  postedDate,
  title,
  onEdit,
  onPreview,
  onUpdateStatus,
  status = "inactive",
  isPublicProfile
}) => {
  const classes = useStyles();

  const [isExpanded, setIsExpanded] = useState(false);

  const handleClickAway = () => {
    setTimeout(() => {
      if (isExpanded) {
        setIsExpanded(false);
      }
    }, 10);
  };

  let Status = <div className={classes.statusActive}>Active</div>;
  if (status === "Inactive")
    Status = <div className={classes.statusInactive}>Inactive</div>;
  else if (status === "Expired")
    Status = <div className={classes.statusExpired}>Expired</div>;

  return (
    <div className={classes.card}>
      <img
        src={thumbnail || "/assets/images/logo.png"}
        className={classes.thumbnail}
        alt=""
      />
      <div className={classes.content}>
        <h2 className={classes.title}>{title}</h2>
        {Status}
        <div className={classes.row}>
          <div className={classes.postedDate}>Posted: {postedDate}</div>
          {
            isPublicProfile ? (
              <div
                className={classes.actionsButton}
              >
                <span style={{ color: "rgba(0, 29, 72, 0.8)", fontSize: 17 }} onClick={onPreview} >
                  View
                </span>
              </div>
            ) : (
                <div
                  onClick={() => (!isExpanded ? setIsExpanded(true) : null)}
                  className={classes.actionsButton}
                >
                  <span style={{ color: "rgba(0, 29, 72, 0.8)", fontSize: 17 }}>
                    Actions
                </span>
                  {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>
              )
          }

        </div>
      </div>
      {isExpanded && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={classes.actionsContainer}>
            {/* <div onClick={onEdit} className={classes.actionItem}>
            Edit
          </div> */}
            <div onClick={onPreview} className={classes.actionItem}>
              Preview
            </div>
            {/* <div className={classes.actionItem}>Extend</div>
          <div className={classes.actionItem}>Expire</div>
          <div className={classes.actionItem}>Pause</div> */}
            {_.includes(["New", "Active"], status) && (
              <>
                <Link to={`/editListing`} onClick={onEdit}>
                  <div className={classes.actionItem}>Edit</div>
                </Link>
              </>
            )}
            {status !== "Expired" ? (
              <>
                {!_.isEmpty(itemStatusesAvailable) &&
                  itemStatusesAvailable.map((option) => (
                    <div key={option.id}>
                      {_.includes(option.availableFor, status) && (
                        <div
                          className={classes.actionItem}
                          onClick={() => onUpdateStatus(option)}
                        >
                          {option.label}
                        </div>
                      )}
                    </div>
                  ))}
              </>
            ) : (
                <div></div>
              )}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default ListingCard;
