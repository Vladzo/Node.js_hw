const userService = require('../services/user.service');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await userService.getAllUsersFromDb();

        res.json(users);
    },

    getUserById: (req, res) => {
        const { user } = req;
        res.json(user);
    },

    createUser: async (req, res) => {
        await userService.createNewUser(req.body);

        res.json('User has been created');
    },

    removeUserById: async (req, res) => {
        const { userId } = req.params;

        await userService.removeUser(userId);

        res.json('User has been removed!');
    },

    updateUserById: async (req, res) => {
        const { userId } = req.params;

        await userService.updateUser(req.body, userId);

        res.json('User has been updated');
    }
};
