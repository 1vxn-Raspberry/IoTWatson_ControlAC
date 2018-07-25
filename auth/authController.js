module.exports = function(app,path){
  var  serviceAuth = require('./authService.js');
  var passport = require('passport');
  var cookieParser = require('cookie-parser');
  const config = require('./../config.js');
  var session = require('express-session');
  var dirname = __dirname.replace("auth","");
  app.use(cookieParser());

  app.use(session({resave: 'true', saveUninitialized: 'true' , secret: 'OTc5MjU2ZmMtM2RjNy00'}));

  app.use(passport.initialize());

  app.use(passport.session());



  passport.serializeUser(function(user, done) {

     done(null, user);

  });



  passport.deserializeUser(function(obj, done) {

     done(null, obj);

  });



  var OpenIDConnectStrategy = require('passport-idaas-openidconnect').IDaaSOIDCStrategy;

  var Strategy = new OpenIDConnectStrategy({

                   authorizationURL : config.authorizationURL,

                   tokenURL : config.tokenURL,

                   clientID : config.clientID,

                   scope: 'openid',

                   response_type: 'code',

                   clientSecret : config.clientSecret,

                   callbackURL : config.callbackURL,

                   skipUserProfile: true,

                   issuer: config.issuer,

                   addCACert: true,

                   CACertPathList: ['/certs/oidc_w3id_staging.cer','/certs/SymantecClass3SecureServerCA-G4.pem','/certs/VeriSignClass3PublicPrimaryCertificationAuthority-G5.pem']
                 },

       function(iss, sub, profile, accessToken, refreshToken, params, done) {

                      process.nextTick(function() {

                           profile.accessToken = accessToken;

                           profile.refreshToken = refreshToken;

                           done(null, profile);

                    })

  });



  passport.use(Strategy);

  app.get('/',serviceAuth.ensureAuthenticated, function (req,res){
  //  if(serviceAuth.isItOnOurBlueGroup(req.user['_json'].blueGroups)){
      res.sendFile(path.join(dirname, 'dist/index.html'));
    //}
  //  else{
  //   res.render('Failure');
  // }
 });
  app.get('/Userdata',serviceAuth.ensureAuthenticated, function (req,res){
    //if(serviceAuth.isItOnOurBlueGroup(req.user['_json'].blueGroups)){
      res.json(req.user['_json']);
    //}
  });

  app.get('/auth/sso/callback',function(req, res, next) {
      //console.error(req.user._json);
      var url = req.session.originalUrl || '/';

      passport.authenticate('openidconnect', {
        successRedirect: '/hello',
        failureRedirect: '/failure',
      })(req,res,next);
    });



  app.get('/hello',serviceAuth.ensureAuthenticated, function(req, res) {
               res.redirect('/');
             });



  app.get('/failure', function(req, res) {res.send('login failed'); });

  app.get('/login', passport.authenticate('openidconnect', {}));

}
