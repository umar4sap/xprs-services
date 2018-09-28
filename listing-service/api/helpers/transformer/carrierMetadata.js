'use strict'

carrierMetadata.prototype.carrier = {}
carrierMetadata.prototype.carrier.carrierInfo = {}
carrierMetadata.prototype.carrier.carrierSettings = {}

function carrierMetadata(data, userId, tenantId,orgId) {
    carrierMetadata.prototype.carrier = {};
    var carrierdata;
    if ((typeof data) === "string") {
        carrierdata = Json.parse(data);
    } else {
        carrierdata = data;
    }
    carrierMetadata.prototype.carrier.basicDetails={};
    carrierMetadata.prototype.carrier.basicDetails.companyLogo = carrierdata.basicDetails.companyLogo;
    carrierMetadata.prototype.carrier.basicDetails.companyName = carrierdata.basicDetails.companyName;
    carrierMetadata.prototype.carrier.basicDetails.city = carrierdata.basicDetails.city;
    carrierMetadata.prototype.carrier.basicDetails.country = carrierdata.basicDetails.country;
    carrierMetadata.prototype.carrier.basicDetails.branch = carrierdata.basicDetails.branch;
    carrierMetadata.prototype.carrier.basicDetails.ownershipType = carrierdata.basicDetails.ownershipType;
    carrierMetadata.prototype.carrier.basicDetails.ownershipDetails={};
    carrierMetadata.prototype.carrier.basicDetails.ownershipDetails.contactNo = carrierdata.basicDetails.ownershipDetails.contactNo;
    carrierMetadata.prototype.carrier.basicDetails.ownershipDetails.contactEMail = carrierdata.basicDetails.ownershipDetails.contactEMail;
    carrierMetadata.prototype.carrier.carrierStatus = "inReview";
    carrierMetadata.prototype.carrier.carrierPaymentStatus = "intiated";
    carrierMetadata.prototype.carrier.basicDetails.phoneNo = carrierdata.basicDetails.phoneNo;
    carrierMetadata.prototype.carrier.basicDetails.establishmentYear = carrierdata.basicDetails.establishmentYear;
    carrierMetadata.prototype.carrier.basicDetails.location={}
    carrierMetadata.prototype.carrier.basicDetails.location.address = carrierdata.basicDetails.location.address;
    carrierMetadata.prototype.carrier.basicDetails.location.locality = carrierdata.basicDetails.location.locality;
    carrierMetadata.prototype.carrier.basicDetails.location.MapCoordinates={}
    carrierMetadata.prototype.carrier.basicDetails.location.MapCoordinates.latitude = carrierdata.basicDetails.location.MapCoordinates.latitude;
    carrierMetadata.prototype.carrier.basicDetails.location.MapCoordinates.longitude = carrierdata.basicDetails.location.MapCoordinates.longitude;
    carrierMetadata.prototype.carrier.services=carrierdata.services
    carrierMetadata.prototype.carrier.lanesAndRoutes = carrierdata.lanesAndRoutes;
    carrierMetadata.prototype.carrier.paymentTypes = carrierdata.paymentTypes;
    carrierMetadata.prototype.carrier.tags = carrierdata.tags;
    carrierMetadata.prototype.carrier.timingHours={}
    carrierMetadata.prototype.carrier.timingHours.Days = carrierdata.timingHours.Days;
    carrierMetadata.prototype.carrier.contactInformation={}
    carrierMetadata.prototype.carrier.contactInformation.companyWebsite = carrierdata.contactInformation.companyWebsite;
    carrierMetadata.prototype.carrier.contactInformation.contactEMail = carrierdata.contactInformation.contactEMail;
    carrierMetadata.prototype.carrier.verificationDetails = {}
    carrierMetadata.prototype.carrier.createdDTS = carrierdata.createdDTS;
    carrierMetadata.prototype.carrier.updatedDTS = carrierdata.updatedDTS;

   
    
}

function verificationMetadata(data, userId, tenantId,orgId) {
    verificationMetadata.prototype.verification.verificationDetails = {};
    var carrierdata;
    if ((typeof data) === "string") {
        carrierdata = Json.parse(data);
    } else {
        carrierdata = data;
    }
   
    carrierVerification.prototype.verification.verificationDetails = carrierdata.verificationDetails
    carrierVerification.prototype.verification.carrierStatus = carrierdata.status;
    carrierVerification.prototype.verification.updatedDTS = carrierdata.updatedDTS;


   
    
}

carrierMetadata.prototype.getData = function () {
    return carrierMetadata.prototype.carrier;
}
verificationMetadata.prototype.getData = function () {
    return verificationMetadata.prototype.verification;
}





module.exports = carrierMetadata,verificationMetadata;