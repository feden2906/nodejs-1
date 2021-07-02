const Joi = require('joi');

const { regexEnum } = require('../constants');

module.exports = Joi.object({
    login: Joi.string()
        .regex(regexEnum.EMAIL_REGEXP),
    password: Joi.string()
        .required()
        .min(5)
        .max(25)
});
