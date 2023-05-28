import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failRegister" }),
  async (req, res) => {
    res.send({ status: "succes", message: "User registered" });
  }
);

router.get("/failRegister", async (req, res) => {
  console.log("fallo en el registro");
  res.send({ status: "error", message: "Error en el registro" });
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/failLogin" }),
  async (req, res) => {
    if (!req.user) {
      return res
        .status(400)
        .send({ status: "error", message: "credenciales invalidas" });
    }
    req.session.user = {
      name: `${req.user.first_name} ${req.user.last_name}`,
      email: req.user.email,
      age: req.user.age,
    };

    res.send({
      status: "success",
      payload: req.user,
      message: "Primer logueo!!",
    });
  }
);

router.get("/failLogin", async (req, res) => {
  console.log("error al logear");
  res.send({
    status: "error",
    payload: req.res.user,
    message: "error al logear",
  });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res
        .status(500)
        .send({ status: "error", error: "No pudo cerrar sesion" });
    res.redirect("/");
  });
});

export default router;
