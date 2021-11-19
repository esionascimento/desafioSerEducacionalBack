const express = require('express');
const rescue =  require('express-rescue');
const jwt = require('jsonwebtoken');
require('dotenv');

const routerUser = express.Router();

routerUser.post('/', rescue(async (req,res, next) =>{
  const { token } = req.body;

  if(!token) {
    return res.status(401).send({ auth: false, message: 'Token não informado.' }); 
  }
  const secret = process.env.SECRET;
  jwt.verify(token, secret, function(err, decoded) { 
    if (err) {
      return res.status(500).send({ auth: false, message: 'Token inválido.' });
    }

    return res.status(200).send({ auth: true, message: 'Token valido.' });
  }); 
}));

module.exports = routerUser;