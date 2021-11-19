const express = require('express');

const loginController = require('../controllers/loginController');

const routers = express.Router();

routers.post('/login', loginController.login);

module.exports = routers;
