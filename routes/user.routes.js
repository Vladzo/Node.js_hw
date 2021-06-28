const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.isUserAlreadyExist, userController.getUserById);

router.post('/', userMiddleware.canUserRegister, userController.createUser);

router.delete('/:userId', userMiddleware.isUserAlreadyExist, userController.removeUserById);

router.put('/:userId', userMiddleware.isUserAlreadyExist, userController.updateUserById);

module.exports = router;
