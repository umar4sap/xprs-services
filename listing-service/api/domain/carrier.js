'use strict';
var Q = require('q');
var _ = require('lodash'),
    dbconfig = require('../../config/db'),
    dbUtils = require('../helpers/db/db'),
    CarrierMetadata = require('../helpers/transformer/carrierMetadata'),
    VerificationMetadata = require('../helpers/transformer/verificationMetadata'),
    Logger = require('bunyan');
var request = require("request");
var moment = require('moment');
var log = new Logger.createLogger({
    name: 'carrier-listing-service',
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
carrier.prototype.data = {}


function carrier(data) {
    carrier.prototype.data = data;
}
function verification(data) {
    verification.prototype.data = data;
}

carrier.prototype.getData = function () {
    return carrier.prototype.data;
}
verification.prototype.getData = function () {
    return verification.prototype.data;
}


// create new carrier for owner
carrier.prototype.postCarrier =(traceId, userId , cb) => {
    carrier.prototype.data['createdDTS'] = moment.utc().format();
    
    carrier.prototype.data['updatedDTS'] = moment.utc().format();
    var carrierMetadata = new CarrierMetadata(carrier.prototype.data).getData();
    var carrierNameSpace=carrierMetadata.basicDetails.carrierName+'-'+carrierMetadata.basicDetails.country+'-'+carrierMetadata.basicDetails.city+'-'+carrierMetadata.basicDetails.locality;
    carrierMetadata.carrierNameSpace=carrierNameSpace;
    carrierMetadata.expringDate=new Date(new Date().getTime()+(180*24*60*60*1000));
    carrierMetadata.listedDate=new Date();
    carrierMetadata.userId=userId;
    var response = {
        message: "Cannot create the carrier.",
        statusCode: 404,
        errorCode: "code1"
    }
     rdb.table("carrier").insert(carrierMetadata).run().then(function (carrierData) {
         console.log(JSON.stringify(carrierData.generated_keys[0]));
             var resObj = { "status": "200", "data": { "message": "Your carrier is yet to publish and the Carrier id is -> "+ carrierData.generated_keys[0] } }
                    cb(null,resObj);
         
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    
                    cb(response);
                });  
        }

// update carrier for owner
carrier.prototype.updateCarrierById =(traceId, carrierId , cb) => {
    carrier.prototype.data['updatedDTS'] = moment.utc().format();
    var carrierMetadata = new CarrierMetadata(carrier.prototype.data).getData();
     rdb.table("carrier").get(carrierId).update(carrierMetadata).run().then(function(carrierData) {
             var resObj = { "status": "200", "data": { "message": "Your carrier info is yet to update"} }
                    cb(null,resObj);
         
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    var resObj = { "status": "404", "error": err };
                    cb(resObj);
                });  
        }

// update carrier for owner
carrier.prototype.updateCarrierVerification =(traceId, carrierId ,userId, cb) => {
    carrier.prototype.data['updatedDTS'] = moment.utc().format();
    carrier.prototype.data['updatedBy'] = userId;
    var carrierVerification = new VerificationMetadata(carrier.prototype.data).getData();
     rdb.table("carrier").get(carrierId).update(carrierVerification).run().then(function(carrierData) {
             var resObj = { "status": "200", "data": { "message": "Your carrier info is yet to update"} }
                    cb(null,resObj);
         
                }).catch(function (err) {
                    console.log("first err catch")
                    log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    var resObj = { "status": "404", "error": err };
                    cb(resObj);
                });  
        }

// delete carrier
carrier.prototype.deleteCarrier = ( carrierId,orgId,traceId, tenantId, cb) => {
    var response = {
        message: "Cannot Delete the carrier.",
        statusCode: 404,
        errorCode: "code1"
    }
    rdb.table("carrier").get(carrierId).delete().run().then(function (result) {
        cb(null, result);
    }).catch(function (err) {
        log.error("TraceId : %s, Error : %s", "traceId", JSON.stringify(err));
       
        cb(response);
    });
}

// list all carrier for platform admin level
carrier.prototype.findAllCarriersForAllcity = (traceId, startfrom,status,cb) => {
    var response = {
        message: "Cannot Get all carrier issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
    if(status=="all"){
        rdb.table("carrier").skip(startfrom).limit(10).run().then(function (result) {
            rdb.table("carrier").count().run().then(function (result2) {
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
    }else{

    
    rdb.table("carrier").filter({"carrierStatus":status}).skip(startfrom).limit(10).run().then(function (result) {
        rdb.table("carrier").filter({"carrierStatus":status}).count().run().then(function (result2) {
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
}

// list all carrier for platform admin level
carrier.prototype.findAllCarriersForAllcityPublic = (traceId, startfrom,cb) => {
    var response = {
        message: "Cannot Get all carrier issue with db.",
        statusCode: 404,
        errorCode: "code1"
    }
    rdb.table("carrier").filter({"carrierStatus":"approved"}).skip(startfrom).limit(10).pluck('carrierStatus','carrierId','basicDetails','carrierVerificationStatus').run().then(function (result) {
        var resObj = { "status": "200", "data": result }
        cb(null, resObj);
    }).catch(function (err) {
        log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
        
        cb(response);
    });
}

// Getpublished carrier by cityId
carrier.prototype.getcityCarriersList = (traceId, cityId, cb) => {
    rdb.table("carrier").filter({"basicDetails":{ "city": cityId}}).pluck('carrierStatus','carrierId','basicDetails','carrierVerificationStatus').run().then(function (result) {
  
        if (result.length > 0) {

            rdb.table("carrier").filter({"basicDetails":{ "city": cityId}}).count().run().then(function (result2) {

                if (result.length > 0) {
                                var resObj = { "status": "200", "data": result,"count":result2}
                                cb(null, resObj);
                        
                } else {
                    var resObj = { "status": "200", "data":  result,"count":result2 }
                    cb(null, resObj);
                }
            }).catch(function (err) {
                var resObj = { "status": "200", "data":  result,"count":"count db error" }
                    cb(null, resObj);
            })
                       
                
        } else {
            var resObj = { "status": "200", "data": result,"count": 0 }
            cb(null, resObj);
        }
    }).catch(function (err) {
        log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
        var resObj = { "status": "404", "error": err }
        cb(resObj);
    })
}

// Getpublished carrier by Country
carrier.prototype.getCountryCarriersList = (traceId, CountryId, cb) => {
    rdb.table("carrier").filter({"basicDetails":{ country: CountryId},carrierStatus:"approved"}).pluck('carrierStatus','carrierId','basicDetails','carrierVerificationStatus').run().then(function (result) {

        if (result.length > 0) {
            rdb.table("carrier").filter({"basicDetails":{ "country": CountryId}}).count().run().then(function (result2) {

                if (result.length > 0) {
                                var resObj = { "status": "200", "data": result,"count":result2}
                                cb(null, resObj);
                        
                } else {
                    var resObj = { "status": "200", "data":  result,"count":result2 }
                    cb(null, resObj);
                }
            }).catch(function (err) {
                var resObj = { "status": "200", "data":  result,"count":"count db error" }
                    cb(null, resObj);
            })
                
        } else {
            var resObj = { "status": "200", "data": result ,"count":0}
            cb(null, resObj);
        }
    }).catch(function (err) {
        log.error("TraceId : %s,  Error : %s", traceId, JSON.stringify(err));
        var resObj = { "status": "404", "error": err }
        cb(resObj);
    })
}

// Getpublished carrier by cityid and service type
carrier.prototype.getcityCarriersListByServiceType = (traceId, cityId, type,cb) => {
    rdb.table("carrier").filter({'basicDetails':{'city':cityId}}).filter(rdb.row('services')('modeType').contains(type)).run().then(function (result){

        if (result.length > 0){
            
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
// Get vendors carrier by vendorId
carrier.prototype.ownerCarriers = (traceId, userId, cb) => {
    rdb.table("carriers").filter({ userId: userId}).without("images","logo").run().then(function (result) {

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


// Get carrierId for vendor
carrier.prototype.getOneCarrier = (traceId, carrierId, cb) => {
    rdb.table("carrier").filter({carrierId:carrierId}).run().then(function (result) {

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

carrier.prototype.getCarrier = (traceId, carrierId, cb) => {
    rdb.table("carrier").filter({carrierId:carrierId}).run().then(function (result) {

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

// Getpublished carrier by carrierId
carrier.prototype.carriersApproval = (status,traceId, cityId,carrierId, cb) => {
    rdb.table("carrier").filter({"carrierId":carrierId }).update({"carrierStatus":status}).run().then(function (result) {
                        var resObj = { "status": "200", "data": carrierId + "  carrier  " + status }
                        cb(null, resObj);
                
      
    }).catch(function (err) {
        log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
        var resObj = { "status": "404", "error": err }
        cb(resObj);
    })
}








module.exports = carrier;
