import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import Middlewares from "../middlewares/permitions/valitations.js";

const router = Router();
const userController = new UserController();
const middlewares = new Middlewares();

router.get("/", middlewares.adminAccess, userController.getUsers);
router.put("/premium/:uid", middlewares.adminAccess, userController.updateUserRol)
router.delete("/:uid", middlewares.adminAccess, userController.delUser)

export default router;
