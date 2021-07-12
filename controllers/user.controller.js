const { emailActionEnums } = require('../constants');
const { mailService } = require('../services');
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
      console.log(req.photo);
      console.log('Worksssssssssssssssssssssssssssssssss');
      const { body: { password, email, name }, photo } = req;
      console.log(photo);

      const hashedPassword = await passwordHasher.hash(password);
      // const createdUser = await User.create({ ...req.body, password: hashedPassword });

      //await mailService.sendEmail(email, emailActionEnums.WELCOME, { name, email });

      res.status(responseCodesEnum.CREATED).json({ });
    } catch (err) {
      next(err);
    }
  },

  removeUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await User.findByIdAndRemove(userId);

      await mailService.sendEmail(user.email, emailActionEnums.USER_DELETE, { name: user.name, email: user.email });

      res.status(responseCodesEnum.DELETE).json(constants.DELETE_ANSWER);
    } catch (err) {
      next(err);
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { email } = req.user;

      await User.findByIdAndUpdate(userId, req.body);

      const user = await User.findOne({ _id: userId });

      await mailService.sendEmail(email, emailActionEnums.USER_UPDATE, { name: user.name, email: user.email, age: user.age });

      res.json(constants.UPDATE_ANSWER);
    } catch (err) {
      next(err);
    }
  }
};
