
module.exports = {
  initSocket,
  openSocket
}
var socketioServices = require('./../services/socketioServices.js');

function initSocket(server,callback){
  socketioServices.initSocket(server,callback);
}

function openSocket(callback){
  socketioServices.openSocket(callback);
}
