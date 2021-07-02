const { User } = require('../dataBase');

module.exports = {
    getAllUsers: () => User.find({}),

    createUser: (userObject) => User.create({ userObject }),

    deleteUser: (id) => User.findByIdAndRemove(id),

    updateUser: (id, updateInfo) => User.findByIdAndUpdate(id, updateInfo),

    getOneUser: (query) => User.findOne(query)
};
