import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
// import logger from 'redux-logger'
import * as authorization from "./authorization-store";
import * as form from "./form-store";
import * as user from "./user-store";
import * as item from "./item-store";
import * as refData from "./ref-data-store";
import * as location from "./location-store";
import * as chat from "./chat-store";
import * as notification from "./notification-store";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const rootReducer = combineReducers({
  authorization: authorization.authorization,
  form: form.form,
  user: user.user,
  item: item.item,
  refData: refData.refData,
  location: location.location,
  chat: chat.chat,
  notification: notification.notification,
});

export const configureStore = () => createStore(rootReducer);

const middleWare = [
  thunk,
  // logger
];
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleWare))
);
