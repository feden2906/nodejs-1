const Joi = require('joi');

const { regexEnum } = require('../constants');

module.exports = {
    userLogin: Joi.object().keys({
        login: Joi.string()
            .regex(regexEnum.EMAIL_REGEX),
        password: Joi.string()
            .required()
            .min(5)
            .max(25)
    })
};
