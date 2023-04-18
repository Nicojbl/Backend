import { CartManager } from "../manager/CartManager.js";
import { Router } from "express";

const router = Router()
const managerCart = new CartManager('./src/files/carts.json')

router.post('/', async (req, res) => {
    const newCart = {
        products: []
    };

    const cart = await managerCart.addCart(newCart);
    res.send(cart);
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    const cart = await managerCart.addProductToCart(cartId, productId, quantity);
    res.send(cart.products);
});

router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;

    const cart = await managerCart.getCartById(cartId);
    res.send(cart.products);
});


export default router;