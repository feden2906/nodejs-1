const {
    constants: { AUTHORIZATION },
    massages: { TOKEN_REMOVE, TOKEN_UPDATE },
    statusCode
} = require('../constants');
const { O_Auth } = require('../dataBase');
const { passwordService } = require('../services');
const { tokenService } = require('../services');

module.exports = {
    userLogin: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(password, user.password);

            const tokenPair = tokenService.generateTokenPair();

            await O_Auth.create({ ...tokenPair, user });

            res.status(statusCode.OK).json({ ...tokenPair, user });
        } catch (err) {
            next(err);
        }
    },

    userLogout: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            await O_Auth.remove({ accessToken: token });

            res.status(statusCode.NO_CONTENT).json(TOKEN_REMOVE);
        } catch (error) {
            next(error);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            const { user } = req;
            const newTokenPair = tokenService.generateTokenPair();

            await O_Auth.remove({ refreshToken: token });

            await O_Auth.create({ ...newTokenPair, user });

            res.status(statusCode.OK).json(TOKEN_UPDATE);
        } catch (error) {
            next(error);
        }
    }
};
