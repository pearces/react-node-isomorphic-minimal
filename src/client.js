/* eslint-disable no-underscore-dangle */
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from 'reducers';
import { routes } from './routes';
import fetchMiddleware from './fetchMiddleware';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(fetchMiddleware))
);

const router = createBrowserRouter(routes);

hydrateRoot(
  document.getElementById('app'),
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={null} />
    </Provider>
  </React.StrictMode>
);
