const jwt = require('jsonwebtoken');
const { login } = require('../models/loginModel');
const bcrypt = require('bcrypt');

require('dotenv').config();

const authenticate = async ({ email, password }) => {
  const result = await login(email);
  if (!result) {
    return null;
  }
  const { name } = result;
  const { password: hash } = result;
  if (bcrypt.compareSync(password, hash)) {
    const token = await jwt.sign({ name, email }, process.env.SECRET, {
      expiresIn: 40
    })
    return {
      name,
      email,
      token
    };
  }
};

module.exports = { authenticate };
