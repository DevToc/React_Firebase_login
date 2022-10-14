/* eslint-disable*/
import React, { useState } from "react";
import _get from "lodash/get";
import _isEmpty from 'lodash/isEmpty'
import Filter from "./Filter";
import { globalUtils, updateFormStore } from "../../../utils";
import { Modal, Fade, Backdrop } from "@material-ui/core";
import Range from "../../../components/Range/Range";

const sortByOptions = [
  { label: "Newest First", value: "New" },
  { label: "Popularity", value: "Popularity" },
  { label: "Price: High to Low", value: "Price_Desc" },
  { label: "Price: Low to High", value: "Price_Asc" },
];

const Filters = ({
  homeForm = {},
  searchForm = {},
  customFiltersForm = {},
  handleSearch,
  filterOptions
}) => {
  const [isPriceModalOpen, setPriceModalOpen] = useState(false);
  const [isSortByOpen, setSortByOpen] = useState(false);

  const range = !_isEmpty(filterOptions, 'generalFilters') && filterOptions.generalFilters
    .find((fil) => fil.key === "price-range").value
    .map((val, key) => ({
      value: parseInt(val), label: val, id: key,
    }));


  const selectedCustomFilters = [];
  const selectedGeneralFilters = [];

  const handleChangeForPrice = (e, [minPrice, maxPrice]) => {
    updateFormStore({ form: "searchForm", field: "minRange", value: minPrice });
    updateFormStore({ form: "searchForm", field: "maxRange", value: maxPrice });
    handleSearch(null, { range: [minPrice, maxPrice] });
    setPriceModalOpen(false);
  };

  const customFiltersArr = Object.entries(customFiltersForm)
    .map(([key, item]) => {
      if (item.value) {
        return {
          key,
          value: item.value,
          category: item.category,
        };
      }
    })
    .filter((filter) => typeof filter !== "undefined");

  customFiltersArr.forEach((filter) => {
    if (selectedCustomFilters.find((category) => category === filter.category))
      return;
    selectedCustomFilters.push(filter.category);
  });

  const generalFilterTypesHelper = [
    "condition",
    "offeredBy",
    "rate",
    "purpose",
  ];
  const generalFiltersArr = Object.entries(searchForm)
    .map(([key, item]) => {
      if (
        generalFilterTypesHelper.includes(item.value.key) &&
        item.value.value
      ) {
        return {
          key,
          value: item.value,
        };
      }
    })
    .filter((item) => typeof item !== "undefined");

  generalFiltersArr.forEach((filter) => {
    if (
      selectedGeneralFilters.find((category) => category === filter.value.key)
    )
      return;
    selectedGeneralFilters.push(filter.key);
  });

  const handleClearCustomFilterCategory = (category) => {
    customFiltersArr.forEach((filter) => {
      if (filter.category === category) {
        updateFormStore({
          form: "customFiltersForm",
          field: filter.key,
          value: false,
        });
      }
    });
    handleSearch();
  };

  const handleChangeForSelect = ({ name, value }) => {
    updateFormStore({ form: "homeForm", field: name, value });
    handleSearch(null, { sortBy: value });
    setSortByOpen(false);
  };

  const handleClearGeneralFilterCategory = (category) => {
    generalFiltersArr.forEach((filter) => {
      if (filter.key === category) {
        updateFormStore({
          form: "searchForm",
          field: filter.key,
          value: { key: filter.value.key, value: false },
        });
        document.getElementById('filterIcon').click();
      }
    });
    setTimeout(() => {
      document.getElementById('show-results').click();
    }, 10)
  };

  const handleClearPriceFilters = () => {
    updateFormStore({ form: "searchForm", field: "minRange", value: '' });
    updateFormStore({ form: "searchForm", field: "maxRange", value: '' });
    handleSearch(null, { range: [parseInt(_get(range[0], 'value', 0)), parseInt(_get(range[1], 'value', 0))] });
    setPriceModalOpen(false);
  }

  const getMaxMinRange = () => {
    let min = 0, max = 0;
    min = _get(searchForm, "minRange.value", "");
    max = _get(searchForm, "maxRange.value", "");
    if (parseInt(_get(range[0], 'value', 0)) === parseInt(min, 10)
      && parseInt(_get(range[1], 'value', 0)) === parseInt(max, 10)) {
      return '';
    }
    if (!min && !max) {
      return '';
    }
    return `${globalUtils.getCountryProperty("currency")} ${min} - ${globalUtils.getCountryProperty("currency")} ${max}`
  }

  const getSortByLabel = () => {
    if (_get(homeForm, 'sortBy.value')) {
      return sortByOptions.find((val) => val.value === _get(homeForm, 'sortBy.value'))?.label
    }
  }

  const handleClearLocation = () => {
    updateFormStore({ form: 'homeForm', field: 'latitude', value: '' })
    updateFormStore({ form: 'homeForm', field: 'longitude', value: '' })
    updateFormStore({ form: 'homeForm', field: 'radius', value: '' })
    updateFormStore({ form: 'homeForm', field: 'selectedLocationCountryCode', value: '' })
    updateFormStore({ form: 'homeForm', field: 'selectedLocation', value: '' })
    updateFormStore({ form: 'homeForm', field: 'searchBy', value: '' })
    handleSearch(null, {}, true)
  }

  return (
    <>
      {_get(homeForm, "selectedCategoryName.value") && (
        <Filter
          onClose={() => { globalUtils.clearCategory(); handleSearch("withoutCategory") }}
          text={_get(homeForm, "selectedCategoryName.value")}
        />
      )}
      <div style={{ position: "relative" }}>
        <Filter
          onClick={() => setSortByOpen((val) => !val)}
          text={getSortByLabel() || "Sort By"}
          isGlobalFilter
          showCloseIcon={!!getSortByLabel()}
          onClose={() => {
            handleChangeForSelect({ value: 'New', name: "sortBy" });
            setPriceModalOpen(false)
          }}
        />
        {isSortByOpen && (
          <div
            style={{
              position: "absolute",
              backgroundColor: "red",
              padding: 30,
            }}
          ></div>
        )}
      </div>
      {
        _get(homeForm, 'selectedLocation.value') && (
          <Filter
            text={_get(homeForm, 'selectedLocation.value')}
            key="location"
            onClose={handleClearLocation}
          />
        )
      }

      {getMaxMinRange() && <Filter
        text={getMaxMinRange()}
        onClose={() => { handleClearPriceFilters(); }}
        isGlobalFilter
        showCloseIcon={!!getMaxMinRange()}
      />}

      {selectedGeneralFilters.length > 0 &&
        selectedGeneralFilters.map((filter) => (
          <Filter
            key={filter}
            text={filter}
            onClose={() => handleClearGeneralFilterCategory(filter)}
          />
        ))}
      {selectedCustomFilters.length > 0 &&
        selectedCustomFilters.map((filter) => (
          <Filter
            text={filter}
            key={filter}
            onClose={() => handleClearCustomFilterCategory(filter)}
          />
        ))}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{ padding: 40 }}
        fullScreen
        open={isPriceModalOpen}
        onClose={() => setPriceModalOpen(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
      >
        <Fade in={isPriceModalOpen}>
          <div style={{ position: "relative", top: "45%", outline: "none" }}>
            <Range
              min={parseInt(_get(range[0], 'value', 0))}
              max={parseInt(_get(range[1], 'value', 0))}
              onChange={handleChangeForPrice}
              plusValueLabel
              value={[
                parseInt(_get(searchForm, "minRange.value")) || 0,
                parseInt(_get(searchForm, "maxRange.value")) || 10000,
              ]}
              transparentLabel
              moneyValueLabel
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: 18,
                  color: "#001D48",
                  margin: 0,
                  marginBottom: 12,
                  marginTop: 10,
                  color: "white",
                }}
              >
                Min
              </span>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: 18,
                  color: "#001D48",
                  margin: 0,
                  marginBottom: 12,
                  marginTop: 10,
                  color: "white",
                }}
              >
                Max
              </span>
            </div>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{ padding: 40 }}
        fullScreen
        open={isSortByOpen}
        onClose={() => setSortByOpen(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
      >
        <Fade in={isSortByOpen}>
          <div
            style={{
              paddingLeft: 20,
              paddingBottom: 12,
              background: "white",
              border: "2px solid rgba(43, 87, 154, 0.7)",
              borderRadius: 5,
              position: "absolute",
              width: "100%",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              marginTop: -3,
              position: "relative",
              top: "30%",
              outline: "none",
            }}
          >
            {sortByOptions.map((option) => (
              <span
                key={option.value}
                onClick={() => {
                  handleChangeForSelect({
                    value: option.value,
                    name: "sortBy",
                  });
                }}
                style={{
                  fontSize: 18,
                  color: "#344654",
                  fontWeight: "500",
                  marginTop: 8,
                  cursor: "pointer",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {option.label || option.value}
              </span>
            ))}
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Filters;
