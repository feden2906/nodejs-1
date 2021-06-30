const { User } = require('../dataBase');
const ErrorHandler = require('../errors');
const { RECORD_NOT_FOUND, USER_ALREADY_LOGIN } = require('../errors');
const { statusCode } = require('../constants');

module.exports = {
    checkIsUserExist: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const userById = await User.findById(userId);

            if (!userById) {
                throw new ErrorHandler(statusCode.NOT_FOUND, RECORD_NOT_FOUND.message, RECORD_NOT_FOUND.customCode);
            }

            req.user = userById;
            next();
        } catch (err) {
            next(err);
        }
    },

    checkIsUserRegister: async (req, res, next) => {
        try {
            const users = await User.find({});
            const findUser = users.find((user) => user.login === req.body.login);

            if (findUser) {
                throw new ErrorHandler(409, USER_ALREADY_LOGIN.message, USER_ALREADY_LOGIN.customCode);
            }

            next();
        } catch (err) {
            next(err);
        }
    }
};
