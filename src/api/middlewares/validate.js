const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateTokent = (req, res, next) => {
  const token = req.headers.authorization;
  const SECRET = process.env.SECRET;
  try {
    if (!token) {
      return res.status(401).json({message: 'missing auth token'});
    }
    const payload = jwt.verify(token, SECRET);
    if (!payload) {
      return next({status: 401, message: 'Invalid authorization'});
    }
    req.userId = payload._id;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { validateTokent };
