var config = {};
config.loadCredentials = function(appEnv){
  if (appEnv.isLocal){
    console.log("Running Locally");
    //Local env
    env_variables = require('node-env-file')(__dirname + '/.env', {raise: false});
    this.cloudant_password = env_variables.cloudant_password;
    this.cloudant_username = env_variables.cloudant_username;
    this.iot_org = env_variables.iot_org;
    this.iot_id = env_variables.iot_id;
    this.iot_key = env_variables.iot_key;
    this.iot_token = env_variables.iot_token;
    this.authorizationURL = env_variables.authorization_url;
    this.tokenURL = env_variables.token_url;
    this.clientID = env_variables.client_id;
    this.clientSecret = env_variables.client_secret;
    this.callbackURL = env_variables.callback_url;
    this.issuer = env_variables.issuer_id;
  }else{
    this.cloudant_password = process.env.PASSDB;
    this.cloudant_username = process.env.USERDB;
    this.iot_org = process.env.IOT_ORG;
    this.iot_id = process.env.IOT_ID;
    this.iot_key = process.env.IOT_KEY;
    this.iot_token = process.env.IOT_TOKEN;
    this.authorizationURL = process.env.AUTHORIZATION_URL;
    this.tokenURL = process.env.TOKEN_URL;
    this.clientID = process.env.CLIENT_ID;
    this.clientSecret = process.env.CLIENT_SECRET;
    this.callbackURL = process.env.CALLBACK_URL;
    this.issuer = process.env.ISSUER_ID;
  }
}
module.exports = config;
