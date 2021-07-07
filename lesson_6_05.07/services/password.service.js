const bcrypt = require('bcrypt');

const { ErrorHandler, errors: { WRONG_EMAIL_OF_PASSWORD } } = require('../errors');
const { statusCode } = require('../constants');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordMatch = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatch) {
            throw new ErrorHandler(statusCode.BAD_REQUEST, WRONG_EMAIL_OF_PASSWORD.message, WRONG_EMAIL_OF_PASSWORD.code);
        }
    }
};
