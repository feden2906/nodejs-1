const { passwordHasher } = require('../helpers');
const { userService } = require('../services');

module.exports = {
    userLogin: async (req, res, next) => {
        try {
            const { login, password } = req.body;

            const user = await userService.getOneUser({ login });

            await passwordHasher.compare(user.password, password);

            res.json(user);
        } catch (err) {
            next(err);
        }
    }
};
