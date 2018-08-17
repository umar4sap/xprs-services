var auth0 = require("auth0-js");
var Logger = require('bunyan');

var log = new Logger.createLogger({
    name: 'xprs',
    serializers: { req: Logger.stdSerializers.req }
});

const env = {
    AUTH0_UI_CLIENT_ID: process.env.AUTH0_UI_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_XPRS_USERID: process.env.AUTH0_XPRS_USERID,
    AUTH0_XPRS_PASSWORD: process.env.AUTH0_XPRS_PASSWORD,
    AUTH0_REALM: process.env.AUTH0_CLIENT_REALM_DB
};

//setup webauth to use auth0 api
var webAuth = new auth0.WebAuth({
    domain: env.AUTH0_DOMAIN,
    clientID: env.AUTH0_UI_CLIENT_ID,
    responseType: 'code'
    //audience:'https://xprs.auth0.com/userinfo'
});

var userToken = module.exports = {
    getToken: function (data, traceId, clientCallback) {
        webAuth.client.login({
            realm: env.AUTH0_REALM,
            username: data.email,
            password: data.password,
            scope: "openid user_metadata app_metadata email"
        }, function (err, authResult) {
            // Auth tokens in the result or an error
            if (err) {
                log.error('Trace Id:' + traceId + ' Error: ' + err);
                clientCallback(err);
            }
            else {
                var userDetails = authResult;

                clientCallback(null, userDetails);
            }
        });
    }
}

