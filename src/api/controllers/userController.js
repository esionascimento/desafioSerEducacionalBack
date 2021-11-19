const express = require('express');
const bcrypt = require('bcrypt');
const rescue =  require('express-rescue');
const jwt = require('jsonwebtoken');
require('dotenv');

const { create, getAll } = require('../services/userService');
const validateUser = require('../middlewares/validateUser');

const routerUser = express.Router();

routerUser.get('/', rescue(async (_req, res) => {
  const resultAll = await getAll();
  return res.status(200).json(resultAll);
}));

routerUser.post('/', validateUser, rescue(async (req,res, next) =>{
  const {name, email, password} = req.body;
  const secret = process.env.SECRET;
  const saltRounds = Number(process.env.SALT);
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  const result = await create(name, email, hash);

  if(result.isError) {
    return next(result);
  }

  const token = jwt.sign({name,email}, secret, {expiresIn: '45m'});

  return res.status(200).json({message: 'usuario criado com sucesso', token});
}));

module.exports = routerUser;