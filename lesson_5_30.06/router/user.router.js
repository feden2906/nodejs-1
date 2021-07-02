const router = require('express').Router();
const { userController } = require('../controller');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getUserContent);

router.get('/:userId', userMiddleware.checkIsUserExist, userController.getUserById);

router.post('/',
    userMiddleware.checkIsUserRegister,
    userMiddleware.checkIsUserValid,
    userController.createNewUser);

router.delete('/:userId', userMiddleware.checkIsUserExist, userController.deleteUserById);

router.patch('/:userId',
    userMiddleware.checkIsUserExist,
    userMiddleware.checkIsUserUpdateValid,
    userController.updateUserById);

module.exports = router;
