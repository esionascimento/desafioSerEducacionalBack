const jwt = require('jsonwebtoken');
require('dotenv');

const validateToken = (token) => {
  console.log('token :', token);

  const SECRET = process.env.SECRET;

  const payload = jwt.verify(token, SECRET);
  return payload;
};

module.exports = { validateToken };