import { ProductManager } from "../manager/ProductManager.js";
import { Router } from "express";

const router = Router()
const managerProduct = new ProductManager('./src/files/products.json')

router.get('/', async (req, res) => {
    const limit = req.query.limit
    const products = await managerProduct.getProducts(limit)
    res.render('home', { products: products })
})

router.get('/:pid', async (req, res) => {
    const pid = req.params.pid
    const productId = await managerProduct.getProductById(pid)
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

    const newProduct = await managerProduct.addProduct(product)
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

    const upProduct = await managerProduct.updateProduct(pid, updateProduct)
    res.send(upProduct)
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    const delProduct = await managerProduct.deleteProduct(pid)
    res.send(delProduct)
})

export default router;