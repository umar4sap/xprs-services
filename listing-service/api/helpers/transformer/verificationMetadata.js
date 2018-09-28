'use strict'

verificationMetadata.prototype.verification = {}

function verificationMetadata(data, userId, tenantId,orgId) {
    verificationMetadata.prototype.verification.verificationDetails = {};
    var carrierdata;
    if ((typeof data) === "string") {
        carrierdata = Json.parse(data);
    } else {
        carrierdata = data;
    }
   
    verificationMetadata.prototype.verification.verificationDetails = carrierdata.verificationDetails
    verificationMetadata.prototype.verification.carrierStatus = carrierdata.status;
    verificationMetadata.prototype.verification.updatedDTS = carrierdata.updatedDTS;
    verificationMetadata.prototype.verification.updatedBy = carrierdata.updatedBy;


   
    
}
verificationMetadata.prototype.getData = function () {
    return verificationMetadata.prototype.verification;
}


module.exports = verificationMetadata;