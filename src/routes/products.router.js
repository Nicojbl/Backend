import { Router } from "express";
import ProductManager from "../Dao/manager/ProductManager.js";
import productModel from "../Dao/Models/products.model.js";

const router = Router();
const productManager = new ProductManager();

const privateAccess = (req,res,next)=>{
  if(!req.session.user) return res.redirect('/api/session/login');
  next();
}

router.get("/", privateAccess, async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const sort = req.query.sort || "";
  const query = req.query.query || "";

  let products;

  if (limit === 10 && page === 1 && sort === "" && query === "") {
    // Renderizar la página sin parámetros de consulta
    products = await productModel.find().lean();
    res.render("products", { products });
  } else {
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } =
      await productModel.paginate(
        { category: query },
        { limit, page, sort: { price: sort }, lean: true }
      );
    products = docs;

    if (page > totalPages || totalPages <= 0 || isNaN(page)) {
      // Retornar un mensaje de error si se proporciona un número de página inexistente
      return res.status(400).send("Número de página no válido");
    }

    res.render("products", {
      user: req.session.user,
      products,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      limit,
      sort,
      query,
    });
  }
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
