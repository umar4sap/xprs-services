'use strict';

var BearerToken = require('../helpers/bearerToken.js');
var ManagementClient = require('auth0').ManagementClient;
var userToken = require('../helpers/userToken');
var Logger = require('bunyan');

var log = new Logger.createLogger({ 
    name: 'xprs', 
    serializers: { req: Logger.stdSerializers.req } 
});
exports.createUser = function (args, res, next, traceId) {
 
  BearerToken.getToken(traceId, function (users) {

    var management = new ManagementClient({
      token: BearerToken.token,
      domain: process.env.AUTH0_DOMAIN
    });
    
    management.createUser(args.body.value)
      .then(function (user) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
        res.end();
      })
      .catch(function (err) {
        log.error('Trace Id:' + traceId + ' Error: ' + err);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = err.statusCode;
        res.end(JSON.stringify(err));
        res.end();
      });
  });
}

exports.getUserToken = function (args, res, next, traceId) {
  userToken.getToken(args.body.value,traceId, function (error, content) {
    if (error) {
      log.error('Trace Id:' + traceId + ' Error: ' + error);
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = error.statusCode;
      res.end(JSON.stringify(error));
      res.end();
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(content));
      res.end();
    }
  });
}
