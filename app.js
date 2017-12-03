//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

var express = require('express');
var cfenv = require('cfenv');
const bodyParser = require('body-parser');
const path = require('path');
var app = express();
var appEnv = cfenv.getAppEnv();
const config = require('./config.js');
config.loadCredentials(appEnv);//loading credentials
var auth = require('./auth/authController.js')(app,path);

//auth temp
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Location of the views (html)
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));




var monitoring = require("./controllers/monitoringController.js");
var slack = require("./controllers/slackController.js");

slack.initSlackService((status)=>{
  console.log(status);
  monitoring.initMonitoring((status)=>{
    console.log(status);
  })
});


var main = require('./controllers/main.js');


//credentials to make possible the connection between Watson iot and Bluemix


// Server
var server = require('./controllers/server.js')(app,appEnv);
