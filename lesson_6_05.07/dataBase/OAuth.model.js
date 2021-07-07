const { Schema, model, Types } = require('mongoose');

const { dataBaseTablesEnum } = require('../constants');

const oAuthSchema = new Schema({
    user: {
        type: Types.ObjectId,
        required: true,
        ref: dataBaseTablesEnum.USERS
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
}, { timestamps: true });

oAuthSchema.pre('findOne', function() {
    this.populate('user');
});

module.exports = model(dataBaseTablesEnum.O_AUTH, oAuthSchema);
