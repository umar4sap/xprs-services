'use strict';
var Q = require('q');
var _ = require('lodash'),
    dbconfig = require('../../config/db'),
    dbUtils = require('../helpers/db/db'),
    NetworkMetadata = require('../helpers/transformer/networkMetadata'),
    VerificationMetadata = require('../helpers/transformer/verificationMetadata'),
    Logger = require('bunyan');
var request = require("request");
var moment = require('moment');
var log = new Logger.createLogger({
    name: 'network-listing-service',
    serializers: { req: Logger.stdSerializers.req }
});
var rdb = require('rethinkdbdash')({
    pool: true,
    cursor: false,
    port: dbconfig.rethinkdb.port,
    host: dbconfig.rethinkdb.host,
    db: dbconfig.rethinkdb.db
});
const uuidv4 = require('uuid/v4');
network.prototype.data = {}


function network(data) {
    network.prototype.data = data;
}
function verification(data) {
    verification.prototype.data = data;
}

network.prototype.getData = function () {
    return network.prototype.data;
}
verification.prototype.getData = function () {
    return verification.prototype.data;
}


// create new network for carrier
network.prototype.postNetwork =(traceId, carrierId,userId, cb) => {
    network.prototype.data['createdDTS'] = moment.utc().format();
    network.prototype.data['updatedDTS'] = moment.utc().format();
    var networkMetadata = new NetworkMetadata(network.prototype.data).getData();
    networkMetadata.networkNameSpace="none";
    // networkMetadata.expringDate=new Date(new Date().getTime()+(180*24*60*60*1000));
    // networkMetadata.listedDate=new Date();
    networkMetadata.createdBy=userId;
    networkMetadata.carrierId=carrierId;
    var response = {
        message: "Cannot create the network.",
        statusCode: 404,
        errorCode: "code1"
    }
     rdb.table("network").insert(networkMetadata).run().then(function (networkData) {
         console.log(JSON.stringify(networkData.generated_keys[0]));
             var resObj = { "status": "200", "data": { "message": "Your network  info published and the network id is -> "+ networkData.generated_keys[0] } }
                    cb(null,resObj);
         
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    
                    cb(response);
                });  
        }

// update network for owner
network.prototype.updateNetworkById =(traceId,carrierId, networkId , cb) => {
    network.prototype.data['updatedDTS'] = moment.utc().format();
    var networkMetadata = new NetworkMetadata(network.prototype.data).getData();
   
     rdb.table("network").get(networkId).update(networkMetadata).run().then(function(networkData) {
             var resObj = { "status": "200", "data": { "message": "Your network info is updated"} }
                    cb(null,resObj);
         
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    var resObj = { "status": "404", "error": err };
                    cb(resObj);
                });  
        }


// delete network
network.prototype.deleteNetwork = ( traceId,carrierId,networkId, cb) => {
    var response = {
        message: "Cannot Delete the network.",
        statusCode: 404,
        errorCode: "code1"
    }
    rdb.table("network").get(networkId).delete().run().then(function (result) {
        cb(null, result);
    }).catch(function (err) {
        log.error("TraceId : %s, Error : %s", "traceId", JSON.stringify(err));
       
        cb(response);
    });
}

// list all network for platform admin level
network.prototype.findAllNetworksForCarrier = (traceId,carrierId,cb) => {
    var response = {
        message: "Cannot Get all network issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
   // var startfrom=startfrom?startfrom:0

        
        rdb.table("network").filter({"carrierId":carrierId}).run().then(function (result) {
            rdb.table("network").count().run().then(function (result2) {
            if (result.length > 0) {
                                    var resObj = { "status": "200", "data": result,"count":result2}
                                    cb(null, resObj);
                } else {
                    var resObj = { "status": "200", "data": result ,"count":result2}
                    cb(null, resObj);
                }

                }).catch(function (err) {
                    var resObj = { "status": "200", "data":  result,"count":"count db error" }
                        cb(null, resObj);
                })
            
            
            
           
        }).catch(function (err) {
            log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            
            cb(response);
        });
   
}


// get network 
network.prototype.getOneNetwork = (traceId,carrierId, networkId, cb) => {
    rdb.table("network").get(networkId).run().then(function (result) {

        if (result.length > 0) {
                        var resObj = { "status": "200", "data": result }
                        cb(null, resObj);
                
        } else {
            var resObj = { "status": "200", "data": result }
            cb(null, resObj);
        }
    }).catch(function (err) {
        log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
        var resObj = { "status": "404", "error": err }
        cb(resObj);
    })
}








module.exports = network;
