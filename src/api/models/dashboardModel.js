const connect = require('./connection');
const {ObjectId} = require('mongodb');

const getAllById = async (_id) => {
  const connection = await connect();
  const o_id = new ObjectId(_id);
  const result = await connection.collection('contatos').find({_id:o_id}).toArray();
  return result;
};

const editContato = async (_id, nome, sobrenome, telefone, dataNascimento, endereco, email) => {
  const connection = await connect();
  const o_id = new ObjectId(_id);
  const result1 = await connection.collection('contatos').findOne({_id:o_id});

  if (!result1) {
    await connection.collection('contatos').insertOne({_id: ObjectId(_id)});
  }

  const result = await connection.collection('contatos')
  .updateOne(
    {_id: o_id},
    {$set:
      {"data":
      {nome, sobrenome, telefone, dataNascimento, endereco, email }
    }
  },
  );
  console.log('result :', result);
  return result;
};

const createContato = async (_id, nome, sobrenome, telefone, dataNascimento, endereco, email) => {
  const connection = await connect();
  const o_id = new ObjectId(_id);
  const result1 = await connection.collection('contatos').findOne({_id:o_id});

  if (!result1) {
    await connection.collection('contatos').insertOne({_id: ObjectId(_id)});
  }

  const result = await connection.collection('contatos')
  .updateOne(
    {_id: ObjectId(_id)},
    {$push:
      {"data":
        {nome, sobrenome, telefone, dataNascimento, endereco, email }
      }
    },
  );
  
  return result;
};

const deleteContatoService = async (_id, body) => {
  const { nome } = body;
  const connection = await connect();
  const o_id = new ObjectId(_id);

  const result = await connection.collection('contatos')
  .updateOne(
    {_id:o_id},
    { $pull: { data: { nome: nome } } },
  );    
  return result;
};

module.exports = { createContato, getAllById, deleteContatoService, editContato };
