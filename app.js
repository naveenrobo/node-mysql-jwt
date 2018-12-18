const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const {
  handle404Error,
  handleDevErrors
} = require('./app/middlewares/errorHandlers');
const {
  verifyToken
} = require('./app/middlewares/verifyToken');
const {
  getConnection
} = require('./app/middlewares/mysql');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Routes
app.use('/auth', getConnection, require('./app/routes/users'));

// error handler
app.use(handle404Error);
app.use(handleDevErrors);

module.exports = app;