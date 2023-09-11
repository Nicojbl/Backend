import UserManager from "../Dao/managers/mongo/UserManager.js";

const userManager = new UserManager();

class UserController {
  async getUsers(req, res) {
    await userManager.getUsers(req, res);
  }

  async updateUserRol(req, res) {
    const uid = req.params.uid;

    const user = await userManager.updateUserRol(uid, req, res);
    res.send(user);
  }

  async delUser(req, res) {
    const uid = req.params.uid;

    const result = await userManager.delUser(uid, req, res);

    res.send(result);
  }
}

export default UserController;
