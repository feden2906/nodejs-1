const { User } = require('../dataBase');
const { statusCode } = require('../constants');

module.exports = {
    getUserContent: async (req, res, next) => {
        try {
            const users = await User.find({});

            res.json(users);
        } catch (err) {
            next(err);
        }
    },

    getUserById: (req, res) => {
        const { user } = req;
        res.status(statusCode.OK).json(user);
    },

    createUser: async (req, res, next) => {
        try {
            await User.create(req.body);

            res.status(statusCode.CREATED).json('user successfully created');
        } catch (err) {
            next(err);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await User.findByIdAndRemove(userId);

            res.status(statusCode.NO_CONTENT).json('user successfully deleted');
        } catch (err) {
            next(err);
        }
    },
    updateUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            await User.findOneAndUpdate(userId, req.body, { useFindAndModify: false });

            res.status(statusCode.UPDATED).json('user info was user successfully updated');
        } catch (err) {
            next(err);
        }
    }
};
