// for nodejs:
var http = require('http');

http.createServer(function (req, res) {
  res.write("bomaylatrumMirai");
  res.end();
}).listen(8080);