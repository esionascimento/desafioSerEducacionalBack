const express = require('express');
const rescue =  require('express-rescue');
const { validateToken } = require('../middlewares/validateToken');
require('dotenv');

const routerUser = express.Router();

routerUser.get('/', rescue(async (_req, res, next) =>{

  return res.status(200).json('oi');
}));

routerUser.post('/create', rescue(async (req, res, next) =>{
  try {
    const { authorization } = req.headers;
    const payload = validateToken(authorization);
    const { _id } = payload;
    
    return res.status(200).json(result);
  } catch (e) {
    return res.status(401).json('erro');
    next(e);
  }
}));

module.exports = routerUser;