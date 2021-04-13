const express = require('express');

const app = express();
const DEFAULT_PORT = 3000;
const { PORT: port = DEFAULT_PORT } = process.env;

app.get('/', (req, res) => {
  res.status(200).send('Hello World from the server!');
});

app.listen(port, () => {
  console.log(`App listening on localhost:${port}`); // eslint-disable-line no-console
});
