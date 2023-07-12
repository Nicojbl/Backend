import CartManager from "../Dao/managers/mongo/CartManager.js";
// import CartManager from "../Dao/managers/file/CartManager.js";

const cartManager = new CartManager();

class CartController {
  async createCart(req, res) {
    const result = await cartManager.createCart();

    res.send(result);
  }
  async getCarts(req, res) {
    const result = await cartManager.getCarts();

    res.send(result);
  }
  async getCartById(req, res) {
    const cid = req.params.cid;

    const cart = await cartManager.getCartById(cid);

    res.render("cart", { cart: cart });
  }
  async addProductToCart(req, res) {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const result = await cartManager.addProductToCart(cid, pid);

    res.send(result);
  }
  async deteleCartProd(req, res) {
    const { cid, pid } = req.params;

    const result = await cartManager.deleteCartProd(cid, pid);

    res.send(result);
  }
  async deleteCartProducts(req, res) {
    const cid = req.params.cid;

    const result = await cartManager.deleteCartProducts(cid);

    res.send(result);
  }
  async updateCartProd(req, res) {
    const cid = req.params.cid;
    const products = req.body.products;

    const result = await cartManager.updateCartProd(cid, products);

    res.send(result);
  }
  async updateCartQuantity(req, res) {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;

    const result = await cartManager.updateCartQuantity(cid, pid, quantity);

    res.send(result);
  }
  async finishBuy(req, res) {
    const cid = req.params.cid;

    const result = await cartManager.finishBuy(cid, req, res);

    res.send(result);
  }
}

export default CartController;
