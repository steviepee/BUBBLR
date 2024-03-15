const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());

const CLIENT_PATH = path.resolve(__dirname, '../dist');

app.use(express.static(CLIENT_PATH));

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
});
