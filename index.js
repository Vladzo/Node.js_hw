const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require('./routes');
const { constants } = require('./constants');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

app.listen(constants.PORT, () => {
  console.log('App listen 3000');
});

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
  res
    .status(err.status)
    .json({
      message: err.message || constants.UNKNOWN_ERROR,
      customCode: err.customCode || 0
    });
}

function _notFoundHandler(err, req, res, next) {
  next({
    status: err.status || 404,
    message: err.message || constants.ROUTE_NOT_FOUND
  });
}

function _mongooseConnector() {
  mongoose.connect('mongodb://localhost:27017/app-db', { useNewUrlParser: true, useUnifiedTopology: true });
}
