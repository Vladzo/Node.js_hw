const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/', userMiddleware.checkUserValidity, userMiddleware.canUserRegister, userController.createUser);

router.get('/:userId', userMiddleware.checkUserIdValidity, userMiddleware.isUserAlreadyExist, userController.getUserById);

router.delete('/:userId', userMiddleware.checkUserIdValidity, userMiddleware.isUserAlreadyExist, userController.removeUserById);

router.put('/:userId', userMiddleware.updateValidity, userMiddleware.isUserAlreadyExist, userController.updateUserById);

module.exports = router;
