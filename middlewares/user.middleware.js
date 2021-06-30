const { User } = require('../dataBase');
const { responceCodesEnum } = require('../constants');
const { ErrorHandler, errorMessages: { RECORD_NOT_FOUND, CANT_REGISTER } } = require('../errors');

module.exports = {
  isUserAlreadyExist: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        throw new ErrorHandler(responceCodesEnum.NOT_FOUND, RECORD_NOT_FOUND.message, RECORD_NOT_FOUND.code);
      }

      req.user = user;

      next();
    } catch (err) {
      next(err);
    }
  },

  canUserRegister: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.find({ email });

      if (user.length) {
        throw new ErrorHandler(responceCodesEnum.NOT_ALLOWED, CANT_REGISTER.message, CANT_REGISTER.code);
      }

      next();
    } catch (err) {
      next(err);
    }
  }
};
