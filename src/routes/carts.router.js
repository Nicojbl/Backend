import { Router } from "express";
import CartManager from "../Dao/manager/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
  const respuesta = await cartManager.getCarts();

  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message,
  });
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;

  const respuesta = await cartManager.getCart(cid);

  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message,
  });
});

router.post("/", async (req, res) => {
  const respuesta = await cartManager.createCart();
  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message,
  });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const respuesta = await cartManager.updateCart(cid, pid);

  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message,
  });
});

router.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;

  const respuesta = await cartManager.deleteCart(cid);

  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message,
  });
});

export default router;