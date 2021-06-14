/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from 'components/App';
import rootReducer from 'reducers';
import RouteConfig from './routes';
import fetchMiddleware from './fetchMiddleware';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(fetchMiddleware))
);

ReactDOM.hydrate(
  <Router>
    <Provider store={store}>
      <App><RouteConfig /></App>
    </Provider>
  </Router>,
  document.getElementById('app')
);
