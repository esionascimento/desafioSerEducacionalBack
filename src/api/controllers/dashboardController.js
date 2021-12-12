const express = require('express');
const rescue = require('express-rescue');
const { validateToken } = require('../middlewares/validateToken');
require('dotenv');
const { createContatoService, getAllById, deleteContatoService, editContatoService } = require('../services/dashboardService');
const { validateTokent } = require('../middlewares/validate');

const routerUser = express.Router();

routerUser.put('/edit', validateTokent, rescue(async (req, res, next) => {
  const idAgenda = req.userId;
  const result = await editContatoService(idAgenda, req.body);
  if (result.isError) {
    return next(result);
  }
  return res.status(200).json("Contato atualizado com sucesso.");
}));

routerUser.post('/create', async (req, res, next) =>{
  try {
    const { authorization } = req.headers;
    const payload = validateToken(authorization);
    const { _id } = payload;
    const result = await createContatoService(_id, req.body);
    if (result.isError) {
      return next(result);
    }
    return res.status(200).json({ _id: result });
  } catch (e) {
    return next({status: 400, message: "Erro ao criar contato!"});
  }
});

routerUser.patch('/delete', async (req, res, next) =>{
  if (!req.body) return next({status: 400, message: "Erro ao deletar contato!"});
  try {
    const { authorization } = req.headers;
    const payload = validateToken(authorization);
    const { _id } = payload;
    await deleteContatoService(_id, req.body);
    return res.status(200).json({ delete: true });
  } catch (e) {
    return next({status: 400, message: "Erro ao deletar contato!"});
  }
});

routerUser.get('/', validateTokent, rescue(async (req, res, next) => {
  const idAgenda = req.userId;
  const result = await getAllById(idAgenda);
  if (result.isError) {
    return next(result);
  };
  return res.status(200).json(result);
}));

module.exports = routerUser;