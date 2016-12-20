var express = require('express');
var app = express();
const PORT = 4000;

app.get('/', function (req, res) {

});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
