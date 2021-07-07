const { userService } = require('../services');
const { userValidator } = require('../validators');
const { ErrorHandler, errors: { USER_ALREADY_LOGIN, BAD_REQUEST_BODY } } = require('../errors');
const { statusCode } = require('../constants');

module.exports = {
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
    checkIsUserDataValid: (validatorName) => async (req, res, next) => {
        try {
            const { error } = await userValidator[validatorName].validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, BAD_REQUEST_BODY.customCode);
            }

            next();
        } catch (err) {
            next(err);
        }
    },
};
