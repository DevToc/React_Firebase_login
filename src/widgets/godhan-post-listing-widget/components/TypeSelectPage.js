import React from "react";
import CheckboxCircle from "../../../components/CheckboxCircle/CheckboxCircle";
import {Button, makeStyles} from "@material-ui/core";
import BackHeader from "../../../components/back-header/BackHeader";
import {categoryOptionsProps} from "../utils";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
  page: {
    // paddingTop: 50,
    // minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  wrapper: {
    maxWidth: 320,
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexDirection: 'column'
  },
    continueButton:{
        padding: '0 6px 0 9px',
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '18px',
        backgroundColor: '#224214',
        border: '2px solid #224214',
        borderRadius: '5px',
        alignItems: 'center',
        margin: "60px 20px 40px 20px",
        width: 150
    },
    cancelButton:{
        padding: '0 6px 0 9px',
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '18px',
        backgroundColor: "white",
        color:'#224214',
        border: '2px solid #224214',
        borderRadius: '5px',
        alignItems: 'center',
        width: 150
    }
});

const checkboxStyle = {
  width: window.screen.width > 300 ? 132 : 100,
  height: window.screen.width > 300 ? 132 : 100,
  fontSize: 24,
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)",
  marginTop: 40,
};

const TypeSelectPage = ({
  selectedOption,
  updateFormStore,
  setCurrentPage,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleSelect = (option) => {
    updateFormStore({
      form: "listingForm",
      field: "selectedListingType",
      value: option,
    });
  };

  return (
    <>
      <BackHeader title="Post Listing" />
      <div className={classes.page}>
        <div className={classes.wrapper}>
          {categoryOptionsProps &&
            categoryOptionsProps.map((option) => (
              <CheckboxCircle
                key={option.id}
                onChange={() => handleSelect(option)}
                checked={option?.id === selectedOption?.id}
                label={option.cardName}
                style={checkboxStyle}
              />
            ))}


          <div className={classes.alignCenter}>
            
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            onClick={() => setCurrentPage("addListing")}
            disabled={!selectedOption}
            className={classes.continueButton}
            key={`${selectedOption}`}
          >
            Continue
          </Button>
            <Button
              onClick={history.goBack}
              variant="outlined"
              color="primary"
              size="medium"
              aria-label="log in"
              className={classes.cancelButton}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export { TypeSelectPage };
