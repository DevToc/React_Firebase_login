import axios from 'axios';
import config from '../configs/appsettings.json';
import { store } from '../services';
import _get from 'lodash/get';
import { globalConstants, globalUtils } from '../utils/global';
import { getJsonPath, setLoaderStatus, getHeaders, setFailureNotification } from './HttpClientUtils';
const { isMock, mockUrl, baseUrl, chatUrl, isChatMock } = config

class HttpClient {
  constructor() {
    if (isMock) {
      axios.defaults.baseURL = mockUrl
      this.axios = axios
    } else {
      axios.defaults.baseURL = baseUrl
      this.axios = axios
    }
  }

  get(path, operation, option = globalConstants.MICROSERVICES, prefix = 'api') {
    setLoaderStatus(true, store)
    if (globalConstants.CHAT === option && !isChatMock) {
      this.setBasePath(option);
    } else if (globalConstants.CHAT === option && isChatMock) {
      return getJsonPath(this.axios, operation);
    } else if (globalConstants.MICROSERVICES === option && isMock) {
      return this.processRequest(getJsonPath(this.axios, operation), getHeaders(store.getState))
    }
    return this.processRequest(this.axios.get(`/${prefix}${path}`, getHeaders(store.getState)))
  }

  post(path, payload, operation, option = globalConstants.MICROSERVICES, prefix = 'api') {
    setLoaderStatus(true, store)
    if (globalConstants.CHAT === option && !isChatMock) {
      this.setBasePath(option);
    } else if (globalConstants.CHAT === option && isChatMock) {
      return getJsonPath(this.axios, operation);
    } else if (globalConstants.MICROSERVICES === option && isMock) {
      return this.processRequest(getJsonPath(this.axios, operation), getHeaders(store.getState))
    }
    return this.processRequest(this.axios.post(`/${prefix}${path}`, payload, getHeaders(store.getState)))
  }

  delete(path, operation, option = globalConstants.MICROSERVICES) {
    setLoaderStatus(true, store)
    if (globalConstants.CHAT === option && !isChatMock) {
      this.setBasePath(option);
    } else if (globalConstants.MICROSERVICES === option && isChatMock) {
      return getJsonPath(this.axios, operation);
    } else if (globalConstants.MICROSERVICES === option && isMock) {
      return this.processRequest(getJsonPath(this.axios, operation));
    }
    return this.processRequest(this.axios.delete(path, getHeaders(store.getState)))
  }

  put(path, payload, operation, option = globalConstants.MICROSERVICES, prefix = 'api') {
    setLoaderStatus(true, store)
    const { getState } = store;
    if (globalConstants.CHAT === option && !isChatMock) {
      this.setBasePath(option);
    } else if (globalConstants.MICROSERVICES === option && isChatMock) {
      return getJsonPath(this.axios, operation);
    } else if (globalConstants.MICROSERVICES === option && isMock) {
      return this.processRequest(getJsonPath(this.axios, operation));
    }
    return this.processRequest(this.axios.put(`/${prefix}${path}`, payload, getHeaders(getState)))
  }

  setBasePath = (option) => {
    switch (option) {
      case globalConstants.CHAT:
        this.axios.defaults.baseURL = chatUrl;
        break;
      case globalConstants.MICROSERVICES:
      default:
        this.axios.defaults.baseURL = baseUrl
        break;
    }
  }

  processRequest = (baseUrl) => (
    new Promise((resolve, reject) => {
      baseUrl.then((resp) => setLoaderStatus(false, store, resolve, resp))
        .catch((err) => {
          setFailureNotification(store, _get(err, 'response.data.message', ''))
          globalUtils.scrollTo('notification-component')
          setLoaderStatus(false, store, reject, err)
        })
    })
  )
}


export default HttpClient
