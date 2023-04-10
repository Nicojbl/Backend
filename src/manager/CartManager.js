import fs from 'fs';

export class CartManager {
    constructor(path) {
        this.path = path;
    }

    async addCart(cart) {
        const carts = await this.getCarts();
        const newCart = { ...cart, id: this.getNextId(carts) };
        carts.push(newCart);
        const data = JSON.stringify(carts, null, '\t');
        await fs.promises.writeFile(this.path, data);
        return newCart;
    }

    async getCarts() {
        try {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(data);
        } catch (error) {
        console.log(error);
        return [];
        }
    }

    async getCartById(cartId) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === parseInt(cartId));
    }

    async addProductToCart(cartId, productId, quantity) {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === parseInt(cartId));
        
        if (!cart) {
            console.log(`El carrito con id ${cartId} no existe.`);
        }
        
        let productFound = false;
        
        cart.products.forEach(product => {
        if (product.id === productId) {
            product.quantity += quantity;
            productFound = true;
        }
        });
        
        if (!productFound) {
            cart.products.push({ id: productId, quantity });
        }
        
        const data = JSON.stringify(carts, null, '\t');
        await fs.promises.writeFile(this.path, data);
        return cart;
    }

    getNextId(carts) {
        const lastCart = carts[carts.length - 1];
        return lastCart ? parseInt(lastCart.id) + 1 : 1;
    }
}

