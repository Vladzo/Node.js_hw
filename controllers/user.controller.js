const { User } = require('../dataBase');
const { responceCodesEnum } = require('../constants');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find({});

      res.status(responceCodesEnum.OK).json(users);
    } catch (err) {
      next(err);
    }
  },

  getUserById: (req, res, next) => {
    try {
      const { user } = req;

      res.status(responceCodesEnum.OK).json(user);
    } catch (err) {
      next(err);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const createdUser = await User.create(req.body);

      res.status(responceCodesEnum.CREATED).json(createdUser);
    } catch (err) {
      next(err);
    }
  },

  removeUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;

      await User.findOneAndRemove(userId);

      res.status(responceCodesEnum.DELETE).json('User deleted!');
    } catch (err) {
      next(err);
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;

      await User.findByIdAndUpdate(userId, req.body);

      res.status(responceCodesEnum.UPDATE).json('User has been updated');
    } catch (err) {
      next(err);
    }
  }
};
