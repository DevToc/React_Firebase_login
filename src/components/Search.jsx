import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";
import { updateFormStore, validateField, globalUtils } from "../utils";
import * as _ from "lodash";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
//import SearchIcon from "@material-ui/icons/Search";
import Drawer from "@material-ui/core/Drawer";
import SearchIcon from "../assets/icons/Search";
import { Scrollbars } from "react-custom-scrollbars";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

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
    color: "#224214",
    textDecoration: "underline",
    margin: "1rem",
    textAlign: "center",
  },
  inputRoot: {
    alignItems: "center",
    display: "flex",
    height: "95%",
    padding: "0px",
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
  userDataContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
  userName: {
    marginLeft: 5,
    fontWeight: "600",
    color: "#001D48",
    fontSize: 18,
  },
  userLocationContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
  searchField: {
    backgroundColor: "white",
    border: "none",
    outline: "none",
    height: 42,
    width: "100%",
    fontFamily: "Merriweather-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 18,
    color: "#001D48",
    "&::placeholder": {
      color: "rgba(0, 29, 72, 0.7)",
    },
  },
  itemContainer: {
    display: "flex",
    alignItems: "center",
    paddingRight: 10,
  },
  itemText: {
    fontFamily: "Merriweather-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    color: "#001D48",
  },
  drawerHeading: {
    fontFamily: "Merriweather-Regular",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 16,
    marginLeft: 25,
  },
  drawerDivider: {
    backgroundColor: "#C4C4C4",
    margin: "8px 15px",
    height: 1,
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "spaceBetween",
    backgroundColor: "white",
    marginTop: 16,
    borderRadius: 5,
    paddingRight: 15,
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    left: 27,
    color: "red",
  },
}));

