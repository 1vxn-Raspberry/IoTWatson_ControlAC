module.exports = {
  initMonitoring
}
 var monitoringService = require("./../services/monitoringServices.js");

function initMonitoring(callback){
  monitoringService.initMonitoring(callback);
}
