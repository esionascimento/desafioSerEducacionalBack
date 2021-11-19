const jwt = require('jsonwebtoken');
const { login } = require('../models/loginModel');
const bcrypt = require('bcrypt');

require('dotenv').config();

const authenticate = async ({ email, password }) => {
  const result = await login(email);
  const { name } = result;
  if (result) {
    const { password: hash } = result;
    if (bcrypt.compareSync(password, hash)) {
      const token = await jwt.sign({ name, email }, process.env.SECRET, {
        expiresIn: 1200
      })
      return {
        name,
        email,
        token
      };
    }
  }
  return null;
};

module.exports = { authenticate };
