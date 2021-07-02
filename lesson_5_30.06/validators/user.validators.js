const Joi = require('joi');

const { regexEnum } = require('../constants');

module.exports = {
    createUser: Joi.object().keys({
        name: Joi.string()
            .required()
            .min(3)
            .max(35),
        age: Joi.number()
            .required()
            .min(16)
            .max(100),
        login: Joi.string()
            .required()
            .regex(regexEnum.EMAIL_REGEX),
        password: Joi.string()
            .required()
            .min(5)
            .max(25)
    })
};