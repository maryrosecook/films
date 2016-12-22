var express = require('express');
var app = express();
const PORT = process.env.FILMS_PORT || 4000;

app.get('/', function (req, res) {
  res.send("hi");
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
