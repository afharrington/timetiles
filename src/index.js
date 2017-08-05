import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import promise from "redux-promise";
import thunk from "redux-thunk";
import logger from "redux-logger";

import App from './App';

import { AUTHORIZE_USER } from './actions';
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

const store = createStoreWithMiddleware(reducers);

// Checking for token so user stays logged in as long as they have not logged out
// Looks for a token in browser local storage, updating auth state if it exists

// add user id to localStorage
const token = localStorage.getItem('token');
if (token) { store.dispatch({ type: AUTHORIZE_USER }); }

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>
  , document.querySelector('.container'));
