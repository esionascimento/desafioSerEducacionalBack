const service = require('../services/loginService');

class loginController {
  constructor(loginService) {
    this.loginService = loginService;
  }
  login = (req, res, next) => {
    this.loginService.authenticate(req.body)
      .then(user => user ? res.json(user) : res.status(403).json({ message: 'Usuario ou senha invalidos'}))
      .catch(() => {
        return next({status: 401, message: "Erro: Login"});
      });
  }
}

module.exports = new loginController(service);
