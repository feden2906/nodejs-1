const router = require('express').Router();
const { userController } = require('../controller');
const {
    userMiddleware,
    dynamicParamsMiddleware,
    authMiddleware,
    checkIdValid
} = require('../middlewares');

router.get('/', userController.getUserContent);

router.get('/:userId',
    checkIdValid.checkIsUserIdValid,
    dynamicParamsMiddleware.checkIsUserDataExist('userId', 'params', '_id'),
    userController.getUserById);

router.post('/',
    userMiddleware.checkIsUserDataValid('createUser'),
    userMiddleware.checkIsUserRegister,
    userController.createNewUser);

router.use('/:userId',
    checkIdValid.checkIsUserIdValid,
    authMiddleware.checkAccessToken);

router.delete('/:userId', userController.deleteUserById);

router.put('/:userId',
    userMiddleware.checkIsUserDataValid('updateUser'),
    userController.updateUserById);

module.exports = router;
