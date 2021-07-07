const { ErrorHandler, errors: { RECORD_NOT_FOUND } } = require('../errors');
const { userService } = require('../services');
const { statusCode } = require('../constants');

module.exports = {
    checkIsUserDataExist: (paramName, searchIn = 'body', dataKey = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];
            const user = await userService.getOneUser({ [dataKey]: value });

            if (!user) {
                throw new ErrorHandler(statusCode.NOT_FOUND, RECORD_NOT_FOUND.message, RECORD_NOT_FOUND.customCode);
            }

            req.user = user;
            next();
        } catch (err) {
            next(err);
        }
    }
};
