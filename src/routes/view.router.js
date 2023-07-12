import { Router } from "express";
import Middlewares from "../middlewares/permitions/valitations.js";
import ViewController from "../controllers/view.controller.js";

const router = Router();
const middlewares = new Middlewares();
const viewController = new ViewController();

router.get("/register", middlewares.publicAccess, viewController.register);
router.get("/", middlewares.publicAccess, viewController.login);

export default router;
