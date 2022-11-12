import React from "react";
import { connect } from "react-redux";
import {
  categoryListingMapStateToProps,
  categoryListingMapDispatchToProps,
} from "../models";
import * as _ from "lodash";
import { TreeItem, TreeView } from "@material-ui/lab";
import { updateFormStore, globalConstants, globalUtils } from "../../../utils";
import { makeStyles, Grid } from "@material-ui/core";
import { additionalPropTypes } from "../utils/ListingOptionsProps";
import { categoryListingStyle } from "../style";
import { LocationComponent } from "../../../components";
import { getSell, getTask } from "../utils";
import SvgIcon from "@material-ui/core/SvgIcon";
import PropTypes from "prop-types";
import { fade, withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring/web.cjs";

const useStyles = makeStyles({
  treeRoot: {
    height: 110,
    flexGrow: 1,
  },
  root: {
    margin: "1rem",
    textTransform: "capitalize",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  selectedValue: {
    fontWeight: "unset",
  },
  link: {
    cursor: "pointer",
    color: "#8c450b",
    textDecoration: "underline",
    margin: "1rem",
    textAlign: "center",
  },
});

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
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
}))((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));

const CategoryListingComponent = (props) => {
  const {
    data,
    fetchLocationBySearch,
    locationOptions,
    fetchLocation,
    currentLocation,
    clearCurrentLocation,
    listingForm,
    selectedLocation,
    isChangeComponent,
  } = props;
  const classes = useStyles();

  const findLeafNode = (element, value) => {
    if (element.id === value && _.get(element, "children.length", 0) === 0) {
      updateFormStore({
        form: "listingForm",
        field: "selectedCategory",
        value: element.id,
      });
      updateFormStore({
        form: "listingForm",
        field: "selectedCategoryName",
        value: element.name,
      });
      globalUtils.scrollTo("location-title");

      setTimeout(() => {
        try {
          if (window.screen.width < globalConstants.iPadAndBelow) {
            document
              .getElementsByClassName("Mui-selected")[0]
              .classList.add("set-selected");
          } else {
            document
              .getElementsByClassName("Mui-selected")[1]
              .classList.add("set-selected");
          }
        } catch (err) {
          console.error("error fetching classlist");
        }
      }, 10);

      if (window.screen.width < globalConstants.iPadAndBelow) {
        globalUtils.scrollTo("add-new-product");
      }

      if (_.includes(additionalPropTypes, element.name)) {
        updateFormStore({
          form: "listingForm",
          field: "category",
          value: element,
        });
      }
      return element;
    } else if (element.children != null) {
      let result = null;
      for (let i = 0; result === null && i < element.children.length; i++) {
        result = findLeafNode(element.children[i], value);
      }
      return result;
    }
    return null;
  };

  const handleSelect = (e, value) => {
    const categoryFound =
      !_.isEmpty(data, "children") &&
      data.children.find((obj) => value === _.get(obj, "id"));
    if (!_.isEmpty(categoryFound)) {
      updateFormStore({
        form: "listingForm",
        field: "category",
        value: categoryFound,
      });
    }
    return findLeafNode(data, value);
  };

  const getSelectionDetails = () => {
    switch (_.get(listingForm, "selectedListingType.value.id")) {
      case "task":
        return getTask(
          classes,
          _.get(listingForm, "selectedListingType.value.id"),
          selectedLocation,
          currentLocation,
          "",
          isChangeComponent,
          clearCurrentLocation
        );
      default:
        return getSell(
          classes,
          _.get(listingForm, "selectedListingType.value.id"),
          listingForm,
          currentLocation,
          selectedLocation,
          "",
          isChangeComponent,
          clearCurrentLocation
        );
    }
  };

  const renderTree = (nodes) =>
    !_.isEmpty(nodes) && (
      <StyledTreeItem
        key={_.get(nodes, "id")}
        nodeId={_.get(nodes, "id")}
        label={_.get(nodes, "name")}
        onSelect={handleSelect}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node, key) => renderTree(node, key))
          : null}
      </StyledTreeItem>
    );

  return (
    <CategoryListingStyle>
      <Grid container>
        <Grid item xs={12} md={4}>
          {!_.isEmpty(data) &&
            (!isChangeComponent ||
              (isChangeComponent &&
                !_.get(listingForm, "selectedCategoryName.value"))) && (
              <div id="category-listing" className="category-listing">
                <TreeView
                  className={classes.treeRoot}
                  defaultExpanded={[
                    globalConstants.rootElements.rent,
                    globalConstants.rootElements.sell,
                    globalConstants.rootElements.wanted,
                  ]}
                  defaultCollapseIcon={<MinusSquare />}
                  defaultExpandIcon={<PlusSquare />}
                  defaultEndIcon={<CloseSquare />}
                  onNodeSelect={handleSelect}
                  onSelect={handleSelect}
                >
                  {renderTree(data)}
                </TreeView>
              </div>
            )}
        </Grid>
        <Grid item xs={12} md={4}>
          {(!isChangeComponent ||
            (isChangeComponent &&
              !(
                currentLocation || _.get(listingForm, "selectedLocation.value")
              ))) && (
            <LocationComponent
              formname="listingForm"
              fetchLocationBySearch={fetchLocationBySearch}
              locationOptions={locationOptions}
              fetchLocation={fetchLocation}
              currentLocation={currentLocation}
              clearCurrentLocation={clearCurrentLocation}
              selectedLocation={_.get(listingForm, "selectedLocation.value")}
              formSearchByFieldValue={_.get(listingForm, "searchBy.value")}
              listingForm={listingForm}
              useCurrentLocation
            />
          )}
          {getSelectionDetails()}
        </Grid>
      </Grid>
    </CategoryListingStyle>
  );
};

const CategoryListingStyle = categoryListingStyle;

export const CategoryListing = connect(
  categoryListingMapStateToProps,
  categoryListingMapDispatchToProps
)(CategoryListingComponent);
