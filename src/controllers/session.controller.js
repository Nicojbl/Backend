import { UserRepository } from "../repository/user.repository.js";

const userRepository = new UserRepository();

class SessionController {
  async userRegistered(req, res) {
    res.send({ status: "succes", message: "User registered" });
  }
  async errorRegister(req, res) {
    console.log("fallo en el registro");
    res.send({ status: "error", message: "Error en el registro" });
  }
  async loginSuccess(req, res) {
    if (!req.user) {
      return res
        .status(400)
        .send({ status: "error", message: "credenciales invalidas" });
    }

    req.session.user = await userRepository.CreateUserDto(req.user);

    res.send({
      status: "success",
      payload: req.user,
      message: "Login Success",
    });
  }
  async errorLogin(req, res) {
    console.log("error al logear");
    res.send({
      status: "error",
      payload: req.user,
      message: "error al logear",
    });
  }
  async LoginGithub(req, res) {
    req.session.user = req.user;
    res.redirect("/");
  }
  async logout(req, res) {
    req.session.destroy((err) => {
      if (err)
        return res
          .status(500)
          .send({ status: "error", error: "No pudo cerrar sesion" });
      res.redirect("/");
    });
  }
}

export default SessionController;
