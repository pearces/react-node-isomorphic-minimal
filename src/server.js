import React from 'react';
import Html from 'components/Html';
import App from 'components/App';
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

app.get('/', (req, res) => {
  const getAssetType = (ext) => assets.filter((asset) => RegExp(`.${ext}`).test(asset));

  const content = ReactDOMServer.renderToString(
    <Html
      title={APP_NAME}
      stylesheets={getAssetType('css')}
      scripts={getAssetType('js')}
      inlineCss={inlineCss}
    >
      <App />
    </Html>
  );

  if (req.method === 'GET') res.set('Cache-Control', cacheControl);
  res.status(200).send(`<!DOCTYPE html>${content}`);
});

app.use(compression());

app.use([/^\/static\/server\.js/, '/static'], express.static(path.join(__dirname)));

app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));

app.listen(port, () => {
  const inlineCssPath = path.join(__dirname, INLINE_CSS_FILE);
  if (fs.existsSync(inlineCssPath)) inlineCss = fs.readFileSync(inlineCssPath, { encoding: 'utf-8' });

  assets = getAssets();

  console.log(`App listening on localhost:${port}`); // eslint-disable-line no-console
});
