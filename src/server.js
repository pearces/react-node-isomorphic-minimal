import React from 'react';
import { StaticRouter, matchRoutes } from 'react-router';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from 'reducers';
import Html from 'components/Html';
import Routes, { routes } from './routes';
import fetchMiddleware from './fetchMiddleware';

import { DEFAULT_PORT, APP_NAME, INLINE_CSS_FILE } from './constants';

const path = require('path');
const fs = require('fs');
const express = require('express');
const compression = require('compression');
const { renderToPipeableStream } = require('react-dom/server');

const app = express();
const { PORT: port = DEFAULT_PORT, NODE_ENV } = process.env;
const STATIC_PATH = '/static';

let inlineCss;
let assets = [];
const cacheControl = NODE_ENV === 'development' ? 'no-cache' : 'max-age=300';

const getAssets = () => {
  const manifest = fs.readFileSync(path.join(__dirname, 'manifest.json'), { encoding: 'utf-8' });
  const allAssets = JSON.parse(manifest);

  return Object.values(allAssets);
};

app.use(compression());

app.use([/^\/static\/server\.js/, STATIC_PATH], express.static(path.join(__dirname)));

app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));

app.get('/date', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(Date.now()));
});

app.get('*splat', (req, res) => {
  const activeRoute = (matchRoutes(routes, req.url) || []).find(
    ({ route }) => route.path && route.path !== '*'
  );

  const getAssetType = (ext) =>
    assets
      .filter((asset) => RegExp(`.${ext}`).test(asset))
      .map((asset) => `${STATIC_PATH}/${asset}`);

  const store = createStore(rootReducer, undefined, applyMiddleware(fetchMiddleware));
  const clientStore = `window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(
    /</g,
    '\\u003c'
  )}`;

  const { pipe } = renderToPipeableStream(
    <Html title={APP_NAME} stylesheets={getAssetType('css')} inlineCss={inlineCss}>
      <React.StrictMode>
        <Provider store={store}>
          <StaticRouter location={req.url}>
            <Routes />
          </StaticRouter>
        </Provider>
      </React.StrictMode>
    </Html>,
    {
      bootstrapScriptContent: clientStore,
      bootstrapScripts: getAssetType('js'),
      onShellReady() {
        res.statusCode = activeRoute ? 200 : 404;
        if (req.method === 'GET') res.setHeader('Cache-Control', cacheControl);
        res.setHeader('Content-type', 'text/html');
        pipe(res);
      },
      onError: (error) => {
        res.statusCode = 500;
        console.error(error);
        pipe(error);
      }
    }
  );
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
    throw error;
  }
  const inlineCssPath = path.join(__dirname, INLINE_CSS_FILE);
  if (fs.existsSync(inlineCssPath))
    inlineCss = fs.readFileSync(inlineCssPath, { encoding: 'utf-8' });

  assets = getAssets();

  console.log(`App listening on localhost:${port}`);
});
