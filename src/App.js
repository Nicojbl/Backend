import express from "express";
import carts from "./routes/carts.router.js"
import products from "./routes/products.router.js"
import __dirname from "./utils.js";
import Handlebars from "express-handlebars";
import mongoose from 'mongoose';

const PORT = process.env.PORT || 8080;
const app = express()
const mongo = 'mongodb+srv://Nicolas:Basso@cluster0.j6z6cun.mongodb.net/?retryWrites=true&w=majority'
await mongoose.connect(mongo)

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

