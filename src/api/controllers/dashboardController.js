const express = require('express');
const rescue =  require('express-rescue');
const { validateToken } = require('../middlewares/validateToken');
require('dotenv');
const { createContatoService, getAllById } = require('../services/dashboardService');

const routerUser = express.Router();

routerUser.get('/', rescue(async (_req, res, next) =>{
  const result = await getAllById();
  return res.status(200).json(result);
}));

routerUser.post('/create', rescue(async (req, res, next) =>{
  try {
    const { authorization } = req.headers;
    const payload = validateToken(authorization);
    const { _id } = payload;
    const result = await createContatoService(_id, req.body);
    return res.status(200).json({ _id: result });
  } catch (e) {
    return res.status(401).json('erro');
    next(e);
  }
}));

module.exports = routerUser;