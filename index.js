const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const api = express();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err);
    return;
  }
  console.log('Connected to the database');
});

api.get('/', (req, res) => {
  const query = 'SELECT * FROM products';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing the query: ' + error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ products: results });
  });
});

api.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
});
