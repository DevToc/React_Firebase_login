import React from "react";
import { Location, Search } from ".";
import {
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { updateFormStore } from "../../../utils";
import * as _ from "lodash";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  treeRoot: {
    flexGrow: 1,
  },
  root: {
    margin: "1rem",
    textTransform: "capitalize",
  },
  link: {
    cursor: "pointer",
    color: "#2b579a",
    textDecoration: "underline",
    margin: "1rem",
    textAlign: "center",
  },
  inputRoot: {
    alignItems: "center",
    display: "flex",
    height: "95%",
    padding: "0",
    borderRadius: "4px",
    border: "1.5px solid lightgray",
    boxShadow: "none",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}));

export const HeaderComponent = (props) => {
  const {
    isHomePage = true,
    homeForm,
  } = props;

  const classes = useStyles();

  const handleClear = () => {
    updateFormStore({ form: "homeForm", field: "listType", value: "" });
    updateFormStore({ form: "homeForm", field: "selectedParent", value: "" });
  };



  const handleClick = (event) => {
    if (!_.includes(["task"], _.get(homeForm, "selectedType.value"))) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
      setTimeout(() => {
        if (document.getElementsByClassName("MuiTreeItem-label").length > 0) {
          document.getElementsByClassName(
            "MuiTreeItem-label"
          )[0].style.display = "none";
        }
      }, 100);
    }
  };


  return (
    isHomePage && (
      <>
        <div className="display-flex">
          <div className="left-pane">
            <div className="tabs-header">

            </div>
            <Grid
              container
              alignContent="center"
              spacing={window.screen.width < 700 ? 1 : 0}
              className="grid"
            >
              <Grid item lg={3} xs={12} className="">
                {!_.includes(
                  ["default", ""],
                  _.get(homeForm, "listType.value")
                ) ? (
                    <div className="selected-location category-listing">
                      {_.get(homeForm, "listType.value")}
                      <span className="clear" onClick={handleClear}>
                        X
                    </span>
                    </div>
                  ) : (
                    <>
                      <Paper
                        component="div"
                        className={classes.inputRoot}
                        onClick={handleClick}
                      >
                        <IconButton
                          className={classes.iconButton}
                          aria-label="menu"
                        >
                          <MenuIcon />
                        </IconButton>
                        <TextField
                          label=""
                          placeholder="All Categories"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          color="primary"
                          fullWidth={!!window.screen.width < 700}
                          value={
                            !_.includes(
                              ["task"],
                              _.get(homeForm, "selectedType.value")
                            )
                              ? ""
                              : "None"
                          }
                          type="text"
                          style={{
                            backgroundColor: "white",
                            borderRadius: "4px",
                            height: "100%",
                            outline: "none",
                          }}
                          className="all-categories-field"
                        />
                      </Paper>
                    </>
                  )}
                {/* {renderPopover()} */}
              </Grid>
              <Grid item lg={3} xs={12}>
                <Search />
              </Grid>
              <Location />
            </Grid>
          </div>
        </div>
      </>
    )
  );
};
