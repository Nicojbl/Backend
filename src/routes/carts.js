import { CartManager } from "../manager/CartManager.js";
import { Router } from "express";

const router = Router()
const manager = new CartManager('./src/files/carts.json')

router.post('/', async (req, res) => {
    const newCart = {
        products: []
    };

    const cart = await manager.addCart(newCart);
    res.send(cart);
});

export default router;