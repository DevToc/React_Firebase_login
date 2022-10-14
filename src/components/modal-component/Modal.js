import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    margin: "auto",
    // textAlign: "justify",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    display: "flex",
    margin: "auto",
  },
}));

export const ModalComponent = ({
  open,
  setOpen,
  message,
  handleCloseClick,
  isRedirect,
  to,
  buttonLabel = "OK",
  children,
  background,
  buttonColor,
  isCancelAvailable = false,
  handleCancel
}) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    if (handleCloseClick) {
      handleCloseClick();
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: { backgroundColor: background }
        }}
      >
        <Fade in={open}>
          {children ? (
            children
          ) : (
              <div className={classes.paper}>
                <p>
                  <strong>{message}</strong>
                </p>
                <div className="display-flex">
                  {
                    isCancelAvailable && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCancel}
                        className={classes.button}
                        style={{ backgroundColor: 'lightgray' }}
                      >
                        Cancel
                    </Button>
                    )
                  }
                  {isRedirect ? (
                    <Link to={to}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose}
                        className={classes.button}
                      >
                        {buttonLabel}
                      </Button>
                    </Link>
                  ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose}
                        className={classes.button}
                        style={{ backgroundColor: buttonColor }}
                      >
                        {buttonLabel}
                      </Button>
                    )}
                </div>
              </div>
            )}
        </Fade>
      </Modal>
    </div>
  );
};
