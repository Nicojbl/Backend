import passport from "passport";
import local from "passport-local";
import userModel from "../Dao/Models/user.model.js";
import { createHash, validatePassword } from "../utils.js";
import GithubStrategy from "passport-github2";
import { CustomError } from "../services/errors/CustomError.js";
import { EError } from "../services/errors/enums.js";
import { DirectoryErrors } from "../services/errors/info.js";
import CartManager from "../Dao/managers/mongo/CartManager.js";
import dotenv from "dotenv";

dotenv.config();

const directoryErrors = new DirectoryErrors();
const localStrategy = local.Strategy;
const cartManager = new CartManager();

const initialzePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          if (!first_name || !last_name || !email || isNaN(age)) {
            CustomError.createError({
              name: "User create error",
              cause: directoryErrors.UserErrorInfo(req.body),
              message: "Error creando el usuario",
              errorCode: EError.INVALID_TYPES_ERROR,
            });
            window.location.replace("/register");
          }
          const user = await userModel.findOne({ email: username });
          if (user) {
            console.log("el usuario ya existe");
            return done(null, false);
          }
          let rolAdmin = false;
          let rolPremium = false;
          if ((username == process.env.EMAIL_ADMIN)) {
            rolAdmin = true;
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            rolAdmin,
            rolPremium,
            lastConnection: new Date(),
          };

          const result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error al registrar el usuario:" + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            console.log("no existe el usuario");
            return done(null, false);
          }
          if (!validatePassword(password, user)) {
            return done(null, false);
          }
          const userCartId = user.cart;
          if (!userCartId) {
            const createdCart = await cartManager.createCart({ products: [] });
            user.cart = createdCart._id;
            await user.save();
          } else {
            let cart = await cartManager.getCartById(userCartId);
            if (!cart) {
              const createdCart = await cartManager.createCart({
                products: [],
              });
              await user.save();
              user.cart = createdCart._id;
            }
          }
          return done(null, user);
        } catch (error) {
          return done("Error al logear:" + error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACL_URL,
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const user = await userModel.findOne({ email: profile._json.email });
          if (!user) {
            const email =
              profile._json.email == null ? profile._json.username : null;

            const newUser = {
              first_name: profile._json.name,
              last_name: "",
              email: email,
              age: 25,
              password: "",
            };
            const result = await userModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(null, error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};

export default initialzePassport;
