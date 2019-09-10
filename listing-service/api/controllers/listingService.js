'use strict';

//tenantId not added to apis due to auth0 security not implemented

var Carrier = require('../domain/carrier'),
 
    Logger = require('bunyan'),
    validator = require('node-validator'),
    request = require("request"),
    async = require('async'),
    _ = require("underscore");
var log = new Logger.createLogger({
    name: 'carrier-listing-service',
    serializers: { req: Logger.stdSerializers.req }
});
var URL = 'https://xprs.com/roles';
module.exports = {
    getcityCarriers:getcityCarriers,
    getCountryCarriers:getCountryCarriers,
    addCarrier:addCarrier,
    getcityCarriersListByServiceType:getcityCarriersListByServiceType,
    updateCarrier:updateCarrier,
    getCarrier:getCarrier,
    getCarrierPublic:getCarrierPublic,
    getCarriersAllInReview:getCarriersAllInReview,
    deleteCarrier:deleteCarrier,
    updateCarrierVerification:updateCarrierVerification,
    getListByPage:getListByPage
   
};

// function for find the user type from token.
function currentUserType(currentPermissionsOrgs, orgId, cb) {
    _.each(currentPermissionsOrgs, function (org, key) {
        if (org[orgId]) {
            cb(org[orgId].teams[0].role)
        }
    })
}

// create a  Carrier
function addCarrier(req, res) {
    var tokenId = req.headers.authorization;
    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    var tenantId = req.user.aud;
    //var userType= req.user[URL].userType;
    var bodyData = req.swagger.params.body.value;
   // var cityId = req.swagger.params.cityId.value;
            (new Carrier(bodyData)).postCarrier(traceId,userId,
                function (err, content) {
                    console.log('after save...'+content)
                    if (err) {
                        console.log("errrrrrrrrrrr")
                        res.send(JSON.stringify(err));
                        log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    } else {
                        res.json(content);
                    }
                });
        }

// update a  Carrier
function updateCarrier(req, res) {
    var tokenId = req.headers.authorization;
    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    var tenantId = req.user.aud;
    var carrierId = req.swagger.params.carrierId.value;
    //var userType= req.user[URL].userType;
    var bodyData = req.swagger.params.body.value;
   
            (new Carrier(bodyData)).updateCarrierById(traceId,carrierId,
                function (err, content) {
                    console.log('after save...'+content)
                    if (err) {
                        console.log("errrrrrrrrrrr")
                        res.send(JSON.stringify(err));
                        log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    } else {
                        res.json(content);
                    }
                });
        }

// update a  verification Carrier
function updateCarrierVerification(req, res) {
    var tokenId = req.headers.authorization;
    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    var tenantId = req.user.aud;
    var carrierId = req.swagger.params.carrierId.value;
    //var userType= req.user[URL].userType;
    var bodyData = req.swagger.params.body.value;
   
            (new Carrier(bodyData)).updateCarrierVerification(traceId,carrierId,userId,
                function (err, content) {
                    console.log('after save...'+content)
                    if (err) {
                        console.log("errrrrrrrrrrr")
                        res.send(JSON.stringify(err));
                        log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
                    } else {
                        res.json(content);
                    }
                });
        }
//Update a training Carrier
function replayCarrier(req, res) {
    var tokenId = req.headers.authorization;
    var userId = req.user.sub.split("|")[1]
    var traceId = process.env.TRACE_VARIABLE;
    var bodyData = req.swagger.params.body.value;
    var tenantId = req.user.aud;
    var cityId = req.swagger.params.cityId.value;
    var orgId = req.swagger.params.orgId.value;
    var CarrierId = req.swagger.params.CarrierId.value;
    var currentPermissionsOrgs = req.user["https://sysgain.newgen.com/app_metadata"].permissions.orgs;
    var userType;
    currentUserType(currentPermissionsOrgs, orgId, function (data) {
        console.log("data", data)
        userType = data;
    });var check = validator.isObject()
    .withRequired('publisherName', validator.isString({ message: "publisherName is required" }))
    .withRequired('publisherEmail', validator.isString({ message: "publisherEmail is required" }))
    .withRequired('repaliedMessage', validator.isString({ message: "repaliedMessage is required" }))
    .withOptional('createdDTS', validator.isString())
    .withOptional('updatedDTS', validator.isString())
validator.run(check, bodyData, function (errorCount, errors) {
    if (errorCount != 0) {
        var response = {
            "status": "failed",
            message: errors
        }
        res.status(400);
        res.json(response);

    } else {
    (new Carrier(req.swagger.params.body.value)).replayCarrier(bodyData,cityId, userId, traceId, CarrierId, userType, orgId,
        function (err, content) {
            if (err) {
                res.json(err);
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            }
            res.set('Content-Type', 'application/json');
            var response = content;
            res.json(response);
        });
    }
    })

};

