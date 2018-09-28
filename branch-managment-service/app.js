'use strict';

//LIBS
var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var app = restify.createServer();
var jwt = require('restify-jwt');
var Logger = require('bunyan');
var fs = require('fs');
var configFile = require('./config/config.js');
var db = require('./api/helpers/dbServe.js');
var log = new Logger.createLogger({
  name: 'xprs-user-manage',
  serializers: { req: Logger.stdSerializers.req }
});


 var publicKey = fs.readFileSync(__dirname + '/config/xprs.pem');

var port = process.env.PORT || 9007;




var app = restify.createServer({ log: log });
var jwt = jwt({
  secret: publicKey,
  audience: "1KcuECG8q7eKKhZMOZfsoPRLV8AEgskP",//process.env.AUTH0_CLIENT_ID,
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization) {
      return req.headers.authorization.split(' ').reverse()[0];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
});

//app configs
app.use(restify.CORS());
app.use(restify.queryParser());
app.use(restify.bodyParser());
app.use(jwt);
app.pre(function (req, res, next) {
  req.log.info({ req: req }, 'REQUEST');
  next();
});
app.listen(process.env.PORT || 9007);

db.initDB();

//swagger config
var config = {
  appRoot: __dirname,
  swaggerSecurityHandlers: {
    UserSecurity: function (req, authOrSecDef, scopesOrApiKey, cb) {
      jwt(req, req.res, function (err) {
        if (req.user == undefined) {
          return cb(new Error('access denied - user does not exist in auth0'));
        }
        else {
          configFile.currentAuthUser = req.user.sub;
          return cb(null);
        }
      });
    }
  }
};

SwaggerRestify.create(config, function (err, swaggerRestify) {
  if (err) { throw err; }
  swaggerRestify.register(app);
  if (swaggerRestify.runner.swagger.paths['/ownerships']) {
    console.log('try Me:\ncurl http://127.0.0.1:%d/v2/components/branch-management-service', port);
  }
});

module.exports = app; // for testing











