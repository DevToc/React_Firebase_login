import { Button, IconButton, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import { updateFormStore } from "../../../utils";

const DatePickerModal = ({ onClose }) => {
  const classes = useStyles();

  const [selectedDay, setSelectedDay] = useState(null);

  const handleApply = () => {
    const month =
      selectedDay.month < 10 ? "0" + selectedDay.month : selectedDay.month;
    const day = selectedDay.day < 10 ? "0" + selectedDay.day : selectedDay.day;

    const date = `${day}-${month}-${selectedDay.year}`;

    updateFormStore({
      form: "listingForm",
      field: "availableFrom",
      value: date,
    });

    onClose();
  };

  return (
    <div className={classes.overlay}>
      <IconButton onClick={onClose} className={classes.closeButton}>
        <CloseIcon />
      </IconButton>
      <Calendar
        colorPrimary="#2B579A"
        value={selectedDay}
        onChange={setSelectedDay}
        shouldHighlightWeekends
        minimumDate={utils().getToday()}
      />
      {selectedDay && (
        <Button onClick={() => handleApply()} size="large" className={classes.button}>
          Apply
        </Button>
      )}
    </div>
  );
};

const useStyles = makeStyles({
  overlay: {
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  button: {
    backgroundColor: "#2B579A",
    color: "white !important",
    marginTop: 20,
  },
});

export default DatePickerModal;
