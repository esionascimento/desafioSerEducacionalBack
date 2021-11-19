const jwt = require('jsonwebtoken');
const { login } = require('../models/loginModel');
const bcrypt = require('bcrypt');

require('dotenv').config();

/* const db = [ {email: 'admin', password: 'admin'} ]; */

const authenticate = async ({ email, password }) => {
  const result = await login(email);

  if (result) {
    const { password: hash } = result;
    if (bcrypt.compareSync(password, hash)) {
      const token = await jwt.sign({ email }, process.env.SECRET)
      return {
        token
      };
    }
  }
  return null;
};

module.exports = { authenticate };
