import express from "express";
import carts from "./routes/carts.router.js";
import products from "./routes/products.router.js";
import sessionRouter from "./routes/session.router.js";
import userRouter from "./routes/users.router.js";
import viewRouter from "./routes/view.router.js";
import errors from "./services/loggers/EndpointTest.js";
import __dirname from "./utils.js";
import Handlebars from "express-handlebars";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initialzePassport from "./config/passport.config.js";
import { options } from "./config/config.js";
import { errorHandler } from "./middlewares/errors/ErrorHandler.js";
import { addLogger } from "./services/loggers/logger.js";
import { swaggerSpecs } from "./config/docConfig.js";
import swaggerUi from "swagger-ui-express";

const app = express();
const PORT = options.server.port;
const mongo = options.mongo.url;
await mongoose.connect(mongo);

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
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);
initialzePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler);
app.use(addLogger);

// Vistas
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.engine("handlebars", Handlebars.engine());

// Rutas
app.use("/api/products", products);
app.use("/api/carts", carts);
app.use("/api/sessions", sessionRouter);
app.use("/api/users", userRouter);
app.use("/api/errors", errors);
app.use("/", viewRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Server
const server = app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
