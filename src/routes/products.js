import { ProductManager } from "../manager/ProductManager.js";
import { Router } from "express";

const router = Router()
const manager = new ProductManager('../files/products.json')

router.get('/', async (req, res) => {
    const limit = req.query.limit
    const products = await manager.getProducts(limit)
    res.send(products)
})

router.get('/:pid', async (req, res) => {
    const pid = req.params.pid
    const productId = await manager.getProductById(pid)
    res.send(productId)
})

export default router;