//Delete a Carrier
function deleteCarrier(req, res) {
    var tokenId = req.headers.authorization;
    var userId = req.user.sub.split("|")[1]
    var traceId = process.env.TRACE_VARIABLE;
    var tenantId = req.user.aud;
    var orgId = req.swagger.params.orgId.value;
    var CarrierId = req.swagger.params.CarrierId.value;
  //  var cityId = req.swagger.params.cityId.value;
    var currentPermissionsOrgs = req.user["https://sysgain.newgen.com/app_metadata"].permissions.orgs;
    var userType;
    currentUserType(currentPermissionsOrgs, orgId, function (data) {
        userType = data;
    });
    if(userType=="admin"){
    (new Carrier()).deleteCarrier( CarrierId,orgId,traceId, tenantId, function (err, result) {
        if (err) {
            log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            throw err;
        }
        if (result.deleted == 0) {
            var resObj = { "status": "200", "data": { "message": "carrier does not exist" } }
            res.set('Content-Type', 'application/json');
            res.json(resObj);
        } else {
            res.set('Content-Type', 'application/json');
            var resObj = { "status": "200", "data": { "message": "user's Carrier deleted successfully" } }
            res.json(resObj);
        }
    });
}else{
    var resObj = { "status": "400", "data": { "message": "You dont have permission" } }
    res.set('Content-Type', 'application/json');
    res.json(resObj);
}
}


