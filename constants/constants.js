module.exports = {
  AUTHORIZATION: 'Authorization',
  PORT: process.env.PORT || 5000,
  UNKNOWN_ERROR: 'Unknown error',
  ROUTE_NOT_FOUND: 'Rout not fond',
  DB: process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/app',
  ACCESS_SECRET_KEY: process.env.ACCESS_TOKEN_KEY || 'xxxx',
  REFRESH_SECRET_KEY: process.env.REFRESH_TOKEN_KEY || 'yyyy',
  SALT: 10,
  DELETE_ANSWER: 'User has been deleted!',
  UPDATE_ANSWER: 'User has been updated!',
  NO_CONTENT: 'NO CONTENT!',
  REFRESH: 'refresh',
  ACCESS: 'access',
  ACCESS_TOKEN_TIME: '10m',
  REFRESH_TOKEN_TIME: '10d'
};
