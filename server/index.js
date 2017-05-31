const express = require('express');
const app = express();
let data = require('./products-mock.json');

app.get('/api/test', function (req, res) {
  res.send('API server works!');
})

app.get('/api/items', function (req, res) {
  let slicedData = {};
  if (req.query.offset && req.query.count) {
    slicedData.items = data.items.slice(req.query.offset, Number(req.query.offset) + Number(req.query.count));
  } else {
    slicedData = data;
  }

  setTimeout(() => (res.send(JSON.stringify(slicedData))), 500);
})

app.listen(3003, function () {
  console.log('API server listening on port 3003!');
})
