const express = require('express');
const { validateToken } = require('../middlewares/validateToken');
require('dotenv');
const { createContatoService, getAllById, deleteContatoService } = require('../services/dashboardService');

const routerUser = express.Router();

routerUser.get('/', async (req, res) =>{
  try {
    const { authorization } = req.headers;
    const payload = validateToken(authorization);
    const { _id } = payload;
    const result = await getAllById(_id);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(401).json('erro ao buscar contatos');
  }
});

routerUser.post('/create', async (req, res, next) =>{
  try {
    const { authorization } = req.headers;
    const payload = validateToken(authorization);
    const { _id } = payload;
    const result = await createContatoService(_id, req.body);
    return res.status(200).json({ _id: result });
  } catch (e) {
    return res.status(401).json('erro ao criar contato');
    next(e);
  }
});

routerUser.patch('/delete', async (req, res, next) =>{
  if (!req.body) next();
  try {
    const { authorization } = req.headers;
    console.log('nominho: ', req.body);
    const payload = validateToken(authorization);
    const { _id } = payload;
    await deleteContatoService(_id, req.body);
    return res.status(200).json({ delete: true });
  } catch (e) {
    return res.status(401).json({ delete: false });
    next(e);
  }
});

module.exports = routerUser;