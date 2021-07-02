const { authValidator } = require('../validators');
const { ErrorHandler } = require('../errors');
const { userService } = require('../services');
const { statusCode } = require('../constants');
const { errors: { RECORD_NOT_FOUND } } = require('../errors');

module.exports = async (req, res, next) => {
    try {
        const { login } = req.body;

        const userByLogin = await userService.getOneUser({ login });

        const { error } = await authValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, RECORD_NOT_FOUND.customCode);
        }

        if (!userByLogin) {
            throw new ErrorHandler(statusCode.NOT_FOUND, RECORD_NOT_FOUND.message, RECORD_NOT_FOUND.customCode);
        }
        next();
    } catch (error) {
        next(error);
    }
};
