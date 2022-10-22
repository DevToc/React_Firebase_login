import React, { useState } from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import {
  filtersSearchMapDispatchToProps,
  filtersSearchMapStateToProps,
} from "../models";
import {
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import {
  globalConstants,
  updateFormStore,
  globalUtils,
  updateFormProperty,
} from "../../../utils";
import { filterprops, formConstants } from "../utils";
import _includes from "lodash/includes";
import PropTypes from "prop-types";
import CheckboxRectangle from "../../../components/CheckboxRectangle/CheckboxRectangle";
import CheckboxCircle from "../../../components/CheckboxCircle/CheckboxCircle";
import Input from "../../../components/Input-component/InputComponent";
import Select from "../../../components/Select/Select";
import { LocationComponent } from "../../../components";
import { isGoogleMapsEnabled } from "../../../configs/appsettings.json";
import { Geolocation } from "@ionic-native/geolocation";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  formControl: {
    marginTop: theme.spacing(0),
  },
  alignFilters: {
    marginLeft: "0",
  },
  marginForPriceRange: {
    marginRight: "5px",
    marginTop: "0px",
  },
  label: {
    fontWeight: "600",
    fontSize: 18,
    color: "#001D48",
    margin: 0,
    marginBottom: 12,
    marginTop: 10,
  },
  justifyBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 23,
  },
}));

