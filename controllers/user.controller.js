const path = require('path');
const uuid = require('uuid').v1;
const fs = require('fs');
const util = require('util');

const { emailActionEnums } = require('../constants');
const { mailService } = require('../services');
const { User } = require('../dataBase');
const { responseCodesEnum, constants } = require('../constants');
const { ErrorHandler, errorMessages: { CANT_UPLOAD_FILE } } = require('../errors');
const { passwordHasher, photoHelper, userHelper } = require('../helpers');

const mkDirPromise = util.promisify(fs.mkdir);

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find({}).lean();

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
      const { body: { password, email, name }, avatar } = req;

      const hashedPassword = await passwordHasher.hash(password);
      const createdUser = await User.create({ ...req.body, password: hashedPassword });

      // await mailService.sendEmail(email, emailActionEnums.WELCOME, { name, email });

      const { _id } = createdUser;

      if (avatar) {
        const { pathForDb, finalPath, uploadPath } = await photoHelper.photoDirBuilder(avatar.name, _id, 'users');

        await mkDirPromise(uploadPath, { recursive: true });

        await avatar.mv(finalPath, (err) => {
          if (err) {
            throw new ErrorHandler(responseCodesEnum.SERVER_ERROR, CANT_UPLOAD_FILE.message, CANT_UPLOAD_FILE.code);
          }
        });

        await User.updateOne({ _id }, { avatar: path.join(pathForDb) });
      }

      const normalizedUser = userHelper.userNormalizator(createdUser.toObject());

      res.status(responseCodesEnum.CREATED).json(normalizedUser);
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
