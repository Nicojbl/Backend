import { ProductManager } from "./manager/ProductManager.js";
import express from "express";

const manager = new ProductManager('./files/products.json')
const PORT = 8080
const app = express()

app.use(express.urlencoded({extended:true}))

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${ PORT }`)
})

app.get('/products', async (req, res) => {
    const limit = req.query.limit
    const products = await manager.getProducts(limit)
    res.send(products)
})

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid
    const productId = await manager.getProductById(pid)
    res.send(productId)
})

const env = async () => {
    let product = {
        Title: "Monopatin 3444",
        description: "duradero",
        price: "1000",
        thumbnail: "skjdhfasdj",
        code: "asd1223",
        stock: '44',
    }

    let updatedProduct = {
        Title: "Motoelectrica",
        description: "grande",
        price: "3000",
        thumbnail: "skjsdj",
        code: "d1223",
        stock: '24',
    }

    // let crear = await manager.addProduct(product)
    // console.log(crear)  

    // let obtener = await manager.getProducts()
    // console.log(obtener)

    // let obtenerPorId = await manager.getProductById(id)
    // console.log(obtenerPorId)

    // let eliminar = await manager.deleteProduct(id)
    // console.log(eliminar)

    // let actualizar = await manager.updateProduct(id, updatedProduct)
    // console.log(actualizar)
}
env()