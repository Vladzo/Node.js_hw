module.exports = {
  PORT: process.env.PORT || 5000,
  UNKNOWN_ERROR: 'Unknown error',
  ROUTE_NOT_FOUND: 'Rout not fond',
  DB: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/app',
  SALT: 10,
  DELETE_ANSWER: 'User has been deleted!',
  UPDATE_ANSWER: 'User has been updated!'
};
