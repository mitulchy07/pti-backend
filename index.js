const express = require('express');
const app = express();
const Port = process.env.port || 4000;
const cors = require('cors');
app.use(cors());

// const products = require('./Data/products.json');

app.get('/', (req, res) => {
  res.send('Products API Running');
});

app.listen(Port, () => {
  console.log('Products Server running on port', Port);
});