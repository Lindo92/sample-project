require('dotenv').config();
const express = require('express');
const { connection } = require('./db.config');

const port = process.env.SERVER_PORT;
const app = express();

try {
  connection.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(port, () => console.log(`Sample app listening on port ${port}`));