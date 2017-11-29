module.exports = {
  initDB,
  insertDoc,
  retrieveRoomsDB
}
var dbServices = require('./../services/cloudantServices.js');

function initDB(callback) {
  dbServices.initDB(callback);
}

function insertDoc(doc,callback){
  dbServices.insertDoc(doc,callback);
}

function retrieveRoomsDB(callback){
  dbServices.retrieveRoomsDB(callback);
}
