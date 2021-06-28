const { userService } = require('../services');

module.exports = {
    getUserContent: async (req, res) => {
        const users = await userService.getAllUsers();
        res.json(users);
    },

    getUserById: (req, res) => {
        res.json(req.user);
    },

    createUser: async (req, res) => {
        await userService.createUser(req.body);
        res.json('user successfully created ');
    },

    deleteUserById: async (req, res) => {
        const { userId } = req.params;
        await userService.deleteUser(userId);
        res.json('user successfully deleted');
    },

    updateUserById: async (req, res) => {
        const { userId } = req.params;
        await userService.updateUser(userId, req.body);
        res.json('user info was user successfully updated');
    }
};
