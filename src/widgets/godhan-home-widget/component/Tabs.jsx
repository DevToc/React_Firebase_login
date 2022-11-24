import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { tabsMapDispatchToProps, tabsMapStateToProps } from "../models";
import { globalUtils, updateFormStore, globalConstants } from "../../../utils";
import * as _get from "lodash/get";

const useStyles = makeStyles(() => ({
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
    width: "25%",
    fontWeight: "500",
    fontSize: 18,
    color: "#001D48",
    textAlign: "center",
    padding: "7px 0",
  },
  tabActive: {
    width: "25%",
    fontWeight: "600",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    borderRadius: 5,
    backgroundColor: "#8c450b",
    padding: "3px",
  },
  divider: {
    width: 2,
    backgroundColor: "rgba(140, 69, 11, 0.7)",
    height: "80%",
  },
  dividerHidden: {
    width: 2,
    backgroundColor: "white",
    height: "80%",
  },
  "@media (max-width: 300px)": {
    tab: {
      fontSize: 14,
    },
    tabActive: {
      fontSize: 14
    }
  },
}));

export const FullWidthTabsComponent = ({ homeForm, fetchHotCategoriesList, fetchAllItems }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    var type;
    setValue(newValue);
    switch (newValue) {
      case 0:
        type = "rent";
        break;
      case 1:
        type = "sell";
        break;
      case 2:
        type = "wanted";
        break;
      case 3:
        type = "task";
        break;
      default:
        type = "rent";
        break;
    }
    globalUtils.scrollTo('root')
    fetchAllItems({
      offset: 0,
      listType: type,
      limit: globalConstants.paginationLimit,
      initial: true
    });
    fetchHotCategoriesList({ type });
    updateFormStore({ form: "homeForm", field: "selectedType", value: type });
    if (!_get(homeForm, "skipFormClear.value")) {
      updateFormStore({ form: "homeForm", field: "listType", value: "" });
      updateFormStore({ form: "homeForm", field: "searchField", value: "" });
      // updateFormStore({ form: "homeForm", field: "radius", value: null });
      globalUtils.clearCategory();
    } else {
      updateFormStore({
        form: "homeForm",
        field: "skipFormClear",
        value: false,
      });
    }
  };

  return (
    <div className={classes.tabs}>
      <div
        onClick={() => handleChange(0)}
        className={value === 0 ? classes.tabActive : classes.tab}
      >
        Rent
      </div>
      <div
        className={
          value !== 0 && value !== 1 ? classes.divider : classes.dividerHidden
        }
      />
      <div
        onClick={() => handleChange(1)}
        className={value === 1 ? classes.tabActive : classes.tab}
      >
        Buy
      </div>
      <div
        className={
          value !== 1 && value !== 2 ? classes.divider : classes.dividerHidden
        }
      />
      <div
        onClick={() => handleChange(2)}
        className={value === 2 ? classes.tabActive : classes.tab}
      >
        Wanted
      </div>
      <div
        className={
          value !== 2 && value !== 3 ? classes.divider : classes.dividerHidden
        }
      />
      <div
        onClick={() => handleChange(3)}
        className={value === 3 ? classes.tabActive : classes.tab}
      >
        Task
      </div>
    </div>
  );
};

export const FullWidthTabs = connect(
  tabsMapStateToProps,
  tabsMapDispatchToProps
)(FullWidthTabsComponent);
