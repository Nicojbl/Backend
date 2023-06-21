import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import Middlewares from "../middlewares/valitations.js";

const router = Router();
const productController = new ProductController();
const middlewares = new Middlewares();

router.get("/", middlewares.privateAccess, productController.renderProducts);
router.get("/:pid", productController.getProductById);
router.post("/", productController.addProduct);
router.put("/:pid", productController.updateProducts);
router.delete("/:pid", productController.deleteProducts);

export default router;
