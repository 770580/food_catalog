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

  // filtering 
  let filtered = false;
  let priceFrom = Number(req.query.priceFrom);
  let priceTo = Number(req.query.priceTo);
  if (priceFrom >= 0 && priceTo > 0) {
    list = list.filter(item => {
      return item.price >= priceFrom && item.price <= priceTo;
    });
  filtered = true;
  }

  // sorting
  let sortBy = req.query.sortBy;
  let sortDir = req.query.sortDir;
  if (sortBy && sortDir) {
    list = filtered ? list : list.slice();
    if (sortBy === 'name') {
      list.sort((a, b) => (
        sortDir === 'DESC'
        ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        : b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      ))
    } else if (sortBy === 'price') {
      list.sort((a, b) => (
        sortDir === 'DESC'
        ? a.price - b.price
        : b.price - a.price
      ))
    } else {
      list.sort((a, b) => (
        sortDir === 'DESC'
        ? b.raiting - a.raiting
        : a.raiting - b.raiting
      ))
    }
  }

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
