module.exports = {
  initSocket,
  openSocket
}
var io;
var allClients = [];

function initSocket(server,callback){
  io = require('socket.io')(server);
  callback("Ok");
}

function openSocket(callback){
  io.on('connection',function(socket){//open web socket
    console.log("Someone has been Connected");
    allClients.push(socket);

    socketDisconnected(socket);

  });
  callback("Ok");
}

function socketDisconnected(socket){
  socket.on('disconnect', function() {
     console.log('Got disconnect!');
     var i = allClients.indexOf(socket);
     allClients.splice(i, 1);
  });
}
