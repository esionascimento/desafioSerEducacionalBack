const express = require('express');

const loginController = require('../controllers/loginController');
const controllerUser = require('../controllers/userController');
const controllerAuthorization = require('../controllers/authorizationController');
const controllerDashboard = require('../controllers/dashboardController');

const routers = express.Router();

routers.post('/login', loginController.login);
routers.use('/user', controllerUser);
routers.use('/authorization', controllerAuthorization);
routers.use('/dashboard', controllerDashboard);

module.exports = routers;
