var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

  var author = 'Servidor chat con Socket.IO';
  var text = 'El cliente con id="'+socket.id+'" se ha conectado';
  console.log(text);
  io.sockets.emit('message-to-all-clients', {
    author: author,
    text: text
  });

  socket.on('message-from-one-client', function(data) {
    console.log(data);
    io.sockets.emit('message-to-all-clients', data);
  });

  socket.on('disconnect', function(){
    var text = 'El cliente con id="'+socket.id+'" se ha desconectado';
    console.log(text);
    io.sockets.emit('message-to-all-clients', {
      author: author,
      text: text
    });
  });

});
