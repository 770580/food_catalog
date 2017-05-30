const express = require('express');
const fs = require('fs');
const app = express();

app.get('/api/test', function (req, res) {
  res.send('API server works!');
})

app.get('/api/items', function (req, res) {
  const fileName = './server/products-mock.json';
  const data =  fs.readFileSync(fileName, 'utf8');
  setTimeout(() => (res.send(data)), 500);
})

app.listen(3003, function () {
  console.log('API server listening on port 3003!');
})
