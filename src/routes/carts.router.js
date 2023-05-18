import { Router } from "express";
import CartManager from "../Dao/manager/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  const result = await cartManager.createCart();

  res.send(result);
});

router.get("/", async (req, res) => {
  const result = await cartManager.getCarts();

  res.send(result);
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;

  const cart = await cartManager.getCartById(cid);

  res.render("cart", { cart: cart });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const result = await cartManager.addProductToCart(cid, pid);

  res.send(result);
});

router.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  const result = await cartManager.deleteCartProd(cid, pid);

  res.send(result);
});

router.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;

  const result = await cartManager.deleteCartProducts(cid);

  res.send(result);
});

router.put("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const products = req.body.products;

  const result = await cartManager.updateCartProduct(cid, products);

  res.send(result);
});

router.put("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity;

  const result = await cartManager.updateCartQuantity(cid, pid, quantity);

  res.send(result);
});

export default router;
