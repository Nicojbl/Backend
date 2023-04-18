import { ProductManager } from "../../manager/ProductManager"

const socket = io()
const managerProduct = new ProductManager('./src/files/products.json')

