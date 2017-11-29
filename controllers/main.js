
var cloudantController = require("./cloudantController.js");
var iotController = require("./iotController.js");

cloudantController.initDB((status)=>{
  console.log("DB Initialized ",status);
});

iotController.initIoTmodule((status)=>{
  console.log("IoT module Initialized ",status);
  iotController.connectIoT((status)=>{
    console.log("IoT module connected ",status);
    iotController.subscribeToDeviceEvents((status)=>{
      console.log("Iot Devices connected ",status);
      iotController.openDeviceEvent();
    });
  });
});
