import express from "express";
import carts from "./routes/carts.router.js";
import products from "./routes/products.router.js";
import __dirname from "./utils.js";
import Handlebars from "express-handlebars";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionRouter from "./routes/session.router.js";
import viewRouter from "./routes/view.router.js";
import passport from "passport";
import initialzePassport from "./config/passport.config.js";

const PORT = process.env.PORT || 8080;
const app = express();
const mongo =
  "mongodb+srv://Nicolas:Basso@cluster0.j6z6cun.mongodb.net/?retryWrites=true&w=majority";
const connect = await mongoose.connect(mongo);

// Servicio
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    store: new MongoStore({
      mongoUrl: mongo,
      ttl: 3600,
    }),
    secret: "CoderSecret",
    resave: false,
    saveUninitialized: false,
  })
);
initialzePassport();
app.use(passport.initialize());
app.use(passport.session());

// Vistas
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.engine("handlebars", Handlebars.engine());

// Rutas
app.use("/api/products", products);
app.use("/api/carts", carts);
app.use("/api/sessions", sessionRouter);
app.use("/", viewRouter);

// Server
const server = app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
