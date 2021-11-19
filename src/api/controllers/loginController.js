const service = require('../services/loginService');

class loginController {
  constructor(loginService) {
    this.loginService = loginService;
  }
  login = (req, res) => {
    this.loginService.authenticate(req.body)
      .then(user => user ? res.json(user) : res.status(403).json({ message: 'Usuario ou senha invalidos'}))
      .catch()
  }
}

module.exports = new loginController(service);
