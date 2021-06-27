const express = require('express');

const { userRouter } = require('./router');
const { constants } = require('./constants');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(constants.PORT, () => {
    console.log('app listen 3000');
});

app.use('/users', userRouter);
