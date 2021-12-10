const { createContato, getAllById, getByName, deleteContatoService, editContato } = require('../models/dashboardModel');
const { errorContatoExist } = require('../middlewares/constructError');
require('dotenv').config();

const createContatoService = async (_id, body) => {
  const {name, sobrenome, telefone, dataNascimento, endereco, email} = body;
  const result = await createContato(_id, name, sobrenome, telefone, dataNascimento, endereco, email)
  return result;
}

const editContatoService = async (idAgenda, body) => {
  editContato
  const {contato, name, sobrenome, telefone, dataNascimento, endereco, email} = body;

  const notExistContact = await getByName(idAgenda, name);

  if (notExistContact.length > 0) {
    return errorContatoExist("name already registered");
  }

  const result = await editContato(idAgenda, contato, name, sobrenome, telefone, dataNascimento, endereco, email);
  if (result.matchedCount === 0) {
    return errorContatoExist("Contact not exist");
  }
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
