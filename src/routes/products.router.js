import { Router } from "express";
import ProductManager from "../Dao/manager/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

const privateAccess = (req, res, next) => {
  if (!req.session.user && !req.session.admin) return res.redirect("/");
  next();
};

router.get("/", privateAccess, async (req, res) => {
  await productManager.renderProducts(req, res)
});

router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;

  const prod = await productManager.getProductByID(pid);

  res.render("prod", { prod });
});

router.post("/", async (req, res) => {
  const product = req.body;

  const result = await productManager.addProduct(product);

  res.send(result);
});

router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const product = req.body;
  const result = await productManager.updateProduct(id, product);

  res.send(result);
});

router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  const result = await productManager.deleteProduct(id);

  res.send(result);
});

export default router;
