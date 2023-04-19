import fs from 'fs';

export class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        // Se llama al método "getProducts" para obtener la lista actual de productos
        const products = await this.getProducts(0);
        // Se agrega un nuevo producto a la lista y se le asigna un nuevo id
        const newProduct = { ...product, id: this.getNextId(products) };
        products.push(newProduct);
        // Se escribe la lista actualizada en el archivo JSON correspondiente
        const data = JSON.stringify(products, null, '\t');
        await fs.promises.writeFile(this.path, data);
        return newProduct;
    };

    async getProducts(limit) {
        // Se lee el archivo JSON y se convierte en un objeto
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data)
            if (limit > 0) {
                const productsLimit = products.slice(0, limit)
                return productsLimit
            } else {
                return products
            }
        } catch {
            return [];
        }
    };

    async getProductById(id) {
        const products = await this.getProducts(0);
        return products.find((product) => product.id === parseInt(id));
    };

    async updateProduct(id, updatedProduct) {
        const products = await this.getProducts(0);
        const index = products.findIndex((product) => product.id === parseInt(id));
        /** Si se encuentra el índice, se actualiza el producto correspondiente
        y se escribe la lista actualizada en el archivo JSON **/
        if (index !== -1) {
            products[index] = { ...updatedProduct, id };
            const data = JSON.stringify(products, null, '\t');
            await fs.promises.writeFile(this.path, data);
            return products[index];
        } else {
            return null;
        }
    };

    async deleteProduct(id) {
        const products = await this.getProducts(0);
        const index = products.findIndex((product) => product.id === parseInt(id));
        /** Si se encuentra el índice, se elimina el producto correspondiente
        y se escribe la lista actualizada en el archivo JSON **/
        if (index !== -1) {
            const deletedProduct = products.splice(index, 1)[0];
            const data = JSON.stringify(products, null, '\t');
            await fs.promises.writeFile(this.path, data);
            return deletedProduct;
        } else {
            return null;
        }
    };

    getNextId(products) {
        // Se obtiene el último producto de la lista
        const lastProduct = products[products.length - 1];
        // Si el último producto existe, se devuelve el ID del siguiente producto disponible.
        // De lo contrario, se devuelve 1 como el ID del primer producto.
        return lastProduct ? parseInt(lastProduct.id) + 1 : 1;
    };
}

