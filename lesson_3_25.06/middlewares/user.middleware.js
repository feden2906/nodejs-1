const { userService } = require('../services');
const { errors } = require('../constants');

module.exports = {
    checkIsUserExist: async (req, res, next) => {
        const { userId } = req.params;
        const userById = await userService.getOneUser(userId);

        if (!userById) {
            throw new Error(errors.USER_NOT_FOUND);
        }

        req.user = userById;
        next();
    },

    checkIsUserRegister: async (req, res, next) => {
        const users = await userService.getAllUsers();
        const findUser = users.find((user) => user.login === req.body.login);

        if (findUser) {
            throw new Error(errors.ALREADY_LOGIN);
        }

        next();
    }
};
