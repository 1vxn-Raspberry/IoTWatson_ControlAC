module.exports = {
  initIoTmodule,
  connectIoT,
  subscribeToDeviceEvents,
  openDeviceEvent
}
var iot = require('ibmiotf');
var appClient;
const config = require('./../config.js');// get credentials
var cloudantController = require('./../controllers/cloudantController.js');

function initIoTmodule (callback){
  var appClientConfig = {
    org :config.iot_org,
    id :config.iot_id ,
    "auth-key" :config.iot_key,
    "auth-token" :config.iot_token,
    "type" : "shared" // make this connection as shared subscription
  };
  appClient = new iot.IotfApplication(appClientConfig);
  callback("Ok");
}

function connectIoT(callback){
  appClient.connect();
  callback("Ok")
}

function subscribeToDeviceEvents(callback){
  try {
    appClient.on("connect", function () {
      cloudantController.retrieveRoomsDB((rooms)=>{
        rooms.forEach(function(room){
          appClient.subscribeToDeviceEvents(room.deviceType,room.deviceId,"+","json");
        });
      })
    });
  } catch (e) {
    console.error("An error ocurred ",e);
    callback("Error")
  }
  callback("Ok")
}

function openDeviceEvent(){
  console.log("Starting to listen devices .......");
  appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
      console.log("Server speaking, Device Event from : "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
    });
}
