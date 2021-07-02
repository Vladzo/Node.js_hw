const { User } = require('../dataBase');
const { responseCodesEnum } = require('../constants');
const { ErrorHandler, errorMessages: { RECORD_NOT_FOUND, CANT_REGISTER, IN_VALID } } = require('../errors');
const {
  userValidator, loginValidator, updateValidator, userIdValidator
} = require('../validators');

module.exports = {
  isUserAlreadyExist: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await User.findOne({ _id: userId });

      if (!user) {
        throw new ErrorHandler(responseCodesEnum.NOT_FOUND, RECORD_NOT_FOUND.message, RECORD_NOT_FOUND.code);
      }

      req.user = user;

      next();
    } catch (err) {
      next(err);
    }
  },

  checkUserValidity: (req, res, next) => {
    try {
      const { error } = userValidator.createUser.validate(req.body);

      if (error) {
        throw new ErrorHandler(responseCodesEnum.NOT_ALLOWED, error.details[0].message, IN_VALID.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  loginValidity: (req, res, next) => {
    try {
      const { error } = loginValidator.createUser.validate(req.body);

      if (error) {
        throw new ErrorHandler(responseCodesEnum.NOT_ALLOWED, error.details[0].message, IN_VALID.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  updateValidity: (req, res, next) => {
    try {
      const { error } = updateValidator.createUser.validate(req.body);

      if (error) {
        throw new ErrorHandler(responseCodesEnum.NOT_ALLOWED, error.details[0].message, IN_VALID.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  checkUserIdValidity: (req, res, next) => {
    try {
      const { error } = userIdValidator.createUser.validate(req.query.userId);

      if (error) {
        throw new ErrorHandler(responseCodesEnum.NOT_ALLOWED, error.details[0].message, IN_VALID.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  },

  canUserRegister: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (user) {
        throw new ErrorHandler(responseCodesEnum.NOT_ALLOWED, CANT_REGISTER.message, CANT_REGISTER.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  }
};
