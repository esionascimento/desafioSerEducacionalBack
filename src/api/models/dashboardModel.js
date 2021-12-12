const connect = require('./connection');
const {ObjectId} = require('mongodb');

const getAllById = async (_id) => {
  const connection = await connect();
  const o_id = new ObjectId(_id);
  const result = await connection.collection('contatos').find({_id:o_id}).toArray();
  return result;
};

const getByName = async (idAgenda, name) => {
  const connection = await connect();
  const result = await connection.collection('contatos')
  .find({_id:ObjectId(idAgenda), data: { $elemMatch: { name: { $eq: name } } }}).toArray();
  return result;
}

const getByIdName = async (idAgenda, contato, name) => {
  const connection = await connect();
  const result = await connection.collection('contatos')
  .findOne({_id: ObjectId(idAgenda),
            data: { $elemMatch: { name: name, id: contato } }});
  return result;
}

const editContato = async (idAgenda, contato, name, sobrenome, telefone, dataNascimento, endereco, email) => {
  const connection = await connect();
  const o_id = new ObjectId(idAgenda);
  const result1 = await connection.collection('contatos').findOne({_id:o_id});
  
  if (!result1) {
    await connection.collection('contatos').insertOne({_id: ObjectId(idAgenda)});
  }
  
  const result = await connection.collection('contatos')
  .updateOne(
    {
      _id: ObjectId(idAgenda),
      data: { $elemMatch: { id: contato } }
    },
    { $set: {
      "data.$.name": name,
      "data.$.sobrenome": sobrenome,
      "data.$.telefone": telefone,
      "data.$.dataNascimento": dataNascimento,
      "data.$.endereco": endereco,
      "data.$.email": email
      }
    }
  );
  return result;
};

const createContato = async (_id, name, sobrenome, telefone, dataNascimento, endereco, email) => {
  const connection = await connect();
  const o_id = new ObjectId(_id);
  id = ObjectId().toString();
  const result1 = await connection.collection('contatos').findOne({_id:o_id});

  if (!result1) {
    await connection.collection('contatos').insertOne({_id: ObjectId(_id)});
  }

  const result = await connection.collection('contatos')
  .updateOne(
    {_id: ObjectId(_id)},
    {$push:
      {"data":
        {id, name, sobrenome, telefone, dataNascimento, endereco, email }
      }
    },
  );
  return result;
};

const deleteContatoService = async (_id, body) => {
  const { name } = body;
  const connection = await connect();
  const o_id = new ObjectId(_id);

  const result = await connection.collection('contatos')
  .updateOne(
    {_id:o_id},
    { $pull: { data: { name } } },
  );    
  return result;
};

module.exports = { createContato, getAllById, deleteContatoService, editContato, getByName, getByIdName };