const useFormControlStyles = makeStyles({
  label: {
    color: "#001D48",
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: "16px !important",
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

const FiltersSearchComponent = ({
  generalFilters,
  searchForm,
  homeForm,
  fetchProductList,
  setFormData,
  additionalFiltersForm,
  handleClose,
  anchor,
  customFilters,
  customFiltersForm,
  wantedList,
  clearProductList,
  options,
  fetchLocation,
  getUserDetails
}) => {
  const classes = useStyles();
  const formControlStyles = useFormControlStyles();

  const thirdLayer = homeForm?.thirdLayerCategory?.value;

  const [selectedCategoryParrentId, setSelectedCategoryParrentId] = useState(
    thirdLayer
      ? thirdLayer.parent_id
      : _get(homeForm, "secondarySelectedParent.value")
  );

  const selectedParentCategory = options.children?.find(
    (option) => option.id === selectedCategoryParrentId
  );

  const range =
    !_isEmpty(generalFilters) &&
    generalFilters
      .find((fil) => fil.key === "price-range")
      .value.map((val, key) => ({
        value: parseInt(val),
        label: val,
        id: key,
      }));

  const handleChangeCheckBox = ({ name, checked }, key) => {
    updateFormStore({
      form: "searchForm",
      field: name,
      value: {
        key,
        value: checked,
      },
    });
  };

  const handleChangeForSelect = ({ name, value }) => {
    updateFormStore({ form: "homeForm", field: name, value });
  };

  const handleChangeCustomCheckBox = ({ name, checked, category }) => {
    updateFormStore({
      form: "customFiltersForm",
      field: name,
      value: checked,
      category,
    });
  };

  const handleClick = (e) => {
    clearProductList();
    if (handleClose) {
      handleClose(anchor);
    }
    const payload = {
      keyword: _get(homeForm, "searchField.value"),
      listType: _get(homeForm, "listType.value"),
      type: _get(homeForm, "selectedType.value", "rent"),
      latitude: _get(homeForm, "latitude.value"),
      longitude: _get(homeForm, "longitude.value"),
      categoryId: _get(homeForm, "selectedCategoryId.value"),
      radius: _get(homeForm, "filterRadius.value", 5000),
      sortBy: _get(homeForm, "sortBy.value"),
    };
    const filterPayload = [];
    if (
      _get(searchForm, "minRange.value") ||
      _get(searchForm, "maxRange.value")
    ) {
      const priceRange = {
        key: "price-range",
        value: [
          parseInt(
            _get(searchForm, "minRange.value")
              ? _get(searchForm, "minRange.value")
              : _get(range[0], 'value', 0)
          ),
          parseInt(
            _get(searchForm, "maxRange.value")
              ? _get(searchForm, "maxRange.value")
              : _get(range[1], 'value', 0)
          ),
        ],
      };
      filterPayload.push(priceRange);
    }
    const map = new Map();
    for (const key in { ...searchForm, ...additionalFiltersForm }) {
      if (!_includes(["minRange", "maxRange"], key)) {
        if (!!_get(searchForm, `${key}.value.value`)) {
          map.set(key, _get(searchForm, `${key}.value.key`));
        }
      }
    }
    const additionalFiltersMap = new Map();
    for (const key in customFiltersForm) {
      if (!!_get(customFiltersForm, `${key}.value`)) {
        const keyValArray = key.split("_");
        if (keyValArray.length > 1) {
          if (additionalFiltersMap.has(keyValArray[1])) {
            const currentList = additionalFiltersMap.get(keyValArray[1]);
            currentList.push(keyValArray[0]);
            additionalFiltersMap.delete(keyValArray[1]);
            additionalFiltersMap.set(keyValArray[1], currentList);
          } else {
            additionalFiltersMap.set(keyValArray[1], [keyValArray[0]]);
          }
        }
      }
    }

    filterprops.forEach((val) => {
      const value = val.key;
      let valuesInMap = [...map.entries()]
        .filter(({ 1: v }) => v === value)
        .map(([k]) => k);
      if (!_isEmpty(valuesInMap)) {
        filterPayload.push({
          key: value,
          value: valuesInMap,
        });
      }
    });
    const customFiltersPayload = [];
    additionalFiltersMap.forEach((value, key, map) => {
      customFiltersPayload.push({
        key,
        value,
      });
    });
    payload.customFilters = customFiltersPayload;
    payload.generalFilters = filterPayload;

    fetchProductList({
      offset: 0,
      limit: globalConstants.paginationLimit,
      payload,
    });
    if (window.screen.width < 700) {
      globalUtils.scrollTo("search-header");
    }
  };

  const handleClear = (e) => {
    setFormData(formConstants);
    setFormData({
      homeForm: {
        ...homeForm,
        selectedCategoryId: { ..._get(homeForm, 'selectedCategoryId'), value: '' },
        listType: { ..._get(homeForm, 'listType'), value: 'default' },
        selectedCategoryName: { ..._get(homeForm, 'selectedCategoryName'), value: '' },
        selectedParent: { ..._get(homeForm, 'selectedParent'), value: '' },
        secondarySelectedParent: { ..._get(homeForm, 'secondarySelectedParent'), value: '' },
        longitude: { ..._get(homeForm, 'longitude'), value: '' },
        latitude: { ..._get(homeForm, 'latitude'), value: '' },
        radius: { ..._get(homeForm, 'radius'), value: '' },
        sortBy: { ..._get(homeForm, 'radius'), value: 'New' },
        thirdLayerCategory: { ..._get(homeForm, 'thirdLayerCategory'), value: false},
        selectedLocation:{ ..._get(homeForm, 'selectedLocation'), value: '' },
        locationArea:{ ..._get(homeForm, 'locationArea'), value: '' },
        locationCity:{ ..._get(homeForm, 'locationCity'), value: '' },
        searchBy: { ..._get(homeForm, 'searchBy'), value: '' },
      }
    })
    if (handleClose) {
      handleClose(anchor);
    }
    const payload = {
      keyword: _get(homeForm, "searchField.value"),
      listType: 'default',
      type: _get(homeForm, "selectedType.value", "rent"),
      categoryId: '',
      sortBy: 'New',
    };
    fetchProductList({
      offset: 0,
      limit: globalConstants.paginationLimit,
      payload,
    });
  };

  const handleRadiusChange = (value) => {
    if (value) {
      if (value !== "100+") {
        updateFormStore({
          form: "homeForm",
          field: "filterRadius",
          value: value * 1000,
        });
      } else if (value === "100+") {
        updateFormStore({
          form: "homeForm",
          field: "filterRadius",
          value: 150000,
        });
      }
    } else {
      updateFormStore({ form: "homeForm", field: "filterRadius", value: 0 });
    }
  };

  function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  const getPriceLabel = () => {
    if (_get(homeForm, "selectedType.value") === "wanted") {
      const wantedParentCategoryName =
        _get(wantedList, "length") > 0 &&
        wantedList.find(
          (val) => val.id === _get(homeForm, "secondarySelectedParent.value")
        );
      if (
        _get(homeForm, "listType.value") === "Employment" ||
        _get(wantedParentCategoryName, "name") === "Employment"
      ) {
        return "Salary";
      }
    }
    return "Price range";
  };

  const handleParentCategoryChange = (id) => {
    setFormData(formConstants);
    updateFormStore({
      form: "homeForm",
      field: "thirdLayerCategory",
      value: false,
    });

    if (id === 1) {
      globalUtils.clearCategory();

      setSelectedCategoryParrentId(1);
      return;
    } else if (
      _isEmpty(options.children.find((option) => option.id === id)?.children)
    ) {
      handleCategoryChange(options.children.find((option) => option.id === id));
    } else {
      const category = options.children.find((option) => option.id === id);
      if (!_isEmpty(category)) {
        updateFormStore({
          form: "homeForm",
          field: "listType",
          value: category.name,
        });
        updateFormStore({
          form: "homeForm",
          field: "selectedCategoryId",
          value: category.id,
        });
        updateFormStore({
          form: "homeForm",
          field: "selectedCategoryName",
          value: category.name,
        });
      }
    }
    setSelectedCategoryParrentId(id);
  };

  const handleCategoryChange = (element) => {
    if (element.id === 1) {
      updateFormStore({
        form: "homeForm",
        field: "selectedCategoryId",
        value: "",
      });
      updateFormStore({
        form: "homeForm",
        field: "selectedCategoryName",
        value: "",
      });

      return;
    }

    updateFormStore({
      form: "homeForm",
      field: "selectedCategoryName",
      value: "",
    });

    if (element.children?.length > 0) {
      updateFormStore({
        form: "homeForm",
        field: "thirdLayerCategory",
        value: element,
      });

      return;
    }

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
      value: _get(homeForm, "selectedType.value"),
    });
  };

  const handleChangeForPrice = (e) => {
    const { value, name } = e.target;
    if (globalUtils.isFloat(value)) {
      updateFormStore({ form: "searchForm", field: name, value: value });
    }
  };

  const handleBlurForPrice = (e) => {
    const { value } = e.target;
    if (_get(searchForm, "minRange.value") && _get(searchForm, "maxRange.value") === _get(searchForm, "minRange.value")) {
      updateFormProperty({ form: "searchForm", field: "maxRange", property: "isValid", value: false });
      return;
    }
    if (
      value &&
      parseFloat(_get(searchForm, "maxRange.value")) >= 0 &&
      parseFloat(_get(searchForm, "minRange.value")) >= 0
    ) {
      if (parseFloat(_get(searchForm, "maxRange.value")) < parseFloat(_get(searchForm, "minRange.value"))) {
        updateFormProperty({ form: "searchForm", field: "maxRange", property: "isValid", value: false });
        updateFormProperty({ form: "searchForm", field: "minRange", property: "isValid", value: false });
      }
      else if (globalUtils.isFloat(value)) {
        updateFormProperty({ form: "searchForm", field: "maxRange", property: "isValid", value: true });
        updateFormProperty({ form: "searchForm", field: "minRange", property: "isValid", value: true });
      }
    }
    if (!value) {
      updateFormProperty({ form: "searchForm", field: "maxRange", property: "isValid", value: true });
      updateFormProperty({ form: "searchForm", field: "minRange", property: "isValid", value: true });
    }
  };

  const handleLocationChange = (value) => {
    if (isGoogleMapsEnabled) {
      updateFormStore({ form: "homeForm", field: "searchBy", value });
    }
  };

  const handleLocationSelect = (value) => {
    if (isGoogleMapsEnabled) {
      geocodeByAddress(value)
        .then(async (results) => {
          const res = await getLatLng(results[0]);
          if (!_isEmpty(res)) {
            try {
              updateFormStore({
                form: "homeForm",
                field: "latitude",
                value: _get(res, "lat"),
              });
              updateFormStore({
                form: "homeForm",
                field: "longitude",
                value: _get(res, "lng"),
              });
              updateFormStore({
                form: "homeForm",
                field: "selectedLocation",
                value,
              });
              updateFormStore({
                form: "homeForm",
                field: "searchBy",
                value: value,
              });
            } catch (err) {
              console.error("error updating location to store");
            }
          }
        })
        .catch((error) => console.error("Error", error));
    }
  };

  const handleCurrentLocationClick = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      updateFormStore({
        form: "homeForm",
        field: "latitude",
        value: _get(position, "coords.latitude"),
      });
      updateFormStore({
        form: "homeForm",
        field: "longitude",
        value: _get(position, "coords.longitude"),
      });
      fetchLocation({
        latitude: _get(position, "coords.latitude"),
        longitude: _get(position, "coords.longitude"),
      });
    } catch (e) {
      window.alert("Search with location for better results");
    }
  };

  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };
  return (
    <div className="filters-box">
      {!_isEmpty(range) && _get(range, "length", 0) === 2 && (
        <div className={classes.alignFilters}>
          <h5 className={classes.label}>Sort By</h5>
          <Select
            value={_get(homeForm, "sortBy.value")}
            onChange={(val) =>
              handleChangeForSelect({ name: "sortBy", value: val })
            }
            options={[
              { label: "Newest First", value: "New" },
              { label: "Popularity", value: "Popularity" },
              { label: "Price: High to Low", value: "Price_Desc" },
              { label: "Price: Low to High", value: "Price_Asc" },
            ]}
          />
          <h5 className={classes.label}>Refine</h5>
          {options.children && (
            <Select
              style={{ marginBottom: 8 }}
              value={selectedCategoryParrentId || _get(homeForm, "selectedCategoryId.value")}
              onChange={handleParentCategoryChange}
              options={[
                { label: "All Categories", value: 1 },
                ...options.children.map((option) => ({
                  label: option.name,
                  value: option.id,
                })),
              ]}
            />
          )}
          {selectedCategoryParrentId &&
            selectedCategoryParrentId !== 1 &&
            !_isEmpty(selectedParentCategory?.children) && (
              <Select
                style={{ marginBottom: 8 }}
                defaultPlaceholder="Subcategory"
                value={
                  thirdLayer
                    ? thirdLayer.id
                    : _get(homeForm, "selectedCategoryId.value")
                }
                onChange={(value) =>
                  handleCategoryChange(
                    selectedParentCategory?.children.find(
                      (option) => option.id === value
                    )
                  )
                }
                options={selectedParentCategory.children.map((option) => ({
                  label: option.name,
                  value: option.id,
                }))}
              />
            )}
          {thirdLayer &&
            homeForm?.selectedCategoryName?.value !== "Other Tools" &&
            !_isEmpty(thirdLayer?.children) && (
              <Select
                style={{ marginBottom: 8 }}
                defaultPlaceholder="Subcategory"
                value={_get(homeForm, "selectedCategoryId.value")}
                onChange={(value) =>
                  handleCategoryChange(
                    thirdLayer?.children.find((option) => option.id === value)
                  )
                }
                options={thirdLayer.children.map((option) => ({
                  label: option.name,
                  value: option.id,
                }))}
              />
            )}
          <h5 className={classes.label}>Location</h5>
          <LocationComponent
            isSearchBySelectedLocation={false}
            userDetails={getUserDetails}
            formSearchByFieldValue={_get(homeForm, "searchBy.value")}
            handleChange={handleLocationChange}
            handleSelect={handleLocationSelect}
            placeholder="Set Location"
            useCurrentLocation
            handleCurrentLocationClick={handleCurrentLocationClick}
            style={{ marginBottom: 8 }}
            inputStyle={{
              paddingTop: 7,
              paddingBottom: 7,
              fontSize: 18,
              fontWeight: 600,
            }}
            containerStyle={classes.locationContainer}
          />
          <h5 className={classes.label}>{getPriceLabel()}</h5>
          <div className="price-component">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Input
                  inputStyle={{ fontWeight: 600, fontSize: 18 }}
                  name={_get(searchForm, `minRange.name`)}
                  placeholder="From"
                  value={_get(searchForm, `minRange.value`)}
                  onChange={handleChangeForPrice}
                  onBlur={handleBlurForPrice}
                  error={!_get(searchForm, `minRange.isValid`)}
                  errorText={
                    !_get(searchForm, `minRange.isValid`) &&
                    _get(searchForm, `minRange.errorText`)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  inputStyle={{ fontWeight: 600, fontSize: 18 }}
                  name={_get(searchForm, `maxRange.name`)}
                  placeholder="To"
                  value={_get(searchForm, `maxRange.value`)}
                  onChange={handleChangeForPrice}
                  onBlur={handleBlurForPrice}
                  error={!_get(searchForm, `maxRange.isValid`)}
                  errorText={
                    !_get(searchForm, `maxRange.isValid`) &&
                    _get(searchForm, `maxRange.errorText`)
                  }
                />
              </Grid>
            </Grid>
            {/* <Range
              min={_get(range[0], 'value', 0)}
              max={_get(range[1], 'value', 0)}
              onChange={handleChangeForPrice}
              plusValueLabel
              value={[
                  parseInt(_get(searchForm, "minRange.value", 0)),
                  parseInt(_get(searchForm, "maxRange.value", 0)),
              ]}
              moneyValueLabel
            />
            <div style={{ marginTop: -5, height: 20 }} className={classes.justifyBetween}>
              <span
                style={{ fontSize: 17, fontWeight: "500" }}
                className={classes.label}
              >
                Min
              </span>
              <span
                style={{ fontSize: 17, fontWeight: "500" }}
                className={classes.label}
              >
                Max
              </span>
            </div> */}
          </div>
        </div>
      )}
      {_get(homeForm, "latitude.value") && (
        <div className={`${classes.alignFilters} radius-filter`}>
          <h5 className={classes.label}>Within</h5>
          <Select
            value={_get(homeForm, "filterRadius.value") / 1000}
            onChange={(value) => handleRadiusChange(value)}
            options={globalConstants.locationOptions.map((option) => ({
              label: option.title,
              value: option.value,
            }))}
          />
        </div>
      )}
      {_get(filterprops, "length", 0) > 0 &&
        filterprops.map((val, key) => {
          const currentFilter =
            !_isEmpty(generalFilters) &&
            generalFilters.find((v) => v.key === val.key);
          return (
            _get(currentFilter, "value.length", 0) > 0 && (
              <>
                <div
                  style={{ marginBottom: 12 }}
                  className={classes.alignFilters}
                >
                  <h5 className={classes.label}>{val.value}</h5>
                  <div className={classes.formControl}>
                    <Grid container spacing={2}>
                      {!_isEmpty(currentFilter, "value") &&
                        _get(currentFilter, "value.length", 0) > 0 &&
                        currentFilter.value.map((fil, key) => (
                          <>
                            <Grid item xs={6}>
                              <CheckboxRectangle
                                label={fil}
                                checked={_get(
                                  searchForm,
                                  `${fil}.value.value`,
                                  false
                                )}
                                onChange={() =>
                                  handleChangeCheckBox(
                                    {
                                      name: fil,
                                      checked: !_get(
                                        searchForm,
                                        `${fil}.value.value`,
                                        false
                                      ),
                                    },
                                    val.key
                                  )
                                }
                              />
                            </Grid>
                          </>
                        ))}
                    </Grid>
                  </div>
                </div>
              </>
            )
          );
        })}
      {_get(customFilters, "length", 0) > 0 &&
        selectedCategoryParrentId !== 1 &&
        customFilters.map((currentFilter) => {
          return (
            <div className={classes.alignFilters}>
              <h5 className={classes.label}>{currentFilter.label}</h5>
              <div className={classes.formControl}>
                <Grid
                  container
                  justify={_get(currentFilter, "options.length", 0) === 1 ? "" : "space-around"}
                  spacing={2}
                  alignItems="center"
                >
                  {!_isEmpty(currentFilter, "options") &&
                    _get(currentFilter, "options.length", 0) > 0 &&
                    currentFilter.options.map((fil, id) => (
                      <>
                        {(parseInt(fil.label) || parseInt(fil.label) === 0) &&
                          fil.label !== "3-wheeler" ? ( //quickfix for motor bike
                            <Grid item xs={2}>
                              <CheckboxCircle
                                checked={_get(
                                  customFiltersForm,
                                  `${fil.label}_${currentFilter.label}.value`,
                                  false
                                )}
                                onChange={() =>
                                  handleChangeCustomCheckBox({
                                    name: `${fil.label}_${currentFilter.label}`,
                                    checked: !_get(
                                      customFiltersForm,
                                      `${fil.label}_${currentFilter.label}.value`,
                                      false
                                    ),
                                    category: currentFilter.label,
                                  })
                                }
                                label={fil.label}
                              />
                            </Grid>
                          ) : (
                            <>
                              {currentFilter.options.length <= 2 ? (
                                <Grid item xs={6}>
                                  <CheckboxRectangle
                                    checked={_get(
                                      customFiltersForm,
                                      `${fil.label}_${currentFilter.label}.value`,
                                      false
                                    )}
                                    onChange={() =>
                                      handleChangeCustomCheckBox({
                                        name: `${fil.label}_${currentFilter.label}`,
                                        checked: !_get(
                                          customFiltersForm,
                                          `${fil.label}_${currentFilter.label}.value`,
                                          false
                                        ),
                                        category: currentFilter.label,
                                      })
                                    }
                                    label={`${fil.label}`}
                                  />
                                </Grid>
                              ) : (
                                  <Grid className="last-ch" item xs={6}>
                                    <FormControlLabel
                                      control={
                                        <CustomCheckbox
                                          c
                                          checked={_get(
                                            customFiltersForm,
                                            `${fil.label}_${currentFilter.label}.value`,
                                            false
                                          )}
                                          className="filter-checkbox"
                                          onChange={() =>
                                            handleChangeCustomCheckBox({
                                              name: `${fil.label}_${currentFilter.label}`,
                                              checked: !_get(
                                                customFiltersForm,
                                                `${fil.label}_${currentFilter.label}.value`,
                                                false
                                              ),
                                              category: currentFilter.label,
                                            })
                                          }
                                          name={fil.label}
                                          color="primary"
                                        />
                                      }
                                      label={fil.label}
                                      id={id}
                                      classes={formControlStyles}
                                    />
                                  </Grid>
                                )}
                            </>
                          )}
                      </>
                    ))}
                </Grid>
              </div>
            </div>
          );
        })}

      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleClick()}
          size="small"
          style={{
            padding: "3px 0 4px 0",
            width: 244,
            fontSize: 21,
          }}
          disabled={!_get(searchForm, "maxRange.isValid")}
          key={`${!_get(searchForm, "maxRange.isValid")}`}
          id="show-results"
        >
          Show Results
        </Button>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          variant="outlined"
          onClick={handleClear}
          size="small"
          style={{
            width: 120,
            fontSize: 21,
            color: "black",
          }}
          disabled={!_get(searchForm, "maxRange.isValid")}
          key={`${!_get(searchForm, "maxRange.isValid")}`}
        >
          Reset
        </Button>
      </div>
      <br />
      <br />
    </div>
  );
};

export const FiltersSearch = connect(
  filtersSearchMapStateToProps,
  filtersSearchMapDispatchToProps
)(FiltersSearchComponent);
