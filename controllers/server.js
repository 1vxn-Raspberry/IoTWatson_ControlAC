module.exports = function(app,appEnv){
  var https = require('https');
  var fs = require('fs');
  var server;
  if(!appEnv.isLocal){
   server = app.listen(appEnv.port,'0.0.0.0',function() {
      console.log("server starting on " + appEnv.url);
      console.log('Bluemix Server '+appEnv);
    });
  } else {
    console.log('Creating the server local https://localhost:60001/');
    server = https.createServer({
      key: fs.readFileSync('./certs/key.pem'),
      cert: fs.readFileSync('./certs/cert.pem')
    }, app).listen(60001);

  }
  var socketioController = require('./socketioController.js');
  socketioController.initSocket(server,(status)=>{
    console.log("Web socket inited ",status);
    socketioController.openSocket((status)=>{
      console.log("Web socket opened ",status);
    });
  });
}
