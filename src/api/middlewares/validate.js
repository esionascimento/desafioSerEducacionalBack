const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateTokent = (req, res, next) => {
  const token = req.headers.authorization;
  const SECRET = process.env.SECRET;
  if (!token) {
    return res.status(401).json({message: 'missing auth token'});
  }
  try {
    const payload = jwt.verify(token, SECRET);
    req.userId = payload._id;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'jwt expired' });
  }
};

module.exports = { validateTokent };
