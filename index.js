import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import sampleData from "./redux/initialState";
import storeFactory from "./redux/reducers/index";
import "@scuf/common/honeywell/theme.css";
import "@scuf/datatable/honeywell/theme.css";

const initialState = sampleData;
const saveState = () =>
  (localStorage["redux-store"] = JSON.stringify(store.getState()));
const store = storeFactory(initialState);

window.React = React;
window.store = store;
//store.subscribe(saveState);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
