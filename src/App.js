import express from "express";
import carts from "./routes/carts.js"
import products from "./routes/products.js"
import __dirname from "./utils.js";

const PORT = 8080
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(__dirname + '/public'))

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${ PORT }`)
})

app.use('/api/products', products);
app.use('/api/carts', carts);