import { Router } from "express";
import CartController from "../controllers/carts.controller.js";
import Middlewares from "../middlewares/permitions/valitations.js";

const router = Router();
const cartController = new CartController()
const middlewares = new Middlewares()

router.post("/", cartController.createCart);
router.get("/", middlewares.adminAccess, cartController.getCarts);
router.get("/:cid", middlewares.privateAccess, cartController.getCartById);
router.get("/:cid/purchase", middlewares.privateAccess, middlewares.adminAccessNone, cartController.finishBuy)
router.post("/:cid/product/:pid", middlewares.privateAccess, cartController.addProductToCart);
router.delete("/:cid/product/:pid", middlewares.privateAccess, cartController.deteleCartProd);
router.delete("/:cid", middlewares.privateAccess, cartController.deleteCartProducts);
router.put("/:cid", middlewares.privateAccess, cartController.updateCartProd);
router.put("/:cid/product/:pid", middlewares.privateAccess, cartController.updateCartQuantity);

export default router;
