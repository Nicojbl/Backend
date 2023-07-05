class Middlewares {
  async privateAccess(req, res, next) {
    if (!req.session.user) return res.redirect("/");
    next();
  }
  async publicAccess(req, res, next) {
    if (req.session.user) return res.redirect("/api/products");
    next();
  }
  async adminAccess(req, res, next) {
    if ((req.session.user.rolAdmin = false)) return res.redirect("/");
    next();
  }
  async userAccess(req, res, next) {
    if ((req.session.user.rolAdmin = true)) return res.redirect("/");
    next();
  }
}

export default Middlewares;
