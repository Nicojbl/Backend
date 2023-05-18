import productModel from "../Models/products.js";

class ProductManager {
  async addProduct(_product) {
    const product = {
      title: _product.title,
      description: _product.description,
      price: _product.price,
      stock: _product.stock,
      category: _product.category,
    };

    try {
      await productModel.create(product);
      return {
        code: 202,
        status: "Success",
        message: `El producto ${product.title} ha sido agregado con Ã©xito.`,
      };
    } catch (error) {
      return {
        code: 400,
        status: "Error",
        message: `${error}`,
      };
    }
  }

  async getProducts() {
    const products = await productModel.find();

    return products;
  }

  async getProductByID(pid) {
    const product = await productModel.findById(pid).lean();

    return product;
  }

  async deleteProduct(pid) {
    const product = await productModel.deleteOne({ _id: pid });

    if (!product) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un product con ese ID",
      };
    }

    return product;
  }
}

export default ProductManager;
