import { ProductManager } from "./manager/ProductManager.js";

const manager = new ProductManager('./files/products.json')

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