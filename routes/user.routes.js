const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, filesMiddleware } = require('../middlewares');

router.use('/:userId', userMiddleware.checkUserIdValidity, userMiddleware.getUserByParam('userId', 'params', '_id'));

router.get('/', userController.getAllUsers);

router.post('/', filesMiddleware.checkPhoto, userMiddleware.checkUserValidity,
  userMiddleware.canUserRegister, userController.createUser);

router.get('/:userId', userController.getUser);

router.delete('/:userId', userMiddleware.checkToken, userController.removeUserById);

router.put('/:userId', userMiddleware.checkToken, userMiddleware.updateValidity, userController.updateUserById);

module.exports = router;
