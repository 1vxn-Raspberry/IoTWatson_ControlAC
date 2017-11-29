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


//auth temp
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// Catch all other routes and return the index file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
var monitoring = require("./controllers/monitoringController.js");
var slack = require("./controllers/slackController.js");

slack.initSlackService((status)=>{
  console.log(status);
  monitoring.initMonitoring((status)=>{
    console.log(status);
  })
});

app.get('/holo', (req, res) => {
  res.send(200);
});
var auth = require('./auth/authController.js')(app);
var main = require('./controllers/main.js');


//credentials to make possible the connection between Watson iot and Bluemix


// Server
var server = require('./controllers/server.js')(app,appEnv);
