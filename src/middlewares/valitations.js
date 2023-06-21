class Middlewares {
  async privateAccess(req, res, next) {
    if (!req.session.user) return res.redirect("/");
    next();
  }
  async publicAccess(req, res, next) {
    if (req.session.user) return res.redirect("/api/products");
    next();
  }
}

export default Middlewares;
