import React from 'react';
import { StaticRouter as Router, matchPath } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from 'reducers';
import Html from 'components/Html';
import App from 'components/App';
import RouteConfig, { routes } from './routes';

import {
  DEFAULT_PORT,
  APP_NAME,
  INLINE_CSS_FILE
} from './constants';

const express = require('express');
const compression = require('compression');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const fs = require('fs');

const app = express();
const { PORT: port = DEFAULT_PORT, NODE_ENV } = process.env;

let inlineCss;
let assets = [];
const cacheControl = NODE_ENV === 'development' ? 'no-cache' : 'max-age=300';

const getAssets = () => {
  const manifest = fs.readFileSync(path.join(__dirname, 'manifest.json'), { encoding: 'utf-8' });
  const allAssets = JSON.parse(manifest);

  return Object.values(allAssets);
};

app.use(compression());

app.use([/^\/static\/server\.js/, '/static'], express.static(path.join(__dirname)));

app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));

app.get('*', (req, res) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route));

  const getAssetType = (ext) => assets.filter((asset) => RegExp(`.${ext}`).test(asset));

  const store = createStore(rootReducer);

  const content = ReactDOMServer.renderToString(
    <Html
      title={APP_NAME}
      stylesheets={getAssetType('css')}
      scripts={getAssetType('js')}
      inlineCss={inlineCss}
      inlineScripts={[`window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}`]}
    >
      <Router location={req.url}>
        <Provider store={store}>
          <App>
            <RouteConfig />
          </App>
        </Provider>
      </Router>
    </Html>
  );

  if (req.method === 'GET') res.set('Cache-Control', cacheControl);
  res.status(activeRoute ? 200 : 404).send(`<!DOCTYPE html>${content}`);
});

app.listen(port, () => {
  const inlineCssPath = path.join(__dirname, INLINE_CSS_FILE);
  if (fs.existsSync(inlineCssPath)) inlineCss = fs.readFileSync(inlineCssPath, { encoding: 'utf-8' });

  assets = getAssets();

  console.log(`App listening on localhost:${port}`); // eslint-disable-line no-console
});
