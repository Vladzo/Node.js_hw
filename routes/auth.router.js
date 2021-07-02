const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.post('/', userMiddleware.loginValidity, authController.authorize);

module.exports = router;
