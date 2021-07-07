module.exports = {
    ACCESS_TIME: '20m',
    ACCESS_SECRET_TOKEN: process.env.ACCESS_SECRET_TOKEN || 'coffee',
    AUTHORIZATION: 'Authorization',
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/feb-21',
    PORT: process.env.PORT || 3000,
    REFRESH_SECRET_TOKEN: process.env.REFRESH_SECRET_TOKEN || 'sugar',
    REFRESH_TIME: '30d',
    TOKEN_TYPES: {
        ACCESS: 'Access',
        REFRESH: 'Refresh'
    }
};
