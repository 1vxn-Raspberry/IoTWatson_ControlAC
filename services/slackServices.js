module.exports = {
  initSlackService,
  sendingErrorMessage
}
var Slack = require('slack-node');
var slack;

function initSlackService(callback){
  slack = new Slack();
  callback("Slack Service Initialized");
}

function sendingErrorMessage(issueMessage){
  slack.setWebhook("https://hooks.slack.com/services/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");
  slack.webhook({
    username: "Monitoreo de Cuartos IT (DEV)",
    text: "Status: "+issueMessage
  }, function(err, response) {
    if (err)
      console.error("[INFO] An Error has ocurred sending data to Slack");
  });

}
