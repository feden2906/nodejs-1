const express = require('express');
const mongoose = require('mongoose');

const { userRouter } = require('./router');
const { constants, statusCode } = require('./constants');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(constants.PORT, () => {
    console.log('app listen 3000');
});

app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
    res
        .status(err.status)
        .json({
            message: err.message || constants.UNKNOWN_ERROR,
            customCode: err.customCode || 0
        });
}

function _notFoundHandler(err, req, res, next) {
    next({
        status: err.status || statusCode.NOT_FOUND,
        message: err.message || constants.ROUTE_NOT_FOUND
    });
}

function _mongooseConnector() {
    mongoose.connect('mongodb://localhost:27017/feb-21', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
