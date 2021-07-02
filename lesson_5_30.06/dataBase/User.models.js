const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../constants');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = model(dataBaseTablesEnum.USERS, userSchema);
