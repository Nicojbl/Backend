import { Router } from "express";
import CartController from "../controllers/carts.controller.js";
import Middlewares from "../middlewares/valitations.js";

const router = Router();
const cartController = new CartController()
const middlewares = new Middlewares()

router.post("/", cartController.createCart);
router.get("/", cartController.getCarts);
router.get("/:cid", cartController.getCartById);
router.get("/:cid/purchase", cartController.finishBuy)
router.post("/:cid/product/:pid", cartController.addProductToCart, middlewares.userAccess);
router.delete("/:cid/product/:pid", cartController.deteleCartProd);
router.delete("/:cid", cartController.deleteCartProducts);
router.put("/:cid", cartController.updateCartProd);
router.put("/:cid/product/:pid", cartController.updateCartQuantity);

export default router;
