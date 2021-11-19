const express = require('express');

const loginController = require('../controllers/loginController');
const controllerUser = require('../controllers/userController');

const routers = express.Router();

routers.post('/login', loginController.login);
routers.use('/user', controllerUser);

module.exports = routers;