// Get all Carriers for publisher or admin
function getCarriersAllInReview(req, res) {
    var traceId = "test"
    var pg = req.swagger.params.pg.value;
    var status = req.swagger.params.status.value;
    var userType="admin";
    if(userType=="admin"){
    (new Carrier()).findAllCarriersForAllcity(traceId, pg,status,
        function (err, content) {
            console.log('err', err)
            if (err) {
                res.writeHead(err.statusCode, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else if (content) {
                res.json(content)
            }
        });
    }else{
        var resObj = { "status": "400", "data": { "message": "You dont have permission" } }
        res.set('Content-Type', 'application/json');
        res.json(resObj);
    }
}

// Get all Carriers for publisher or admin
function getListByPage(req, res) {
    var traceId = "test"
    var pg = req.swagger.params.pg.value;
    
    (new Carrier()).findAllCarriersForAllcityPublic(traceId, pg,
        function (err, content) {
            console.log('err', err)
            if (err) {
                res.writeHead(err.statusCode, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else if (content) {
                res.json(content)
            }
        });
    
}


//Pull city's all Carriers and theirs replies
function getcityCarriers(req, res) {
   // var tokenId = req.headers.user_access;
    var cityId = req.swagger.params.cityName.value;
    var traceId = process.env.TRACE_VARIABLE|| "my test";
    (new Carrier()).getcityCarriersList(traceId, cityId,
        function (err, content) {
            if (err) {
              
                res.end(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else if (content) {
                res.set('Content-Type', 'application/json');
                res.json(content)
            }
        });
}

//Pull country's all Carriers a
function getCountryCarriers(req, res) {
    // var tokenId = req.headers.user_access;
     var countryName = req.swagger.params.countryName.value;
     var traceId = process.env.TRACE_VARIABLE|| "my test";
     (new Carrier()).getCountryCarriersList(traceId, countryName,
         function (err, content) {
             if (err) {
               
                 res.end(JSON.stringify(err));
                 log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
             } else if (content) {
                 res.set('Content-Type', 'application/json');
                 res.json(content)
             }
         });
 }

//Pull city's all Carriers and theirs replies
function getcityCarriersListByServiceType(req, res) {
    // var tokenId = req.headers.user_access;
     var cityId = req.swagger.params.cityName.value;
     var serviceType = req.swagger.params.serviceType.value;
     var traceId = process.env.TRACE_VARIABLE|| "my test";
     (new Carrier()).getcityCarriersListByServiceType(traceId, cityId,serviceType,
         function (err, content) {
             if (err) {
               
                 res.end(JSON.stringify(err));
                 log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
             } else if (content) {
                 res.set('Content-Type', 'application/json');
                 res.json(content)
             }
         });
 }

//Pull city's all Carriers and theirs replies
function getOwnerCarriers(req, res) {
    var tokenId = req.headers.authorization;
    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    var tenantId = req.user.aud;
    var userType= req.user[URL].userType;
    var traceId = process.env.TRACE_VARIABLE|| "my test";
    (new Carrier()).ownerCarriers(traceId, userId,
        function (err, content) {
            if (err) {
              
                res.end(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else if (content) {
                res.set('Content-Type', 'application/json');
                res.json(content)
            }
        });
}



//publish or reject Carrier
function publishCarrier(req, res) {
    var cityId = req.swagger.params.cityId.value;
    var CarrierId = req.swagger.params.CarrierId.value;
    var bodyData = req.swagger.params.body.value;
    var userType="admin";
    var check = validator.isObject()
    .withRequired('status', validator.isString({ message: "status is required" }))
    .withOptional('createdDTS', validator.isString())
    .withOptional('updatedDTS', validator.isString())
    if(userType=="admin"){
validator.run(check, bodyData, function (errorCount, errors) {
    if (errorCount != 0) {
        var response = {
            "status": "failed",
            message: errors
        }
        res.status(400);
        res.json(response);
    
    }else{
    (new Carrier()).cityCarriersApproval(bodyData.status,"test", cityId,CarrierId,
        function (err, content) {
            if (err) {
              
                res.end(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else if (content) {
                res.set('Content-Type', 'application/json');
                res.json(content)
            }
        });
    }

})
    }else{
        var resObj = { "status": "400", "data": { "message": "You dont have permission" } }
        res.set('Content-Type', 'application/json');
        res.json(resObj);
    }
}

//get Carrier
function getCarrier(req, res) {
  
    var carrierId = req.swagger.params.carrierId.value;
    var traceId = process.env.TRACE_VARIABLE|| "test";
    (new Carrier()).getOneCarrier(traceId,carrierId,
        function (err, content) {
            if (err) {
                res.end(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else if (content) {
                res.set('Content-Type', 'application/json');
                res.json(content)
            }
        });
}
//get Carrier
function getCarrierPublic(req, res) {
  
    var carrierId = req.swagger.params.carrierId.value;
    var traceId = process.env.TRACE_VARIABLE|| "test";
    (new Carrier()).getCarrier(traceId,carrierId,
        function (err, content) {
            if (err) {
                res.end(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else if (content) {
                res.set('Content-Type', 'application/json');
                res.json(content)
            }
        });
}

// Get user Carriers
function getUserCarrier(req, res) {
    console.log("get user Carrier called")
    var tokenId = req.headers.user_access;
    var cityId = req.swagger.params.cityId.value;
    var userId = req.swagger.params.userId.value;
    var traceId = process.env.TRACE_VARIABLE|| "traceID";
    (new Carrier()).userCarriers(traceId, cityId,userId,
        function (err, content) {
            if (err) {
              
                res.end(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else if (content) {
                res.set('Content-Type', 'application/json');
                res.json(content)
            }
        });
}

// Update user Carrier
function updateUserCarrier(req, res) {
    var tokenId = req.headers.user_access;
    var cityId = req.swagger.params.cityId.value;
    var userId = req.swagger.params.userId.value;
    var traceId = process.env.TRACE_VARIABLE|| "traceID";
    var bodyData = req.swagger.params.body.value;
    (new Carrier(bodyData)).updateUserCarrier(traceId, cityId,userId,
        function (err, content) {
            if (err) {
                res.end(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", traceId, JSON.stringify(err));
            } else if (content) {
                res.set('Content-Type', 'application/json');
                res.json(content)
            }
        });
}
