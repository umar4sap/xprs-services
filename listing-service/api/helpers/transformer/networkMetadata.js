'use strict'

networkMetadata.prototype.network = {}

function networkMetadata(data, userId, tenantId,orgId) {
    networkMetadata.prototype.network = {};
    var carrierdata;
    if ((typeof data) === "string") {
        carrierdata = Json.parse(data);
    } else {
        carrierdata = data;
    }
   
    networkMetadata.prototype.network.serviceName = carrierdata.serviceName
    networkMetadata.prototype.network.networkPrefrence = carrierdata.networkPrefrence;
    networkMetadata.prototype.network.carriernetworkStatus = carrierdata.carriernetworkStatus?carrierdata.carriernetworkStatus:"active"
    networkMetadata.prototype.network.origin = carrierdata.origin;
    networkMetadata.prototype.network.destinations = carrierdata.destinations;
    networkMetadata.prototype.network.updatedDTS = carrierdata.updatedDTS;
    networkMetadata.prototype.network.updatedBy = carrierdata.updatedBy;


   
    
}
networkMetadata.prototype.getData = function () {
    return networkMetadata.prototype.network;
}


module.exports = networkMetadata;