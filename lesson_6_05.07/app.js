const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { userRouter, authRouter } = require('./router');
const { constants, massages, statusCode } = require('./constants');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(constants.PORT, () => {
    console.log(`app listen ${constants.PORT}`);
});

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
    res
        .status(err.status)
        .json({
            message: err.message || massages.UNKNOWN_ERROR,
            customCode: err.customCode || 0
        });
}

function _notFoundHandler(err, req, res, next) {
    next({
        status: err.status || statusCode.NOT_FOUND,
        message: err.message || massages.ROUTE_NOT_FOUND
    });
}

function _mongooseConnector() {
    mongoose.connect('mongodb://localhost:27017/feb-21', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
