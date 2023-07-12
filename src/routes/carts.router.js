import { Router } from "express";
import CartController from "../controllers/carts.controller.js";
import Middlewares from "../middlewares/permitions/valitations.js";

const router = Router();
const cartController = new CartController()
const middlewares = new Middlewares()

router.post("/", cartController.createCart);
router.get("/", cartController.getCarts);
router.get("/:cid", cartController.getCartById);
router.get("/:cid/purchase", cartController.finishBuy)
router.post("/:cid/product/:pid", middlewares.userAccess, cartController.addProductToCart);
router.delete("/:cid/product/:pid", cartController.deteleCartProd);
router.delete("/:cid", cartController.deleteCartProducts);
router.put("/:cid", cartController.updateCartProd);
router.put("/:cid/product/:pid", cartController.updateCartQuantity);

export default router;
