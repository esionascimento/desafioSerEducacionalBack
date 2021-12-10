const { createContato, getAllById, deleteContatoService, editContato } = require('../models/dashboardModel');

require('dotenv').config();

const createContatoService = async (_id, body) => {
  const {nome, sobrenome, telefone, dataNascimento, endereco, email} = body;
  const result = await createContato(_id, nome, sobrenome, telefone, dataNascimento, endereco, email)
  return result;
}

const editContatoService = async (_id, body) => {
  editContato
  const {nome, sobrenome, telefone, dataNascimento, endereco, email} = body;
  const result = await editContato(_id, nome, sobrenome, telefone, dataNascimento, endereco, email)
  return result;
}

/* const authenticate = async ({ email, password }) => {
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
}; */

module.exports = { createContatoService, getAllById, deleteContatoService, editContatoService };
