import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();
const userController = new UserController();

router.get("/", userController.getUsers);
router.get("/premium/:uid", userController.updateUserRol)
router.delete("/")

export default router;
