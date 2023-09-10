import UserManager from "../Dao/managers/mongo/UserManager.js";

const userManager = new UserManager();

class UserController {
    async getUsers(req, res) {
        const result = await userManager.getUsers()

        res.send(result)
    }

    async updateUserRol(req, res) {
        const uid = req.params.uid;

        const user = await userManager.updateUserRol(uid)
        res.send(user)
    }
}

export default UserController;
