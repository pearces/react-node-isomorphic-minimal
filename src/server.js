import React from 'react';
import Html from 'components/Html';
import App from 'components/App';
import {
  DEFAULT_PORT,
  APP_NAME,
  INLINE_CSS_FILE
} from './constants';

const express = require('express');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const fs = require('fs');

const app = express();

const { PORT: port = DEFAULT_PORT, NODE_ENV } = process.env;

let inlineCss;

const getAssets = () => {
  const manifest = fs.readFileSync(path.join(__dirname, 'manifest.json'), { encoding: 'utf-8' });
  const assets = JSON.parse(manifest);

  return Object.values(assets);
};

const getAssetType = (assets = [], ext = '') => assets.filter((asset) => RegExp(`.${ext}`).test(asset));

app.get('/', (req, res) => {
  const assets = getAssets();
  const content = ReactDOMServer.renderToString(
    <Html
      title={APP_NAME}
      stylesheets={getAssetType(assets, 'css')}
      scripts={getAssetType(assets, 'js')}
      inlineCss={inlineCss}
    >
      <App />
    </Html>
  );

  if (req.method === 'GET') {
    res.set('Cache-Control', NODE_ENV === 'development' ? 'no-cache' : 'max-age=300');
  }
  res.status(200).send(content);
});

app.use([/^\/static\/server\.js/, '/static'], express.static(path.join(__dirname)));

app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));

app.listen(port, () => {
  const inlineCssPath = path.join(__dirname, INLINE_CSS_FILE);
  if (fs.existsSync(inlineCssPath)) inlineCss = fs.readFileSync(inlineCssPath, { encoding: 'utf-8' });

  console.log(`App listening on localhost:${port}`); // eslint-disable-line no-console
});
