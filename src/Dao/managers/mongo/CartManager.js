import cartModel from "../../Models/carts.model.js";
import productModel from "../../Models/products.model.js";
import ticketModel from "../../Models/ticket.model.js";
import ProductManager from "./ProductManager.js";
import { v4 as uuidv4 } from "uuid";

const productManager = new ProductManager();

class CartManager {
  async createCart() {
    const cart = await cartModel.create({});

    return cart;
  }

  async getCarts() {
    const carts = await cartModel.find();

    return carts;
  }

  async getCartById(cid) {
    const cart = await cartModel
      .findById(cid)
      .populate("products.product")
      .lean();
    if (!cart) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un cart con ese ID",
      };
    }

    return cart;
  }
  
  async addProductToCart(cartId, prodId, req) {
    // Buscar el producto y el carrito en la base de datos
    const product = await productModel.findById(prodId);
    const cart = await cartModel.findById(cartId);
    const userId = req.session.user._id

    if (product.owner === userId) {
      return {
        code: 400,
        status: "Error",
        message: "El dueño del producto no puede comprarselo!",
      };
    }

    // Verificar si el producto y el carrito existen
    if (!product || !cart) {
      return {
        code: 400,
        status: "Error",
        message: "El producto o el carrito no existen",
      };
    }
    // Verificar si el producto ya existe en el carrito
    const existingProductIndex = cart.products.findIndex(
      (productItem) => productItem.product.toString() === prodId
    );

    if (existingProductIndex !== -1) {
      // Si el producto ya existe en el carrito, incrementar la cantidad
      cart.products[existingProductIndex].quantity += 1;
    } else {
      // Si el producto no existe en el carrito, agregarlo con cantidad 1
      cart.products.push({ product: product._id, quantity: 1 });
    }

    // Guardar los cambios en el carrito en la base de datos
    await cart.save();

    const result = await cartModel
      .findById(cartId)
      .populate("products.product");

    return result;
  }

  async deleteCartProd(cartId, prodId) {
    const cart = await cartModel.findById(cartId);
    // Verificar si el carrito existe
    if (!cart) {
      return { success: false, message: "Carrito no encontrado" };
    }
    // Buscar el producto en el carrito
    const product = cart.products.find(
      (product) => product.product.toString() === prodId
    );
    // Verificar si el producto existe en el carrito
    if (!product) {
      return {
        success: false,
        message: "Producto no encontrado en el carrito",
      };
    }
    // Verificar la cantidad del producto
    if (product.quantity === 1) {
      // Si la cantidad del producto es 1, eliminar completamente del carrito
      cart.products = cart.products.filter(
        (product) => product.product.toString() !== prodId
      );
    } else {
      // Si la cantidad del producto es mayor a 1, decrementar la cantidad en 1
      product.quantity--;
    }
    await cart.save();

    return product;
  }

  async deleteCartProducts(cartId) {
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return {
        code: 400,
        status: "Error",
        message: "Carrito no encontrado",
      };
    }
    cart.products = [];
    await cart.save();

    return {
      success: true,
      message: "Productos eliminados del carrito",
      cart: cart,
    };
  }

  async updateCartProd(cartId, products) {
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return {
        code: 400,
        status: "Error",
        message: "Carrito no encontrado",
      };
    }
    // Actualizar los productos del carrito
    cart.products = products;
    await cart.save();

    return cart;
  }

  async updateCartQuantity(cartId, prodId, quantity) {
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return {
        code: 400,
        status: "Error",
        message: "Carrito no encontrado",
      };
    }
    // Buscar el producto en el carrito
    const productIndex = cart.products.findIndex(
      (product) => product.product.toString() === prodId
    );
    // Verificar si el producto existe en el carrito
    if (productIndex === -1) {
      return {
        success: false,
        message: "Producto no encontrado en el carrito",
      };
    }
    // Actualizar la cantidad del producto
    cart.products[productIndex].quantity = quantity;
    await cart.save();

    return cart;
  }

  async finishBuy(cid, req) {
    const cart = await this.getCartById(cid);
    if (!cart) {
      return {
        code: 400,
        status: "Error",
        message: "Carrito no encontrado",
      };
    }

    if (cart.products.length === 0) {
      return {
        code: 400,
        status: "Error",
        message: "no hay productos en el carrito",
      };
    }

    const noStockProd = [];
    const productsBuy = [];
    let total = 0;

    for (let i = 0; i < cart.products.length; i++) {
      const cartProduct = cart.products[i];
      const productDB = await productManager.getProductByID(
        cartProduct.product._id
      );
      if (cartProduct.quantity <= productDB.stock) {
        total += cartProduct.quantity * productDB.price;
        productDB.stock -= cartProduct.quantity;
        const prodUpdated = await productManager.updateProductStock(
          cartProduct.product._id,
          productDB.stock
        );
        productsBuy.push(prodUpdated);
      } else {
        noStockProd.push(cartProduct);
      }
    }

    if (noStockProd.length > 0) {
      return {
        status: 400,
        message: "producto/s sin stock",
        products: noStockProd,
      };
    }

    const id = uuidv4();
    const newTicket = {
      code: id,
      purchase_datatime: new Date().toLocaleDateString(),
      productsBuy,
      amount: total,
      purchaser: req.session.user.email,
    };

    await ticketModel.create(newTicket);
    await this.deleteCartProducts(cid);

    return {
      status: "success",
      massage: "Compra realizada",
      products: newTicket,
    };
  }
}

export default CartManager;
