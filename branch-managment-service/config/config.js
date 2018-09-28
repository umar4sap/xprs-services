'use strict';
var config={}
config.rethinkdb = {
//host: "127.0.0.1",
host:process.env.DB_HOST ||"localhost",
//db host
port: 28015,
authKey: "",
db: "dev_xprs_users",
};

config.auth0 = {}; 
// config.currentAuthUser="";
// config.auth0.secret  =  process.env.auth0Secret 
// config.auth0.clientID = process.env.auth0ClientID
// config.auth0.manageSecret  = process.env.auth0ManageSecret
// config.auth0.manageClientID =process.env.auth0ManageClientID 
// config.auth0.domain =process.env.domain 
config.currentAuthUser="";
config.auth0.secret  = "R75rx4pbckOXTpTiUSWyU-Cc1ekJgPfwrPech3-f1SCBcE25hJTTZ8qbVIjNSVTW";
config.auth0.clientID = "1KcuECG8q7eKKhZMOZfsoPRLV8AEgskP";
config.auth0.manageSecret  = "sttHb0izt3pPfu6vOJmnvxZ47W2TdKXQnLAOKnWU6XSWkl846BXpUsHQOTGxQ2tF";
config.auth0.manageClientID = "xZcckR0etRoxKFLn21FT7bFv3QTxifQD";
config.auth0.domain = "xprs";
module.exports = config
