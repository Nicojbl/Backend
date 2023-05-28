import passport from "passport";
import local from "passport-local";
import userModel from "../Dao/Models/user.model.js";
import { createHash, validatePassword } from "../utils.js";
import GithubStrategy from "passport-github2";

const localStrategy = local.Strategy;

const initialzePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });

  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await userModel.findOne({ email: username });
          if (user) {
            console.log("el usuario ya existe");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
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
        clientID: "Iv1.9b31633614b2cb34",
        clientSecret: "c220a0afe4fc0cbe35f128a79f87906a044f3a32",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const user = await userModel.find({ email: profile._json.email });
          if (!user) {
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
};

export default initialzePassport;
