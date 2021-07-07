const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const {
    constants: {
        ACCESS_SECRET_TOKEN,
        ACCESS_TIME,
        REFRESH_SECRET_TOKEN,
        REFRESH_TIME,
        TOKEN_TYPES
    }
} = require('../constants');

const verifyPromise = promisify(jwt.verify);

module.exports = {
    generateTokenPair: () => {
        const accessToken = jwt.sign({}, ACCESS_SECRET_TOKEN, { expiresIn: ACCESS_TIME });
        const refreshToken = jwt.sign({}, REFRESH_SECRET_TOKEN, { expiresIn: REFRESH_TIME });

        return {
            accessToken, refreshToken
        };
    },
    verifyToken: async (token, tokenType = TOKEN_TYPES.ACCESS) => {
        const secretWord = tokenType === TOKEN_TYPES.ACCESS ? ACCESS_SECRET_TOKEN : REFRESH_SECRET_TOKEN;

        await verifyPromise(token, secretWord);
    }
};
