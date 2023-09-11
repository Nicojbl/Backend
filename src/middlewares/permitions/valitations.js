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
    if (!req.session.user.rolAdmin) {
      return res.send({
        status: 403,
        message: "no autorizado!",
      });
    }
    next();
  }

  async premiumAccess(req, res, next) {
    if (!(req.session.user.rolAdmin && req.session.user.rolPremium)) {
      return res.send({
        status: 403,
        message: "no autorizado!",
      });
    }
    next();
  }

  async userAccess(req, res, next) {
    if (req.session.user.rolAdmin)
      return res.send({
        status: 403,
        message: "no autorizado!",
      });
    next();
  }
}

export default Middlewares;
