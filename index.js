const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const routers = require('./src/api/routes');
const middleError = require('./src/api/middlewares/error');

const app = express();
const corsOptions ={
  origin:'https://desafio-ser-educacional-front.vercel.app', 
  credentials:true, //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

const port = process.env.PORT || 4000;

app.use(bodyParser.json());

/* app.use(cors()); */
app.use(routers);
app.use(middleError);
app.get('/', (_req, res) => {
  return res.status(200).json("Home");
})

app.listen(port, () => console.log(`escutando a porta ${port}`));