import { Router } from "express";
import ProductManager from "../Dao/manager/ProductManager.js";
import productModel from "../Dao/Models/products.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  const { limit, page, sort, query } = req.query;

  const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, Totalpages } =
    await productModel.paginate(
      { category: query },
      { limit: limit, page: page, sort: { price: sort }, lean: true }
    );
  const products = docs;

  res.render("products", {
    products,
    Totalpages,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    limit,
    sort,
    query,
  });
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
