import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import Middlewares from "../middlewares/permitions/valitations.js";

const router = Router();
const productController = new ProductController();
const middlewares = new Middlewares();

router.get("/mockingproducts", middlewares.adminAccess, middlewares.privateAccess, productController.mockingProducts)
router.get("/", middlewares.privateAccess, productController.renderProducts);
router.post("/", middlewares.premiumAccess, productController.addProduct);
router.get("/getAll", middlewares.adminAccess, productController.getProducts);
router.get("/:pid", productController.getProductById);
router.put("/:pid", middlewares.adminAccess, productController.updateProducts);
router.delete("/:pid", middlewares.adminAccess, productController.deleteProducts);

export default router;
