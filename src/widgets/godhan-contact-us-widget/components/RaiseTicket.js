import React from "react";
import { Button, makeStyles, Grid } from "@material-ui/core";
import _get from "lodash/get";
import { connect } from "react-redux";
import {
  raiseTicketMapStateToProps,
  raiseTicketMapDispatchToProps,
} from "../models";
import { updateFormStore, validateField } from "../../../utils";
import { raiseTicketStyle } from "../style";
import BackHeader from "../../../components/back-header/BackHeader";
import { Link } from "react-router-dom";
import Input from "../../../components/Input-component/InputComponent";
import TextArea from "../../../components/text-area/TextArea";
import { BlankLayout } from "../../../components";

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: '0px !important'
  },
  tabs: {
    background: "#FFFFFF",
    border: "2px solid rgba(140, 69, 11, 0.7)",
    borderRadius: 5,
    display: "flex",
    padding: 3,
    width: "100%",
    alignItems: "center",
  },
  tab: {
    width: "33%",
    fontWeight: "500",
    fontSize: 18,
    color: "#001D48",
    textAlign: "center",
    padding: "3px 0",
  },
  tabActive: {
    width: "33%",
    fontWeight: "600",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
    padding: "3px",
  },
  divider: {
    width: 2,
    backgroundColor: "rgba(140, 69, 11, 0.7)",
    height: 28,
  },
  dividerHidden: {
    width: 2,
    backgroundColor: "white",
    height: 28,
  },
}));

const RaiseTicketComponent = (props) => {
  const classes = useStyles();
  const { submitNewTicket, ticketForm, history } = props;
  const [value, setValue] = React.useState("Complaint");
  const handleSubmit = () => {
    submitNewTicket({
      ticketType: _get(ticketForm, "ticketType.value", ""),
      title: _get(ticketForm, "title.value", ""),
      description: _get(ticketForm, "comment.value", ""),
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    updateFormStore({ form: "ticketForm", field: name, value });
  };

  const handleBlur = (e) => {
    const { value, name } = e.target;
    updateFormStore({ form: "ticketForm", field: name, value });
    validateField({ form: "ticketForm", field: name, data: value });
  };

  const handleClick = (newValue) => {
    setValue(newValue);
    updateFormStore({
      form: "ticketForm",
      field: "ticketType",
      value: newValue,
    });
  };

  return (
    <BlankLayout>
      <StyledRaiseTicket style={{ paddingBottom: 65 }}>
        <div className="edit-profile-component" id="raise-ticket">
          <div
            className="profile-header-component"
            style={{ justifyContent: "unset" }}
          >
            <BackHeader title="Contact Us" />
          </div>

          <div className="profile-body-component">
            <Grid container>
              <div className="tabs-header">
                {/* <div className="tabs-width">
                  <AppBar position="static" color="default">
                    <Tabs
                      TabIndicatorProps={{
                        style: {
                          display: "none",
                        },
                      }}
                      value={value}
                      onChange={handleClick}
                      indicatorColor="primary"
                      variant="fullWidth"
                      aria-label="full width tabs example"
                      id="full-width-tabs"
                    >
                      <Tab
                        label="Complaint"
                        value="Complaint"
                        {...a11yProps(0)}
                      />
                      <Tab
                        label="Technical Issue"
                        value="technicalIssue"
                        {...a11yProps(1)}
                      />
                      <Tab
                        label="Suggestion"
                        value="Suggestion"
                        {...a11yProps(2)}
                      />
                    </Tabs>
                  </AppBar>
                </div> */}
                <div className={classes.tabs}>
                  <div
                    onClick={() => handleClick("Complaint")}
                    className={
                      value === "Complaint" ? classes.tabActive : classes.tab
                    }
                  >
                    Complaint
                  </div>
                  <div
                    className={
                      value !== "Complaint" && value !== "technicalIssue"
                        ? classes.divider
                        : classes.dividerHidden
                    }
                  />
                  <div
                    onClick={() => handleClick("technicalIssue")}
                    className={
                      value === "technicalIssue"
                        ? classes.tabActive
                        : classes.tab
                    }
                  >
                    Technical
                  </div>

                  <div
                    className={
                      value !== "technicalIssue" && value !== "Suggestion"
                        ? classes.divider
                        : classes.dividerHidden
                    }
                  />
                  <div
                    onClick={() => handleClick("Suggestion")}
                    className={
                      value === "Suggestion" ? classes.tabActive : classes.tab
                    }
                  >
                    Suggestion
                  </div>
                </div>
              </div>
              <Grid item xs={12} md={8} lg={8} className="body-border">
                <Input
                  style={{ fontWeight: 600, fontSize: 18, height: 'unset'}}
                  name={_get(ticketForm, "title.name")}
                  placeholder={_get(ticketForm, "title.placeholder")}
                  value={_get(ticketForm, "title.value")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!_get(ticketForm, "title.isValid")}
                  errorText={
                    !_get(ticketForm, "title.isValid") &&
                    _get(ticketForm, "title.errorText")
                  }
                  className={classes.input}
                />
                <TextArea
                  style={{
                    marginTop: 23,
                    height: 120,
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                  name={_get(ticketForm, "comment.name")}
                  placeholder={_get(ticketForm, "comment.placeholder")}
                  value={_get(ticketForm, "comment.value")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!_get(ticketForm, "comment.isValid")}
                  errorText={
                    !_get(ticketForm, "comment.isValid") &&
                    _get(ticketForm, "comment.errorText")
                  }
                />
                <div className="edit-profile-buttons">
                  <Button
                    type="submit"
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    aria-label="cancel"
                    // fullWidth
                    onClick={() => {
                      history.goBack();
                    }}
                    className="cancel-button"
                    style={{
                        padding: '0 6px 0 9px',
                        fontFamily: 'Dejavu-Sans',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '18px',
                        borderRadius: '5px',
                        alignItems: 'center',
                        width: 120
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="medium"
                    aria-label="log in"
                    // fullWidth
                    disabled={
                      !_get(ticketForm, "comment.value") ||
                      !_get(ticketForm, "title.value")
                    }
                    key={`${!_get(ticketForm, "comment.value") ||
                    !_get(ticketForm, "title.value")}`}
                    onClick={handleSubmit}
                    style={{
                        padding: '0 6px 0 9px',
                        fontFamily: 'Dejavu-Sans',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '18px',
                        border: '2px solid #8c450b',
                        borderRadius: '5px',
                        alignItems: 'center',
                        width: 120
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <footer className="profileFooter">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: 360,
              padding: "0 5px",
            }}
          >
            <Link to="/privacyPolicy" className="footerLink">
              Privacy Policy
            </Link>
            <Link to="terms-of-use" className="footerLink">
              Terms of Use
            </Link>
            <Link to="aboutUs" className="footerLink">
              About Us
            </Link>
          </div>
          <a
            href="https://www.godhan.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              style={{ fontWeight: "bold", marginTop: 5 }}
              className="footerLink"
            >
              www.godhan.com
            </div>
          </a>
        </footer>
      </StyledRaiseTicket>
    </BlankLayout>
  );
};

const StyledRaiseTicket = raiseTicketStyle;
export const RaiseTicket = connect(
  raiseTicketMapStateToProps,
  raiseTicketMapDispatchToProps
)(RaiseTicketComponent);
