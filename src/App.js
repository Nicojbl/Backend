import express from "express";
import carts from "./routes/carts.router.js"
import products from "./routes/products.router.js"
import __dirname from "./utils.js";
import Handlebars from "express-handlebars";
import { Server } from "socket.io";
import { ProductManager } from "./manager/ProductManager.js";

const PORT = process.env.PORT || 8080;
const app = express()
const managerProduct = new ProductManager('./src/files/products.json')

// Servicio
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(__dirname + '/public'))

// Vistas
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars');
app.engine('handlebars', Handlebars.engine())

// Rutas
app.use('/api/products', products);
app.use('/api/carts', carts);

// Server
const server = app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${ PORT }`)
})

const io = new Server(server)

io.on('connection', async (socket) => {
    console.log('usuario conectado')
    const products = await managerProduct.getProducts(0)
    io.emit('actualizado', products);

    socket.on('addProduct', async (newProduct) =>{
        await managerProduct.addProduct(newProduct)

        const products = await managerProduct.getProducts(0)
        io.emit('actualizado', products);
    })

    socket.on('delProduct', async (id) => {
        await managerProduct.deleteProduct(id)
        const products = await managerProduct.getProducts(0)
        io.emit('actualizado', products);
    })
})