const { createContato, getAllById, getByName, deleteContatoService, editContato, getByIdName } = require('../models/dashboardModel');
const { errorContatoExist } = require('../middlewares/constructError');
require('dotenv').config();

const createContatoService = async (_id, body) => {
  const {name, sobrenome, telefone, dataNascimento, endereco, email} = body;
  const notExistContact = await getByName(_id, name);
  if (notExistContact.length > 0) {
    return errorContatoExist("Contact not exist");
  } else {
    const result = await createContato(_id, name, sobrenome, telefone, dataNascimento, endereco, email)
    return result;
  }
}

const editContatoService = async (idAgenda, body) => {
  editContato
  const {contato, name, sobrenome, telefone, dataNascimento, endereco, email} = body;

  const notExistContact = await getByName(idAgenda, name);
  let result;
  if (notExistContact.length > 0) {
    const aux = await getByIdName(idAgenda, contato, name);
    if (aux) {
      result = await editContato(idAgenda, contato, name, sobrenome, telefone, dataNascimento, endereco, email);
    } else {
      return errorContatoExist("name already registered");
    }
  } else {
    result = await editContato(idAgenda, contato, name, sobrenome, telefone, dataNascimento, endereco, email);
    if (result.matchedCount === 0) {
      return errorContatoExist("Contact not exist");
    }
  }

  return result;
}

module.exports = { createContatoService, getAllById, deleteContatoService, editContatoService };
