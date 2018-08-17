'use strict';

var url = require('url');
var User = require('../domain/User'),
  Logger = require('bunyan');


var log = new Logger.createLogger({
  name: 'xprs',
  serializers: { req: Logger.stdSerializers.req }
});

module.exports.createUser = function createUser(req, res, next) {
  log.info("in controller ");
  var traceId = req.headers[process.env.TRACE_VARIABLE];
  User.createUser(req.swagger.params, res, next, traceId);
};



module.exports.startUserLogin = function getUserToken(req, res, next) {
  log.info("in controller ");
  var traceId = req.headers[process.env.TRACE_VARIABLE];
  User.getUserToken(req.swagger.params, res, next, traceId);
};
