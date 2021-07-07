const { ErrorHandler, errors: { BAD_REQUEST_ID } } = require('../errors');
const { statusCode } = require('../constants');
const { userIdValidator } = require('../validators');

module.exports = {
    checkIsUserIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;
            const isUserIdValid = userIdValidator(userId);

            if (!isUserIdValid) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, BAD_REQUEST_ID.message, BAD_REQUEST_ID.customCode);
            }
            next();
        } catch (err) {
            next(err);
        }
    }
};
