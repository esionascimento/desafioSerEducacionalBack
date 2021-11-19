const connect = require('./connection');

const getByEmail = () => {
  return 'query do mongo';
}

const create = async (name, email, password) => {
  const conection = await connect();
  const newUser = await conection.collection('users').insertOne({name, email, password});
  return newUser;
}

const getAll = async () => {
  const auxConnect = await connect();
  const result = await auxConnect.collection('users').find().toArray();
  return result;
}

module.exports ={
  getByEmail,
  create,
  getAll,
}