'use strict';
const dotenv = require('dotenv');
dotenv.load();

var SwaggerRestify = require('swagger-restify-mw'),
    restify = require('restify'),
    jwt = require('restify-jwt'),
    cors = require('cors'),
    fs = require('fs'),
    _ = require('lodash');
var configs=require('./config/config');


var app = restify.createServer();



var port = configs[process.env.NODE_ENV].port;
var jwt = jwt({
    //secret: publicKey,
    secret: "R75rx4pbckOXTpTiUSWyU-Cc1ekJgPfwrPech3-f1SCBcE25hJTTZ8qbVIjNSVTW",
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
app.use(cors());
app.use(restify.queryParser());
app.use(restify.bodyParser());
app.use(jwt);

app.listen(port);

//swagger config
var config = {
    appRoot: __dirname,
    swaggerSecurityHandlers: {
        UserSecurity: function(req, authOrSecDef, scopesOrApiKey, cb) {
            console.log(req.user)
            jwt(req, req.res, function(err) {
                if (req.user == undefined) {
                    return cb(new Error('access denied - user does not exist in auth0'));
                } else {
                    var user = req.user.sub.split("|");
                    req.userInfo = user;

                        return cb(null);
                    
                }
            });
        }
    }
};




SwaggerRestify.create(config, function(err, swaggerRestify) {
    if (err) { throw err; }
    swaggerRestify.register(app);
    if (swaggerRestify.runner.swagger.paths['/swagger']) {
        console.log(configs[process.env.NODE_ENV].service+' service started in ' +process.env.NODE_ENV+ ' mode and running on port number' , port);
    }
});

module.exports = app; // for testing