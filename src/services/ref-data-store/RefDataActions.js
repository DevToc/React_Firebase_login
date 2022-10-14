import HttpClient from '../../commons/HttpClient'
import { refDataDispatchActions } from './RefDataDispatchActions'
import axios from 'axios'
import * as _ from 'lodash'
axios.defaults.baseURL = '../stubs'

const fetchSponsorshipOptions = () => {
  return (dispatch) => {
    dispatch(refDataDispatchActions.updateSponsorshipOptions([
      {
        "id": "top",
        "label": "Top Ad",
        "amount": 17.95,
        "duration": ["3 days", "5 days"]
      },
      {
        "id": "urgent",
        "label": "Urgent Ad",
        "amount": 10.95,
        "duration": ["7 Hours", "3 Hours"]
      }
    ]))
  }
}

const getSellCategories = () => {
  return (dispatch) => {
    return new HttpClient()
      .get('/category?type=sell', '/refdata/getSellCategories', null, 'public')
      .then((res) => dispatch(refDataDispatchActions.fetchSellCategories({ sellData: sortData(res.data), sellList: getData(res.data) })))
      .catch((err) => err)
  }
}
const getRentCategories = () => {
  return (dispatch) => {
    return new HttpClient()
      .get('/category?type=rent', '/refdata/getRentCategories', null, 'public')
      .then((res) => dispatch(refDataDispatchActions.fetchRentCategories({ rentData: sortData(res.data), rentList: getData(res.data) })))
      .catch((err) => err)
  }
}

const getWantedCategories = () => {
  return (dispatch) => {
    return new HttpClient()
      .get('/category?type=wanted', '/refdata/getRentCategories', null, 'public')
      .then((res) => dispatch(refDataDispatchActions.fetchWantedCategories({ wantedData: sortData(res.data), wantedList: getData(res.data) })))
      .catch((err) => err)
  }
}

const getData = (data) => {
  const dataList = [];
  if (!_.isEmpty(data) && _.get(data, 'children.length', 0) > 0) {
    const categories = _.get(data, 'children');
    !_.isEmpty(categories) && categories.forEach((cat) => {
      dataList.push(cat);
      _.get(cat, 'children.length') > 0 &&
        cat.children.forEach((categ) => {
          dataList.push(categ);
        })
    })
  }
  return dataList;
}

const compare = (a, b) => {
  if (!_.includes(['Other', 'Others'], a.name)) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  return 1;
}

const sortData = (data) => {
  if (!_.isEmpty(data) && _.get(data, 'children.length', 0) > 0) {
    data.children.sort(compare);
    !_.isEmpty(data, 'children') && _.get(data, 'children', 0).forEach((cat) => {
      cat.children.sort(compare);
      !_.isEmpty(cat, 'children') && _.get(cat, 'children', 0).forEach((secCat) => secCat.children.sort(compare))
    })
  }
  return data;
}

export const refDatActions = {
  fetchSponsorshipOptions, getSellCategories, getRentCategories, getWantedCategories
}
