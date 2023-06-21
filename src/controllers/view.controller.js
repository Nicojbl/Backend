class ViewController {
  async register(req, res) {
    res.render("register");
  }
  async login(req, res) {
    res.render("login");
  }
}

export default ViewController;
