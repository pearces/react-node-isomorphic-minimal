import React from 'react';
import Html from './components/Html';
import App from './components/App';

const express = require('express');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const fs = require('fs');

const app = express();
const DEFAULT_PORT = 3000;
const { PORT: port = DEFAULT_PORT, NODE_ENV } = process.env;

const getAssets = () => {
  const manifest = fs.readFileSync(path.join(__dirname, 'manifest.json'));
  const assets = JSON.parse(manifest);

  return Object.values(assets);
};

const getScripts = (assets = []) => assets.filter((asset) => /\.js/.test(asset));

app.get('/', (req, res) => {
  const assets = getAssets();
  const content = ReactDOMServer.renderToString(
    <Html title="react-node-isomorphic-minimal app" scripts={getScripts(assets)}>
      <App />
    </Html>
  );

  if (req.method === 'GET') {
    res.set('Cache-Control', NODE_ENV === 'development' ? 'no-cache' : 'max-age=300');
  }
  res.status(200).send(content);
});

app.use('/static', express.static(path.join(__dirname)));

app.listen(port, () => {
  console.log(`App listening on localhost:${port}`); // eslint-disable-line no-console
});
