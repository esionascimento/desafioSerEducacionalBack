const connect = require('./connection');
const {ObjectId} = require('mongodb');

const getAllById = async () => {
  const connection = await connect();
  const result = await connection.collection('contatos').find().toArray();
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
}

module.exports = { createContato, getAllById };
