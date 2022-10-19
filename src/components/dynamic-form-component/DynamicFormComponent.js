import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@material-ui/core";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import Input from "../../components/Input-component/InputComponent";
import Select from "../../components/Select/Select";
import Group from "../checkbox-rectangle-group/Group";
import FormLabelInfo from "../FormLabelInfo";

const useStyles = makeStyles({
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
  formControl: {
    // marginBottom: ' 10px'
  },
  selectdropdownfortext: {
    width: "50%",
    margin: "auto",
    marginLeft: "1rem",
    marginTop: "17px",
  },
  formControlCheckbox: {
    marginRight: 0,
  },
  paddingRightReset: {
    paddingRight: "0 !important",
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
  },
  checkboxDisplay: {
    padding: "3px 9px 3px 9px !important",
  },
  displayFlex: {
    display: "flex",
    flexDirection: "row",
  },
  checkBoxContainer: {
    paddingLeft: "10px",
  },
  dropDown: {
    margin: "10px 0px",
  },
});

const CustomCheckbox = withStyles({
  root: {
    color: "#224214",
    "&$checked": {
      color: "#224214",
    },
  },
  checked: {},
})(Checkbox);

export const DynamicFormComponent = (props) => {
  const {
    formComponentType,
    field,
    handleChange,
    handleToggleChange,
    listingForm,
  } = props;
  const classes = useStyles();
  const handleFormComponentRender = () => {
    switch (formComponentType) {
      case "textField":
        return field.withDropdown ? (
          <Grid alignItems="center" container>
            <Grid item xs={12}>
              <FormLabelInfo className="form-label">
                {_get(field, "label")}
              </FormLabelInfo>
            </Grid>
            <div style={{ display: "flex", maxHeight: "44px" }}>
              <Grid item xs={6} sm={8}>
                <Input
                  inputStyle={{
                    fontWeight: 600,
                    fontSize: 15,
                    paddingTop: 12,
                    paddingBottom: 7,
                    marginLeft: 0,
                  }}
                  containerStyle={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRight: 0,
                    height: "100%",
                  }}
                  name={_get(field, "name")}
                  //placeholder={_get(field, "label")}
                  type="number"
                  value={_get(field, "value")}
                  error={!_get(field, "isValid")}
                  errorText={
                    !_get(field, "isValid") && _get(field, "errorText")
                  }
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                {!_isEmpty(field, "additionalProperty.options") &&
                  _get(field, "additionalProperty.options.length") > 0 && (
                    <div style={{ width: "100%" }}>
                      {/* <h5 className="form-label">
                    {_get(field, "additionalProperty.label")}
                  </h5> */}
                      <Select
                        optionsContainerStyle={{
                          right: 0,
                          paddingRight: 10,
                          minWidth: "100%",
                          width: "auto",
                        }}
                        //style={{ minWidth: 70 }}
                        selectStyle={{
                          padding: "0px 5px 8px 5px",
                          borderBottomLeftRadius: 0,
                          borderTopLeftRadius: 0,
                        }}
                        placeholderStyle={{ fontSize: 15, fontWeight: 600 }}
                        defaultPlaceholder={_get(
                          field,
                          "additionalProperty.label"
                        )}
                        value={_get(
                          field,
                          "additionalPropertyValue",
                          _get(field, "additionalProperty.options[0]")
                        )}
                        onChange={(value) =>
                          handleChange({
                            target: {
                              name: _get(field, "additionalProperty.name"),
                              value,
                            },
                          })
                        }
                        options={
                          !_isEmpty(field, "additionalProperty.options") &&
                          _get(field, "additionalProperty.options").map(
                            (option) => ({ value: option })
                          )
                        }
                      />
                    </div>
                  )}
              </Grid>
            </div>
          </Grid>
        ) : (
          <Grid
            alignItems="center"
            spacing={
              !_isEmpty(field, "additionalProperty.options") &&
              _get(field, "additionalProperty.options.length")
                ? 2
                : 0
            }
            container
          >
            <Grid
              item
              xs={
                !_isEmpty(field, "additionalProperty.options") &&
                _get(field, "additionalProperty.options.length") > 0
                  ? 6
                  : 12
              }
            >
              <FormLabelInfo className="form-label">
                {_get(field, "label")}
              </FormLabelInfo>
              <Input
                inputStyle={{
                  fontWeight: 600,
                  fontSize: 18,
                  paddingTop: 8,
                  paddingBottom: 8,
                }}
                name={_get(field, "name")}
                //placeholder={_get(field, "label")}
                value={_get(field, "value")}
                error={!_get(field, "isValid")}
                errorText={!_get(field, "isValid") && _get(field, "errorText")}
                onChange={handleChange}
                type={_get(field, "type")}
              />
            </Grid>
            <Grid
              item
              xs={
                !_isEmpty(field, "additionalProperty.options") &&
                _get(field, "additionalProperty.options.length") > 0
                  ? 6
                  : 0
              }
            >
              {!_isEmpty(field, "additionalProperty.options") &&
                _get(field, "additionalProperty.options.length") > 0 && (
                  <div style={{ width: "100%", marginTop: 38 }}>
                    {/* <h5 className="form-label">
                      {_get(field, "additionalProperty.label")}
                    </h5> */}
                    <Select
                      placeholderStyle={{ fontSize: 18, fontWeight: 600 }}
                      defaultPlaceholder={_get(
                        field,
                        "additionalProperty.label"
                      )}
                      value={_get(
                        field,
                        "additionalPropertyValue",
                        _get(field, "additionalProperty.options[0]")
                      )}
                      onChange={(value) =>
                        handleChange({
                          target: {
                            name: _get(field, "additionalProperty.name"),
                            value,
                          },
                        })
                      }
                      options={
                        !_isEmpty(field, "additionalProperty.options") &&
                        _get(field, "additionalProperty.options").map(
                          (option) => ({ value: option })
                        )
                      }
                    />
                  </div>
                )}
            </Grid>
          </Grid>
        );
      case "toggle":
        return (
          <>
            <div className={_get(field, "className")}>
              {!_isEmpty(field, "label") && (
                <FormLabelInfo className="form-label">
                  {_get(field, "label")}
                </FormLabelInfo>
              )}
              {!_isEmpty(field, "options") &&
                _get(field, "options").map((val) => (
                  <>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <CustomCheckbox
                            value={_get(listingForm, `${val}.value`) || false}
                            onChange={handleToggleChange}
                            name={val}
                            color="primary"
                            className={classes.checkboxDisplay}
                          />
                        }
                        label={_get(field, "label")}
                        className={classes.formControlCheckbox}
                      />
                    </FormGroup>
                    {/* <Typography component='h6' variant="h6">{val}</Typography> */}
                    {/* <Grid container alignItems="center">
                      <Grid item>No</Grid>
                      <Grid item>
                        <Switch
                          checked={_get(field, "value")}
                          onChange={handleToggleChange}
                          name={val}
                          color="primary"
                          fullWidth
                        />
                      </Grid>
                      <Grid item>Yes</Grid>
                    </Grid> */}
                  </>
                ))}
            </div>
          </>
        );
      case "radioGroup":
        return (
          <div style={{ width: "100%" }}>
            <FormLabelInfo className="form-label">
              {_get(field, "label")}
            </FormLabelInfo>
            <Group
              boxStyle={{ fontWeight: 600 }}
              value={_get(field, "value")}
              onChange={(value) =>
                handleChange({ target: { name: _get(field, "name"), value } })
              }
              options={
                !_isEmpty(field, "options") &&
                _get(field, "options").map((option) => ({ value: option }))
              }
            />
          </div>
        );
      case "selectDropdown":
        return (
          <div style={{ width: "100%" }}>
            <FormLabelInfo className="form-label">
              {_get(field, "label")}
            </FormLabelInfo>
            <Select
              placeholderStyle={{ fontSize: 18, fontWeight: 600 }}
              defaultPlaceholder={_get(field, "label")}
              value={_get(field, "value")}
              onChange={(value) =>
                handleChange({ target: { name: _get(field, "name"), value } })
              }
              options={
                !_isEmpty(field, "options") &&
                _get(field, "options").map((option) => ({ value: option }))
              }
            />
          </div>
        );
      case "checkbox":
        return (
          <>
            <br />
            <FormControl
              component="fieldset"
              className={classes.formControl}
              fullWidth
              style={{ padding: "0 11px" }}
            >
              <FormLabelInfo className="form-label">
                {_get(field, "label")}
              </FormLabelInfo>
              <FormGroup>
                <Grid container alignItems="center" spacing={0}>
                  {!_isEmpty(field, "options") &&
                    _get(field, "options").map((option, index) => (
                      <Grid item xs={6} className={classes.paddingRightReset}>
                        <FormControlLabel
                          control={
                            <CustomCheckbox
                              checked={
                                typeof _get(listingForm, `${option}.value`) ===
                                "undefined"
                                  ? false
                                  : _get(listingForm, `${option}.value`)
                              }
                              onChange={handleToggleChange}
                              name={option}
                              color="primary"
                              className={classes.checkboxDisplay}
                            />
                          }
                          label={option}
                          className={classes.formControlCheckbox}
                        />
                      </Grid>
                    ))}
                </Grid>
              </FormGroup>
              {/* <FormHelperText style={{ marginBottom: "5px" }}>
                Select all that apply
              </FormHelperText> */}
            </FormControl>
            <br />
          </>
        );
      default:
        return null;
    }
  };
  return handleFormComponentRender();
};
