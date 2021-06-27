const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const { constants } = require('../constants');

const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);

const usersDBPath = path.join(__dirname, constants.DATA_BASE_PATH);

module.exports = {
    getAllUsers: async () => {
        const data = await readFilePromise(usersDBPath);
        return JSON.parse(data.toString());
    },
    getOneUser: async (userId) => {
        const data = await readFilePromise(usersDBPath);
        const users = JSON.parse(data.toString());
        const findUser = users.find((user) => user.id === +userId);
        if (!findUser) {
            throw new Error('user not found');
        }
        return findUser;
    },
    createUser: async (newUser) => {
        const data = await readFilePromise(usersDBPath);
        const users = JSON.parse(data.toString());
        const existUser = users.some((user) => user.login === newUser.login);
        if (existUser) {
            throw new Error('this user is exist');
        }
        users.push({ newUser, id: users.length + 1 });
        await writeFilePromise(usersDBPath, users);
    },
    deleteUser: async (userId) => {
        const data = await readFilePromise(usersDBPath);
        const users = JSON.parse(data.toString());
        const newUsersArray = users.filter((user) => user.id !== +userId);
        await writeFilePromise(usersDBPath, JSON.stringify(newUsersArray));
    },
    updateUser: async (userId, newUserInfo) => {
        const data = await readFilePromise(usersDBPath);
        const users = JSON.parse(data.toString());
        users.splice(userId - 1, 1, newUserInfo);
        await writeFilePromise(usersDBPath, JSON.stringify(users));
    }
};
