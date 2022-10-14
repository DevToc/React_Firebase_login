import * as _ from 'lodash'
import { sellprops, rentalProps, FieldType } from '../../godhan-post-listing-widget/utils';
import { filterprops } from './FilterComponent.props';

const allowedFilters = [FieldType.RADIO, FieldType.TOGGLE, FieldType.SELECT_DROPDOWN, FieldType.CHECKBOX];

export const getAdditionalFilters = (homeForm, rentList, sellList) => {
  const selectedType = _.get(homeForm, 'selectedType.value');
  const selectedCategory = _.get(homeForm, 'listType.value');
  const selectedParent = _.get(homeForm, 'selectedParent.value');
  var categoryHasAdditionalProperties = {}
  const mappedObject = []
  if (_.includes(['sell', 'rent'], selectedType)) {
    switch (selectedType) {
      case 'sell':
        categoryHasAdditionalProperties =
          sellprops.find((property) => _.get(property, 'id') === selectedCategory);
        if (_.isEmpty(categoryHasAdditionalProperties) && selectedParent) {
          categoryHasAdditionalProperties = sellprops.find((property) => _.get(property, 'parent_id') === selectedParent)
        } else if (_.isEmpty(categoryHasAdditionalProperties) && _.get(homeForm, 'secondarySelectedParent.value')) {
          const parentCat = _.get(sellList, 'length') > 0 && rentList.find(val => val.id === _.get(homeForm, "secondarySelectedParent.value"));
          if (!_.isEmpty(parentCat)) {
            categoryHasAdditionalProperties = sellprops.find((property) => _.get(property, 'id') === parentCat.name)
          }
        }
        mapAdditionalFilters(categoryHasAdditionalProperties, mappedObject);
        break;
      case 'rent':
        categoryHasAdditionalProperties =
          rentalProps.find((property) => _.get(property, 'id') === selectedCategory);
        if (_.isEmpty(categoryHasAdditionalProperties) && !_.isEmpty(selectedParent)) {
          categoryHasAdditionalProperties = rentalProps.find((property) => _.get(property, 'parent_id') === selectedParent)
        } else if (_.isEmpty(categoryHasAdditionalProperties) && _.get(homeForm, 'secondarySelectedParent.value')) {
          const parentCat = _.get(rentList, 'length') > 0 && rentList.find(val => val.id === _.get(homeForm, "secondarySelectedParent.value"));
          if (!_.isEmpty(parentCat)) {
            categoryHasAdditionalProperties = rentalProps.find((property) => _.get(property, 'id') === parentCat.name)
          }
        }
        mapAdditionalFilters(categoryHasAdditionalProperties, mappedObject);
        break;
      default:
        mappedObject.length = 0;
        break;
    }
  }
  return mappedObject;
}

function mapAdditionalFilters(categoryHasAdditionalProperties, mappedObject) {
  const properties = _.get(categoryHasAdditionalProperties, 'properties');
  !_.isEmpty(properties) && properties.forEach((singleProperty, key) => {
    if (_.includes(allowedFilters, _.get(singleProperty, 'fieldType'))) {
      const options = [];
      !_.isEmpty(singleProperty, 'options') && _.get(singleProperty, 'options').forEach((val) => {
        options.push({
          label: val,
          val
        });
      });
      mappedObject.push({
        label: _.get(singleProperty, 'label'),
        options
      });
    }
  });
}


export const getPayload = (homeForm, searchForm, additionalFiltersForm, customFiltersForm, value, filterOptions) => {
  const payload = {
    keyword: _.get(homeForm, 'searchField.value'),
    listType: _.get(homeForm, 'listType.value'),
    type: _.get(homeForm, 'selectedType.value', 'rent'),
    latitude: _.get(homeForm, 'latitude.value'),
    longitude: _.get(homeForm, 'longitude.value'),
    categoryId: _.get(homeForm, 'selectedCategoryId.value'),
    radius: _.get(homeForm, 'filterRadius.value', 5000),
    sortBy: value
  }

  const filterPayload = [];
  const priceArray = [];
  if (!_.isEmpty(filterOptions, 'generalFilters')) {
    const prices = filterOptions.generalFilters.filter((val) => val.key === 'price-range')[0];
    priceArray.push(prices.value[0]);
    priceArray.push(prices.value[1]);
  }
  if (_.get(searchForm, 'minRange.value') || _.get(searchForm, 'maxRange.value')) {
    const priceRange = {
      key: "price-range",
      value: [
        parseInt(_.get(searchForm, 'minRange.value') ? _.get(searchForm, 'minRange.value') : priceArray[0]),
        parseInt(_.get(searchForm, 'maxRange.value') ? _.get(searchForm, 'maxRange.value') : priceArray[1])
      ]
    };
    filterPayload.push(priceRange);
  }
  const map = new Map();
  for (const key in { ...searchForm, ...additionalFiltersForm }) {
    if (!_.includes(['minRange', 'maxRange'], key)) {
      if (!!_.get(searchForm, `${key}.value.value`)) {
        map.set(key, _.get(searchForm, `${key}.value.key`))
      }
    }
  }
  const additionalFiltersMap = new Map();
  for (const key in customFiltersForm) {
    if (!!_.get(customFiltersForm, `${key}.value`)) {
      const keyValArray = key.split("_");
      if (keyValArray.length > 1) {
        if (additionalFiltersMap.has(keyValArray[1])) {
          const currentList = additionalFiltersMap.get(keyValArray[1]);
          currentList.push(keyValArray[0]);
          additionalFiltersMap.delete(keyValArray[1]);
          additionalFiltersMap.set(keyValArray[1], currentList);
        } else {
          additionalFiltersMap.set(keyValArray[1], [keyValArray[0]])
        }
      }
    }
  }

  filterprops.forEach((val) => {
    const value = val.key;
    let valuesInMap = [...map.entries()]
      .filter(({ 1: v }) => v === value)
      .map(([k]) => k);
    if (!_.isEmpty(valuesInMap)) {
      filterPayload.push({
        key: value,
        value: valuesInMap
      })
    }
  })
  const customFiltersPayload = [];
  additionalFiltersMap.forEach((value, key, map) => {
    customFiltersPayload.push({
      key,
      value
    })
  });
  payload.customFilters = customFiltersPayload;
  payload.generalFilters = filterPayload

  return payload;
}

export const getRadiusValueForFilters = (value) => {
  if (value > 0 && value <= 5) return 5000;
  if (value <= 10) return 10;
  if (value <= 15) return 15000;
  if (value <= 20) return 20000;
  if (value <= 25) return 25000;
  if (value <= 30) return 30000;
  if (value <= 40) return 40000;
  if (value <= 50) return 50000;
  if (value <= 60) return 60000;
  if (value <= 70) return 70000;
  if (value <= 80) return 80000;
  if (value <= 90) return 90000;
  if (value <= 100) return 100000;
  if (value > 100) return 1000000;


}