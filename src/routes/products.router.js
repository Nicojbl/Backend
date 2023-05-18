import { Router } from "express";
import ProductManager from "../Dao/manager/ProductManager.js";
import productModel from "../Dao/Models/products.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  const { limit, page, sort, query } = req.query;

  const {
    docs,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
    Totalpages,
    status,
  } = await productModel.paginate(
    { category: query },
    { limit: limit, page: page, sort: { price: sort }, lean: true }
  );
  const products = docs;

  res.render("home", {
    status,
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

  const result = await productManager.getProductByID(pid);

  res.status(result.code).send({
    status: result.status,
    message: result.message,
  });
});

router.post("/", async (req, res) => {
  const product = req.body;

  const result = await productManager.addProduct(product);

  res.status(result.code).send({
    status: result.status,
    message: result.message,
  });
});

router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const product = req.body;
  const result = await productManager.updateProduct(id, product);

  res.status(result.code).send({
    status: result.status,
    message: result.message,
  });
});

router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;

  const result = await productManager.deleteProduct(id);
  res.status(result.code).send({
    status: result.status,
    message: result.message,
  });
});

export default router;
