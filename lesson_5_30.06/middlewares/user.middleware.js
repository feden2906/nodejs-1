const { userService } = require('../services');
const { userValidator } = require('../validators');
const {
    ErrorHandler,
    errors: {
        RECORD_NOT_FOUND,
        USER_ALREADY_LOGIN,
        WRONG_EMAIL_OF_PASSWORD
    }
} = require('../errors');
const { statusCode } = require('../constants');

module.exports = {
    checkIsUserExist: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const userById = await userService.getOneUser({ _id: userId });

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
            const { login } = req.body;
            const user = await userService.getOneUser({ login });

            if (user) {
                throw new ErrorHandler(statusCode.CONFLICT, USER_ALREADY_LOGIN.message, USER_ALREADY_LOGIN.customCode);
            }

            next();
        } catch (err) {
            next(err);
        }
    },
    checkIsUserValid: async (req, res, next) => {
        try {
            const { error } = await userValidator.createUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, WRONG_EMAIL_OF_PASSWORD.code);
            }

            next();
        } catch (err) {
            next(err);
        }
    },
};
