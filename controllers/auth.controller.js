const { ErrorHandler, errorMessages: { WRONG_PASSWORD_OR_EMAIL } } = require('../errors');
const { User } = require('../dataBase');
const { responseCodesEnum } = require('../constants');
const { passwordHasher } = require('../helpers');

module.exports = {
  authorize: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const userByEmail = await User.findOne({ email }).select('+password');

      if (!userByEmail) {
        throw new ErrorHandler(responseCodesEnum.UN_AUTHORIZED, WRONG_PASSWORD_OR_EMAIL.message,
          WRONG_PASSWORD_OR_EMAIL.code);
      }

      await passwordHasher.compare(userByEmail.password, password);

      res.json(userByEmail);
    } catch (err) {
      next(err);
    }
  }
};
