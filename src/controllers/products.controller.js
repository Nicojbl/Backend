import ProductManager from "../Dao/managers/mongo/ProductManager.js";
// import ProductManager from "../Dao/managers/file/ProductManager.js";
import { generateProducts } from "../utils.js";

const productManager = new ProductManager();

class ProductController {
  async addProduct(req, res) {
    const product = req.body;

    const result = await productManager.addProduct(product);

    res.send(result);
  }
  async getProducts(req, res) {
    const result = await productManager.getProducts()
    
    res.send(result)
  }
  async getProductById(req, res) {
    const pid = req.params.pid;

    const prod = await productManager.getProductByID(pid, req);

    res.render("prod", { prod });
  }
  async renderProducts(req, res) {
    await productManager.renderProducts(req, res);
  }
  async updateProducts(req, res) {
    const id = req.params.pid;
    const product = req.body;
    const result = await productManager.updateProduct(id, product);

    res.send(result);
  }
  async deleteProducts(req, res) {
    const id = req.params.pid;

    const result = await productManager.deleteProduct(id);

    res.send(result);
  }
  mockingProducts(req, res) {
    const products = generateProducts();

    res.json({products});
  }
}

export default ProductController;
