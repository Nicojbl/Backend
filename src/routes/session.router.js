import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import SessionController from "../controllers/session.controller.js";

const router = Router();
const authController = new AuthController();
const sessionController = new SessionController();

router.post("/register", authController.failRegistrer, sessionController.userRegistered);
router.post("/login", authController.failLogin, sessionController.loginSuccess);
router.get("/failRegister", sessionController.errorRegister);
router.get("/failLogin", sessionController.errorLogin);
router.get("/github", authController.authGithub);
router.get("/githubcallback", authController.authGithubCallback, sessionController.LoginGithub);
router.get("/logout", sessionController.logout);

export default router;
