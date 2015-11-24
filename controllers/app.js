var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/../public'));

app.get('/', function (request, response) {
  response.render('index.ejs');
});

server.listen(8080);