export const Search = ({
  isHomePage = true,
  options = [],
  homeForm,
  // isAuthorized = false,
  // userData = {},
  handleSearch,
  style = {},
  setIsKeyBoardOpen
}) => {
  const classes = useStyles();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const findLeafNode = (element, value, force = false) => {
    document.getElementsByTagName("html")[0].style.overflow = "unset";

    if (
      force ||
      (element.id === value && _.get(element, "children.length", 0) === 0)
    ) {
      updateFormStore({
        form: "homeForm",
        field: "selectedCategoryId",
        value: element.id,
      });
      updateFormStore({
        form: "homeForm",
        field: "selectedCategoryName",
        value: element.name,
      });
      updateFormStore({
        form: "homeForm",
        field: "listType",
        value: element.name,
      });
      updateFormStore({
        form: "homeForm",
        field: "selectedParent",
        value: element.parentId,
      });
      updateFormStore({
        form: "homeForm",
        field: "secondarySelectedParent",
        value: element.parent_id,
      });
      updateFormStore({
        form: "homeForm",
        field: "type",
        value: _.get(homeForm, "selectedType.value"),
      });
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

  const handleSelect = (e, value, force) => {
    updateFormStore({
      form: "homeForm",
      field: "temp",
      value,
    });
    return findLeafNode(options, value, force);
  };

  const StyledTreeItem = ({
    LabelIcon,
    labelText,
    onCheck,
    isCheck = false,
    isSelected,
    ...other
  }) => (
      <TreeItem
        style={{ marginTop: 15, marginLeft: LabelIcon ? 0 : 35 }}
        label={
          <div className={classes.itemContainer}>
            {LabelIcon && (
              <LabelIcon
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 20,
                }}
                color={isSelected ? "#224214" : "#001D48"}
              />
            )}
            <div
              style={isSelected ? { color: "#224214" } : null}
              className={classes.itemText}
            >
              {labelText}
            </div>
            {isCheck && (
              <CheckIcon
                onClick={onCheck}
                style={{
                  marginLeft: "auto",
                  width: 17,
                  color: isSelected ? "#224214" : "#001D48",
                }}
              />
            )}
          </div>
        }
        {...other}
      />
    );

  const handleChange = (e) => {
    const { value, name } = e.target;
    updateFormStore({ form: "homeForm", field: name, value: value });
  };

  const updateFormValue = (element) => {
    updateFormStore({
      form: "homeForm",
      field: "selectedCategoryName",
      value: element.name,
    });
    updateFormStore({
      form: "homeForm",
      field: "selectedCategoryId",
      value: element.id,
    });
    updateFormStore({
      form: "homeForm",
      field: "listType",
      value: element.name,
    });
    updateFormStore({
      form: "homeForm",
      field: "selectedParent",
      value: element.parentId,
    });
    updateFormStore({
      form: "homeForm",
      field: "secondarySelectedParent",
      value: element.id,
    });
    updateFormStore({
      form: "homeForm",
      field: "type",
      value: _.get(homeForm, "selectedType.value"),
    });
  }

  const handleBlur = (e) => {
    const { value, name } = e.target;
    validateField({ form: "homeForm", field: name, data: value });
    setIsKeyBoardOpen(false);
  };

  const selectedCategoryParentId = _.get(
    homeForm,
    "secondarySelectedParent.value"
  );

  let InputIcon = MenuIcon;

  if (selectedCategoryParentId)
    InputIcon = globalUtils.getCategoryIcon(selectedCategoryParentId);

  const handleThirdLayer = (node) => {
    if(_.isEmpty(node.children)){
      setIsDrawerOpen(false)
    } else {
      updateFormStore({
        form: "homeForm",
        field: "thirdLayerCategory",
        value: node,
      })
    }
  }

  return (
    isHomePage && (
      <>
        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} className="notch">
          <Scrollbars
            renderView={(props) => (
              <div
                {...props}
                style={{ ...props.style, marginBottom: -25, paddingBottom: 20, marginTop: 'env(safe-area-inset-top)' }}
                className="view"
              />
            )}
            autoHide
            style={{ width: '82vw' }}
          >
            <span className={classes.drawerHeading}>Categories</span>
            <div className={classes.drawerDivider} />
            {!_.isEmpty(options.children) && (
              <TreeView
                onNodeSelect={handleSelect}
                onSelect={handleSelect}
                style={{ minWidth: 300 }}
              >
                {options.children.map((node) => {
                  return (
                    <StyledTreeItem
                      key={_.get(node, "id")}
                      nodeId={_.get(node, "id")}
                      labelText={_.get(node, "name")}
                      //onSelect={handleSelect}
                      isSelected={
                        _.get(homeForm, "selectedCategoryId.value") === node.id
                      }
                      onCheck={() => {
                        findLeafNode(node, node.id, true);
                        updateFormValue(node)
                        setIsDrawerOpen(false);
                      }}
                      isCheck={node.children?.length > 0 && node.id === _.get(homeForm, "temp.value")}
                      LabelIcon={globalUtils.getCategoryIcon(node.id)}
                      onClick={() =>
                        _.isEmpty(node.children) ? setIsDrawerOpen(false) : null
                      }
                      >
                      {Array.isArray(node.children)
                        ? node.children.map((node, key) => {
                          return (
                            <StyledTreeItem
                              key={_.get(node, "id")}
                              nodeId={_.get(node, "id")}
                              labelText={_.get(node, "name")}
                              //onSelect={handleSelect}
                              onCheck={() => {
                                findLeafNode(node, node.id, true);
                                updateFormValue(node)
                                setIsDrawerOpen(false);
                              }}
                              isCheck={node.children?.length > 0 && node.id === _.get(homeForm, "temp.value")}
                              onClick={() => {
                                if (_.isEmpty(node.children)) {
                                  setIsDrawerOpen(false)
                                }
                                handleThirdLayer(node)
                                updateFormStore({ form: "homeForm", field: "temp", value: node.id });
                              }
                              }
                            >
                              {Array.isArray(node.children)
                                ? node.children.map((node, key) => {
                                  return (
                                    <StyledTreeItem
                                      key={_.get(node, "id")}
                                      nodeId={_.get(node, "id")}
                                      labelText={_.get(node, "name")}
                                      //onSelect={handleSelect}
                                      onClick={() =>
                                        _.isEmpty(node.children)
                                          ? setIsDrawerOpen(false)
                                          : null                                      }
                                    />
                                  );
                                })
                                : null}
                            </StyledTreeItem>
                          );
                        })
                        : null}
                    </StyledTreeItem>
                  );
                })}
              </TreeView>
            )}
            <div className="fixed-footer-section" />
          </Scrollbars>
        </Drawer>
        <div style={style} className={classes.searchContainer}>
          <div style={{ position: "relative", display: _.get(homeForm, "selectedType.value") === "task" ? 'none' : 'inherit' }}>
            <IconButton
              disabled={_.get(homeForm, "selectedType.value") === "task"}
              onClick={() => setIsDrawerOpen(true)}
            >
              <InputIcon />
            </IconButton>
            {selectedCategoryParentId && (
              <CloseIcon
                onClick={globalUtils.clearCategory}
                className={classes.closeIcon}
              />
            )}
          </div>
          <input
            id={_.get(homeForm, "searchField.name")}
            name={_.get(homeForm, "searchField.name")}
            value={_.get(homeForm, "searchField.value", "")}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={() => setIsKeyBoardOpen(true)}
            type="text"
            placeholder="I am looking for..."
            className={classes.searchField}
          />
          <IconButton style={{ padding: 0, width: 21 }} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </div>
      </>
    )
  );
};
