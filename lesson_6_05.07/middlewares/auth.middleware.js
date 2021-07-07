const { authValidator } = require('../validators');
const {
    ErrorHandler,
    errors: { BAD_REQUEST_BODY, NO_TOKEN, WRONG_TOKEN }
} = require('../errors');
const { tokenService } = require('../services');
const { statusCode, constants } = require('../constants');
const { O_Auth } = require('../dataBase');

module.exports = {
    checkIsEmailValid: async (req, res, next) => {
        try {
            const { error } = await authValidator.userLogin.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, BAD_REQUEST_BODY.customCode);
            }
            next();
        } catch (error) {
            next(error);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCode.UN_AUTHORIZED, NO_TOKEN.message, NO_TOKEN.customCode);
            }
            await tokenService.verifyToken(token);

            const tokenObj = await O_Auth.findOne({ accessToken: token });

            if (!tokenObj) {
                throw new ErrorHandler(statusCode.UN_AUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.customCode);
            }

            req.user = tokenObj.user;

            next();
        } catch (error) {
            next(error);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            if (!token) {
                throw new ErrorHandler(statusCode.UN_AUTHORIZED, NO_TOKEN.message, NO_TOKEN.customCode);
            }
            await tokenService.verifyToken(token, constants.TOKEN_TYPES.REFRESH);

            const tokenObj = await O_Auth.findOne({ refreshToken: token });

            if (!tokenObj) {
                throw new ErrorHandler(statusCode.UN_AUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.customCode);
            }

            req.user = tokenObj.user;

            next();
        } catch (error) {
            next(error);
        }
    }
};
