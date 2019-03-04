_ = require("underscore");
var Network = require('../domain/network');

module.exports={
    createNetworkForCarrier:createNetworkForCarrier,
    getNetworkForCarrier:getNetworkForCarrier,
    updateNetworkForCarrier:updateNetworkForCarrier,
    deleteNetworkForCarrier:deleteNetworkForCarrier,
    getNetworkForCarrierById:getNetworkForCarrierById
}



// post a  network
function createNetworkForCarrier(req, res) {
    var tokenId = req.headers.authorization;
    var userId = req.user.sub.split("|")[1];
    var traceId = "test";
    var tenantId = req.user.aud;
    var carrierId = req.swagger.params.carrierId.value;
    //var userType= req.user[URL].userType;
    var bodyData = req.swagger.params.body.value;
   
            (new Network(bodyData)).postNetwork(traceId,carrierId,userId,
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



        function updateNetworkForCarrier(req, res) {
            var tokenId = req.headers.authorization;
            var userId = req.user.sub.split("|")[1];
            var traceId = "test";
            var tenantId = req.user.aud;
            var carrierId = req.swagger.params.carrierId.value;
            //var userType= req.user[URL].userType;
            var networkId = req.swagger.params.networkId.value;
            var bodyData = req.swagger.params.body.value;
           
                    (new Network(bodyData)).updateNetworkById(traceId,carrierId,networkId,
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

                function getNetworkForCarrier(req, res) {
                    var tokenId = req.headers.authorization;
                    var userId = req.user.sub.split("|")[1];
                    var traceId = "test";
                    var tenantId = req.user.aud;
                    var carrierId = req.swagger.params.carrierId.value;
                    //var userType= req.user[URL].userType;
                  //  var networkId = req.swagger.params.networkId.value;
                   
                   
                            (new Network()).findAllNetworksForCarrier(traceId,carrierId,
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


                        function updateNetworkForCarrier(req, res) {
                            var tokenId = req.headers.authorization;
                            var userId = req.user.sub.split("|")[1];
                            var traceId = "test";
                            var tenantId = req.user.aud;
                            var carrierId = req.swagger.params.carrierId.value;
                            //var userType= req.user[URL].userType;
                            var networkId = req.swagger.params.networkId.value;
                            var bodyData = req.swagger.params.body.value;
                           
                                    (new Network(bodyData)).updateNetworkById(traceId,carrierId,networkId,
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
                
                                function getNetworkForCarrierById(req, res) {
                                    var tokenId = req.headers.authorization;
                                    var userId = req.user.sub.split("|")[1];
                                    var traceId = "test";
                                    var tenantId = req.user.aud;
                                    var carrierId = req.swagger.params.carrierId.value;
                                    //var userType= req.user[URL].userType;
                                    var networkId = req.swagger.params.networkId.value;
                                   
                                   
                                            (new Network()).getOneNetwork(traceId,carrierId,networkId,
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

                                        function deleteNetworkForCarrier(req, res) {
                                            var tokenId = req.headers.authorization;
                                            var userId = req.user.sub.split("|")[1];
                                            var traceId = "test";
                                            var tenantId = req.user.aud;
                                            var carrierId = req.swagger.params.carrierId.value;
                                            //var userType= req.user[URL].userType;
                                            var networkId = req.swagger.params.networkId.value;
                                           
                                           
                                                    (new Network()).deleteNetwork(traceId,carrierId,networkId,
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