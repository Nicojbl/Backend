import { ProductManager } from "../manager/ProductManager.js";
import { Router } from "express";

const router = Router()
const manager = new ProductManager('./src/files/products.json')

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

router.post('/', async (req, res) => {
    const { title, description, price, code, stock, category } = req.body

    let product = {
        title,
        description,
        price,
        code,
        stock,
        status: true,
        category,
    }

    const newProduct = await manager.addProduct(product)
    res.send(newProduct)
})

router.put('/:pid', async (req, res) => {
    const { title, description, price, code, stock, category } = req.body
    const pid = parseInt(req.params.pid)

    let updateProduct = {
        title,
        description,
        price,
        code,
        stock,
        status: true,
        category,
    }

    const upProduct = await manager.updateProduct(pid, updateProduct)
    res.send(upProduct)
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    const delProduct = await manager.deleteProduct(pid)
    res.send(delProduct)
})

export default router;