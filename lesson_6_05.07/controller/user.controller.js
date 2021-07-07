const { massages, statusCode } = require('../constants');
const { passwordService } = require('../services');
const { userService } = require('../services');

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

            const hashedPassword = await passwordService.hash(password);
            await userService.createUser({ ...req.body, password: hashedPassword });

            res.status(statusCode.CREATED).json(massages.USER_CREATED);
        } catch (err) {
            next(err);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await userService.deleteUser(userId);

            res.status(statusCode.NO_CONTENT).json(massages.USER_DELETED);
        } catch (err) {
            next(err);
        }
    },
    updateUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await userService.updateUser(userId, req.body);

            res.status(statusCode.UPDATED).json(massages.USER_UPDATED);
        } catch (err) {
            next(err);
        }
    }
};
