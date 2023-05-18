import cartModel from "../Models/carts.js";

class CartManager {
  async createCart() {
    const cart = await cartModel.create({});

    return {
      code: 202,
      status: "Success",
      message: cart,
    };
  }

  async getCarts() {
    const carts = await cartModel.find();

    return {
      code: 202,
      status: "Success",
      message: carts,
    };
  }

  async getCart(cid) {
    const cart = await cartModel.findOne({ _id: cid });

    if (!cart) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un cart con ese ID",
      };
    }

    return {
      code: 202,
      status: "Success",
      message: cart.products,
    };
  }

  async updateCart(cid, pid) {
    const cart = await cartModel.findOne({ _id: cid });

    const prodIndex = cart.products.findIndex((cprod) => cprod._id === pid);

    if (prodIndex === -1) {
      const product = {
        _id: pid,
        quantity: 1,
      };
      cart.products.push(product);
    } else {
      let total = cart.products[prodIndex].quantity;
      cart.products[prodIndex].quantity = total + 1;
    }

    await cartModel.updateOne({ _id: cid }, { $set: cart });

    return {
      code: 202,
      status: "Success",
      message: cart.products,
    };
  }

  async deleteCart(cid) {
    const cart = await cartModel.deleteOne({ _id: cid });

    if (!cart) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un cart con ese ID",
      };
    }

    return {
      code: 202,
      status: "Success",
      message: cart.products,
    };
  }
}

export default CartManager;