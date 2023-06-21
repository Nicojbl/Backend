import { Router } from "express";
import CartController from "../controllers/carts.controller.js";

const router = Router();
const cartController = new CartController()

router.post("/", cartController.createCart);
router.get("/", cartController.getCarts);
router.get("/:cid", cartController.getCartById);
router.post("/:cid/product/:pid", cartController.addProductToCart);
router.delete("/:cid/product/:pid", cartController.deteleCartProd);
router.delete("/:cid", cartController.deleteCartProducts);
router.put("/:cid", cartController.updateCartProd);
router.put("/:cid/product/:pid", cartController.updateCartQuantity);

export default router;
