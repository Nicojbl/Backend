import userModel from "../../Models/user.model.js";
import { transporter } from "../../../config/gmail.js";

class UserManager {
  async getUsers(req, res) {
    const users = await userModel
      .find()
      .select(
        "first_name last_name email rolAdmin rolPremium _id lastConnection"
      )
      .lean();

    if (!users) {
      return {
        code: 400,
        status: "error",
        message: "no se ha encontrado un cart",
      };
    }

    res.render("users", {
      user: users,
    });
  }

  async updateUserRol(uid, req, res) {
    const user = await userModel.findById(uid);

    if (!user.rolPremium) {
      user.rolPremium = true;
    } else {
      user.rolPremium = false;
    }
    await user.save();
    res.redirect("/api/users");
  }

  async delUser(uid, req, res) {
    const user = await userModel.deleteOne({ _id: uid });

    if (!user) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un user con ese ID",
      };
    }

    try {
      const contenido = await transporter.sendMail({
        from: "ecommerce E-Bikes",
        to: "bassonicolasnjbl@gmail.com",
        subject: "Usuario eliminado con exito",
        html: `<div>
        <h1>Hola biker!</h1>
        <p>Eliminamos tu cuenta de E-Bikes por inactividad, espero que vuelvas pronto!</p>
    </div>`,
      });
      console.log("contenido", contenido);
      res.send({
        status: "success",
        menssage: "usuario eliminado",
      });
    } catch (e) {
      res.send({
        status: "Error",
        menssage: "no se pudo eliminar el usuario",
      });
    }
  }
}

export default UserManager;
