import userModel from "../../Models/user.model.js";

class UserManager {
  async getUsers() {
    const users = await userModel
      .find()
      .select("first_name last_name email rolAdmin rolPremium");

    if (!users) {
      return {
        code: 400,
        status: "error",
        message: "no se ha encontrado un cart",
      };
    }
    return users;
  }

  async updateUserRol(uid) {
    const user = await userModel.findById(uid);

    if (!user.rolPremium) {
      user.rolPremium = true;
    } else {
      user.rolPremium = false;
    }
    user.save()
    return user;
  }
}

export default UserManager;
