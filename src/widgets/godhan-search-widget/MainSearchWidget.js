/* eslint-disable*/
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _includes from "lodash/includes";
import { Grid, useTheme } from "@material-ui/core";
import { ProductListingSearch } from "./component";
import {
  mainSearchMapDispatchToProps,
  mainSearchMapStateToProps,
} from "./models";
import { filterprops, formConstants, getAdditionalFilters, getRadiusValueForFilters } from "./utils";
import { updateFormStore, globalUtils } from "../../utils";
import { LoaderComponent, Notification, Search } from "../../components";
import { formConstants as homeFormConstants } from "../godhan-home-widget/utils";
import { mainSearchStyle } from "./style";
import FilterIcon from "../../assets/icons/filter";
import { BaseLayout } from "../../components/layout/BaseLayout";
import Filters from "./component/Filters";
import { clearProductList } from "../../services";

const SearchWidget = ({
  setFormData,
  //generalFilters,
  loader,
  rentData,
  sellData,
  fetchFilterOptions,
  fetchProductList,
  productList,
  homeForm,
  filterOptions,
  //chatStatus,
  clearInterest,
  //fetchAll,
  fetchFavouriteIds,
  isAuthorized,
  //userMessage,
  wantedData,
  rentList,
  sellList,
  searchForm,
  customFiltersForm,
  additionalFiltersForm,
}) => {
  //const [open, setOpen] = useState(false);
  const [customFilters, setCustomFilters] = useState([]);
  const [filtersOpen, setOpen] = useState(false);
  const [isKeyboardOpened, setIsKeyBoardOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setFormData(formConstants);
    if (isAuthorized) {
      fetchFavouriteIds();
    }
    if (_isEmpty(homeForm)) {
      setFormData(homeFormConstants);
      updateFormStore({
        form: "homeForm",
        field: "selectedType",
        value: "rent",
      });
    }
    updateFormStore({ form: "homeForm", field: "offset", value: 0 });
    if (_isEmpty(productList) || location.state?.redirect) {
      handleSearch();
    }
    if(_get(homeForm, "radius.value") && +_get(homeForm, "radius.value") > 0){
      updateFormStore({ form: 'homeForm', field: 'filterRadius', value: getRadiusValueForFilters(+_get(homeForm, "radius.value"))})
    }

    // if (_isEmpty(filterOptions)) {
    //   fetchFilterOptions({
    //     listType: _get(homeForm, "listType.value"),
    //     keyword: _get(homeForm, "searchField.value"),
    //     type: _get(homeForm, "selectedType.value", "rent"),
    //   });
    // }
  }, []);

  useEffect(() => {
    if (
      !_includes(["default", "favorites"], _get(homeForm, "listType.value"))
    ) {
      const mappedObj = getAdditionalFilters(homeForm, rentList, sellList);
      if (!_isEmpty(mappedObj)) {
        // if (_get(homeForm, "listType.value") === 'Real-Estate & Space') {
        if (
          _includes(
            [
              "Apartment",
              "House",
              "Condo & Granny Flats",
              "Roommates & Share Accommodation",
              "Car",
              "Motor Bike",
              "Snowmobile",
              "Boats, Kayak & Jetski",
              "RV/Caravan",
              "Trailers & Boxes",
              "Vacation Rentals",
              "Services",
            ],
            _get(homeForm, "listType.value")
          )
        ) {
          setCustomFilters(mappedObj);
        } else setCustomFilters();
      } else {
        setCustomFilters();
      }
    } else {
      setCustomFilters();
    }
  }, [_get(homeForm, "listType.value")]);

  const getData = () => {
    switch (_get(homeForm, "selectedType.value")) {
      case "sell":
        return sellData;
      case "rent":
        return rentData;
      case "wanted":
        return wantedData;
      default:
        return [];
    }
  };

  const handleSearch = (type, { range, sortBy } = {}, skipLocation = false) => {
    clearProductList();
    if (_isEmpty(searchForm)) {
      setFormData(formConstants);
      updateFormStore({ form: "homeForm", field: "sortBy", value: "New" });
    }
    fetchFilterOptions({
      type: _get(homeForm, "selectedType.value", "rent"),
      listType: _get(homeForm, "listType.value"),
      categoryId: _get(homeForm, "selectedCategoryId.value", null),
    });
    const payload = {
      listType:
        type === "withoutCategory" ? null : _get(homeForm, "listType.value"),
      type: _get(homeForm, "selectedType.value", "rent"),
      categoryId:
        type === "withoutCategory"
          ? null
          : _get(homeForm, "selectedCategoryId.value", null),
      sortBy: sortBy || _get(homeForm, "sortBy.value", "New"),
    };
    if (!skipLocation) {
      if (
        _get(homeForm, "latitude.value") &&
        _get(homeForm, "longitude.value")
      ) {
        payload.latitude = _get(homeForm, "latitude.value");
        payload.longitude = _get(homeForm, "longitude.value");
        payload.radius = 5000;
      }
      if (
        _get(homeForm, "radius.value") &&
        _get(homeForm, "radius.value") !== 60
      ) {
        payload.radius = parseInt(_get(homeForm, "radius.value"), 10) * 1000;
      }
      if (_get(homeForm, "radius.value") === 60) {
        payload.radius = 150000;
      }
    }
    const filterPayload = [];
    if (!_isEmpty(range)) {
      filterPayload.push({
        key: "price-range",
        value: [range[0], range[1]],
      });
    } else if (
      _get(searchForm, "minRange.value") ||
      _get(searchForm, "maxRange.value")
    ) {
      const priceArray = [];
      if (!_isEmpty(filterOptions, "generalFilters")) {
        const prices = filterOptions.generalFilters.filter(
          (val) => val.key === "price-range"
        )[0];
        priceArray.push(prices.value[0]);
        priceArray.push(prices.value[1]);
      }
      const priceRange = {
        key: "price-range",
        value: [
          parseInt(
            _get(searchForm, "minRange.value")
              ? _get(searchForm, "minRange.value")
              : priceArray[0]
          ),
          parseInt(
            _get(searchForm, "maxRange.value")
              ? _get(searchForm, "maxRange.value")
              : priceArray[1]
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
    payload.customFilters =
      type === "withoutCategory" ? [] : customFiltersPayload;
    if (type === "withoutCategory") {
      setFormData({ customFiltersForm: formConstants.customFiltersForm });
    }
    payload.generalFilters = filterPayload;
    fetchProductList({
      offset: 0,
      payload: {
        keyword: _get(homeForm, "searchField.value", null),
        ...payload,
      },
    });
    // if (window.screen.width < 700) {
    globalUtils.scrollTo("search-header");
    // }
  };

  return (
    <BaseLayout isAuthorized={isAuthorized} isKeyboardOpened={isKeyboardOpened}>
      <StyledSearch style={{ paddingBottom: 70 }} theme={useTheme()}>
        <div
          style={{
            position: "sticky",
            zIndex: 5,
            backgroundColor: "#f8f8f9",
            padding: 10,
          }}
        >
          <Search
            style={{ marginTop: 0 }}
            options={getData()}
            homeForm={homeForm}
            handleSearch={handleSearch}
            setIsKeyBoardOpen={setIsKeyBoardOpen}
          />
          <div className="filters">
            <div
              onClick={() => setOpen(true)}
              style={{ backgroundColor: "#2B579A", marginRight: 4 }}
              className="filter"
              id="filterIcon"
            >
              <FilterIcon />
              <div style={{ marginLeft: 6 }}>Filters</div>
            </div>
            <Filters
              searchForm={searchForm}
              customFiltersForm={customFiltersForm}
              handleSearch={handleSearch}
              homeForm={homeForm}
              filterOptions={filterOptions}
            />
          </div>
        </div>

        <Grid
          container
          justify="center"
          spacing={3}
          style={{ maxWidth: "100%", margin: 0 }}
        >
          {/* <Hidden mdDown>
            <Grid item sm={3} md={3} lg={3}>
              <FiltersSearch customFilters={customFilters} />
            </Grid>
          </Hidden> */}
          <Grid item xs={12} style={{ padding: 0 }}>
            <ProductListingSearch
              options={getData()}
              filtersOpen={filtersOpen}
              setOpen={setOpen}
              customFilters={customFilters}
            />
          </Grid>
        </Grid>
      </StyledSearch>
      <LoaderComponent loader={loader} />
    </BaseLayout>
  );
};

const StyledSearch = mainSearchStyle;

export const MainSearchWidget = connect(
  mainSearchMapStateToProps,
  mainSearchMapDispatchToProps
)(SearchWidget);
