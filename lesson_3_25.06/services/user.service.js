const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const { constants } = require('../constants');

const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);

const usersDBPath = path.join(__dirname, constants.DATA_BASE_PATH);

async function getContent() {
    const data = await readFilePromise(usersDBPath);
    return JSON.parse(data.toString());
}

module.exports = {
    getAllUsers: getContent,

    getOneUser: async (userId) => {
        const users = await getContent();
        const findUser = users.find((user) => user.id === +userId);
        if (!findUser) {
            throw new Error('user not found');
        }
        return findUser;
    },

    createUser: async (newUser) => {
        const users = await getContent();
        const existUser = users.some((user) => user.login === newUser.login);

        if (existUser) {
            throw new Error('this user is already login');
        }

        users.push({ ...newUser, id: users.length + 1 });

        await writeFilePromise(usersDBPath, JSON.stringify(users));
    },

    deleteUser: async (userId) => {
        const users = await getContent();

        const newUsersArray = users.filter((user) => user.id !== +userId);

        await writeFilePromise(usersDBPath, JSON.stringify(newUsersArray));
    },

    updateUser: async (userId, newUserInfo) => {
        const users = await getContent();

        const newUsersArray = users.filter((user) => user.id !== +userId);
        newUsersArray.push({ ...newUserInfo, id: +userId });

        await writeFilePromise(usersDBPath, JSON.stringify(newUsersArray));
    }
};
