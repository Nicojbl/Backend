import fs from "fs";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    const products = await this.getProducts(0);
    const newProduct = { ...product, id: this.getNextId(products) };
    products.push(newProduct);
    const data = JSON.stringify(products, null, "\t");
    await fs.promises.writeFile(this.path, data);
    return newProduct;
  }

  async getProducts(limit) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      if (limit > 0) {
        const productsLimit = products.slice(0, limit);
        return productsLimit;
      } else {
        return products;
      }
    } catch {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts(0);
    return products.find((product) => product.id === parseInt(id));
  }

  async updateProduct(id, updatedProduct) {
    const products = await this.getProducts(0);
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index !== -1) {
      products[index] = { ...updatedProduct, id };
      const data = JSON.stringify(products, null, "\t");
      await fs.promises.writeFile(this.path, data);
      return products[index];
    } else {
      return null;
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts(0);
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1)[0];
      const data = JSON.stringify(products, null, "\t");
      await fs.promises.writeFile(this.path, data);
      return deletedProduct;
    } else {
      return null;
    }
  }

  getNextId(products) {
    const lastProduct = products[products.length - 1];
    return lastProduct ? parseInt(lastProduct.id) + 1 : 1;
  }
}
