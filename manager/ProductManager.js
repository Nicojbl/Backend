import fs from 'fs';

export class ProductManager {
    // El constructor toma una ruta de archivo como argumento
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        // Se llama al método "getProducts" para obtener la lista actual de productos
        const products = await this.getProducts();
        // Se agrega un nuevo producto a la lista y se le asigna un nuevo id
        const newProduct = { ...product, id: this.getNextId(products) };
        products.push(newProduct);
        // Se escribe la lista actualizada en el archivo JSON correspondiente
        const data = JSON.stringify(products, null, '\t');
        await fs.promises.writeFile(this.path, data);
        return newProduct;
    };

    async getProducts() {
        // Se lee el archivo JSON y se convierte en un objeto
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    };


    async getProductById(id) {
        const products = await this.getProducts();
        return products.find((product) => product.id === id);
    };

    async updateProduct(id, updatedProduct) {
        const products = await this.getProducts();
        const index = products.findIndex((product) => product.id === id);
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
        const products = await this.getProducts();
        const index = products.findIndex((product) => product.id === id);
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
        return lastProduct ? lastProduct.id + 1 : 1;
    };
}

