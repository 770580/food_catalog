const express = require('express');
const app = express();
let data = require('./products-mock.json');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/items', function (req, res) {
  let list = data.items;

  // sorting
  // ...

  // filtering 
  // ...

  // paging
  let total = list.length;
  let offset = Number(req.query.offset);
  let count = Number(req.query.count);

  if (offset >= 0 && count > 0) {
    list = list.slice(offset, offset + count);
  }

  setTimeout(() => res.send({ items: list, total: total}), 500);
})

app.listen(3003, function () {
  console.log('API server listening on port 3003!');
})
