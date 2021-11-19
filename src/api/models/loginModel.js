const connect = require('./connection');

const login = async (email) => {
  const connection = await connect();
  const result = await connection.collection('users').findOne({ email });
  return result;
};

module.exports = { login };
