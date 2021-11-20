const jwt = require('jsonwebtoken');
const { login } = require('../models/loginModel');
const bcrypt = require('bcrypt');

require('dotenv').config();

const authenticate = async ({ email, password }) => {
  const result = await login(email);
  if (!result) {
    return null;
  }
  const { _id, name } = result;
  const { password: hash } = result;
  if (bcrypt.compareSync(password, hash)) {
    const token = await jwt.sign({ _id, name, email }, process.env.SECRET, {
      expiresIn: 3000
    })
    return {
      _id,
      name,
      email,
      token
    };
  }
};

module.exports = { authenticate };
