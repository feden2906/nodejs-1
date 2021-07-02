const { statusCode } = require('../constants');
const { userService } = require('../services');
const { passwordHasher } = require('../helpers');

module.exports = {
    getUserContent: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();

            res.json(users);
        } catch (err) {
            next(err);
        }
    },

    getUserById: (req, res) => {
        const { user } = req;
        res.status(statusCode.OK).json(user);
    },

    createNewUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordHasher.hash(password);
            await userService.createUser({ ...req.body, password: hashedPassword });

            res.status(statusCode.CREATED).json('user successfully created');
        } catch (err) {
            next(err);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await userService.deleteUser(userId);

            res.status(statusCode.NO_CONTENT).json('user successfully deleted');
        } catch (err) {
            next(err);
        }
    },
    updateUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            await userService.updateUser(userId, req.body);

            res.status(statusCode.UPDATED).json('user info was successfully updated');
        } catch (err) {
            next(err);
        }
    }
};
