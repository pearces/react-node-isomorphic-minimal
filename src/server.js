import React from 'react';
import Html from './components/Html';
import App from './components/App';

const express = require('express');
const ReactDOMServer = require('react-dom/server');

const app = express();
const DEFAULT_PORT = 3000;
const { PORT: port = DEFAULT_PORT } = process.env;

app.get('/', (req, res) => {
  const content = ReactDOMServer.renderToString(<Html title="react-node-isomorphic-minimal app"><App /></Html>);
  res.status(200).send(content);
});

app.listen(port, () => {
  console.log(`App listening on localhost:${port}`); // eslint-disable-line no-console
});
