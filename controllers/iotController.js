module.exports = {
  initIoTmodule,
  connectIoT,
  subscribeToDeviceEvents,
  openDeviceEvent
}
var iotServices = require('./../services/iotServices.js');

function initIoTmodule(callback) {
  iotServices.initIoTmodule(callback);
}

function connectIoT(callback){
  iotServices.connectIoT(callback);
}

function subscribeToDeviceEvents(callback){
  iotServices.subscribeToDeviceEvents(callback);
}

function openDeviceEvent(){
  iotServices.openDeviceEvent();
}
