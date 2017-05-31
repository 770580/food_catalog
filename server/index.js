const express = require('express');
const app = express();
let data = require('./products-mock.json');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
