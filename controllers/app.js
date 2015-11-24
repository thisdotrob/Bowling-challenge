var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io');
var io = socket(server);

app.use(express.static(__dirname + '/../public'));

app.get('/', function (request, response) {
  response.render('index.ejs');
});

server.listen(3000);
