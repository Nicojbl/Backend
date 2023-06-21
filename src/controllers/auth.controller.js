import passport from "passport";

class AuthController {
  failRegistrer(req, res, next) {
    passport.authenticate("register", { failureRedirect: "/failRegister" })(req, res, next);
  }
  failLogin(req, res, next) {
    passport.authenticate("login", { failureRedirect: "/failLogin" })(req, res, next);
  }
  authGithub(req, res, next) {
    passport.authenticate("github", { scope: ["user: email"] })(req, res, next);
  }
  authGithubCallback(req, res, next) {
    passport.authenticate("github", { failureRedirect: "/login" })(req, res, next);
  }
}

export default AuthController;
