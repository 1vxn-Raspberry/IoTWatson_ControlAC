//functions to export
module.exports = {
  initDB,
  insertDoc,
  retrieveRoomsDB
}

var Cloudant = require('cloudant');
const config = require('./../config.js');// get credentials
var mydb;

function initDB(callback) {
	mydb = Cloudant({
		account: config.cloudant_username,
		password: config.cloudant_password
	}).db.use("historicaltemp");
  callback ("ok");
}

function insertDoc(doc,callback){
  alice.insert(doc, function(err, body, header) {
    if (err) {
      console.log('Error inserting document: ', err.message);
      callback("fail");
    }else{
      console.log('The document was saved successfully: ', err.message);
      callback("ok");
    }

  });
}

function retrieveRoomsDB(callback){
  var array = [];
  mydb.view('Rooms', 'rooms-view', {},
  function(err, body) {
    if (!err) {
      body.rows.forEach(function(doc) {
        array.push(doc.value);
      });
      callback(array);
    }//if end
    else{
      console.error("Something went wrong !!! ",err);
    }
  });//view end

}//retrieveRoomsDB end
