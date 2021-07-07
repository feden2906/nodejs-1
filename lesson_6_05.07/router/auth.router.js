const router = require('express').Router();
const { authController } = require('../controller');
const { authMiddleware, dynamicParamsMiddleware } = require('../middlewares');

router.post('/login',
    authMiddleware.checkIsEmailValid,
    dynamicParamsMiddleware.checkIsUserDataExist('login'),
    authController.userLogin);

router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.userLogout);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh);

module.exports = router;
