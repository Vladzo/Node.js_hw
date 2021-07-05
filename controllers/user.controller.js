const { User } = require('../dataBase');
const { responseCodesEnum, constants } = require('../constants');
const { passwordHasher } = require('../helpers');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find({});

      res.status(responseCodesEnum.OK).json(users);
    } catch (err) {
      next(err);
    }
  },

  getUser: (req, res, next) => {
    try {
      const { user } = req;

      res.status(responseCodesEnum.OK).json(user);
    } catch (err) {
      next(err);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordHasher.hash(password);
      const createdUser = await User.create({ ...req.body, password: hashedPassword });

      res.status(responseCodesEnum.CREATED).json(createdUser);
    } catch (err) {
      next(err);
    }
  },

  removeUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;

      await User.findByIdAndRemove(userId);

      res.status(responseCodesEnum.DELETE).json(constants.DELETE_ANSWER);
    } catch (err) {
      next(err);
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;

      await User.findByIdAndUpdate(userId, req.body);

      res.json(constants.UPDATE_ANSWER);
    } catch (err) {
      next(err);
    }
  }
};
