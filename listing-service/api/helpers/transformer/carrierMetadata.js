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
    carrierMetadata.prototype.carrier.basicDetails.entityType = carrierdata.basicDetails.entityType;
    carrierMetadata.prototype.carrier.basicDetails.carrierName = carrierdata.basicDetails.carrierName;
    carrierMetadata.prototype.carrier.basicDetails.carrierPhoto = carrierdata.basicDetails.carrierPhoto ? carrierdata.basicDetails.carrierPhoto : "None" ;
    carrierMetadata.prototype.carrier.basicDetails.city = carrierdata.basicDetails.city;
    carrierMetadata.prototype.carrier.basicDetails.locality = carrierdata.basicDetails.locality;
    carrierMetadata.prototype.carrier.basicDetails.country = carrierdata.basicDetails.country;
    carrierMetadata.prototype.carrier.basicDetails.branch = carrierdata.basicDetails.branch;
    carrierMetadata.prototype.carrier.basicDetails.ownershipType = carrierdata.basicDetails.ownershipType;
    carrierMetadata.prototype.carrier.basicDetails.ownerName = carrierdata.basicDetails ? carrierdata.basicDetails.ownerName: undefined;
    carrierMetadata.prototype.carrier.basicDetails.ownerPhone = carrierdata.basicDetails ? carrierdata.basicDetails.ownerPhone: undefined;
    carrierMetadata.prototype.carrier.basicDetails.ownerEMail = carrierdata.basicDetails ? carrierdata.basicDetails.ownerEMail: undefined;
    carrierMetadata.prototype.carrier.basicDetails.companyWebsite = carrierdata.basicDetails.companyWebsite;
    carrierMetadata.prototype.carrier.basicDetails.contactEMail = carrierdata.basicDetails.contactEMail;
    carrierMetadata.prototype.carrier.basicDetails.contactNo = carrierdata.basicDetails.contactNo;
    carrierMetadata.prototype.carrier.basicDetails.establishmentYear = carrierdata.basicDetails.establishmentYear;
    carrierMetadata.prototype.carrier.carrierStatus = "new";
    carrierMetadata.prototype.carrier.carrierVerificationStatus = "pending";
    carrierMetadata.prototype.carrier.carrierPaymentStatus = "intiated";
  
   
    carrierMetadata.prototype.carrier.location=carrierdata.location ? carrierdata.location : {};
    carrierMetadata.prototype.carrier.location.officeType = carrierdata.location ? carrierdata.location.officeType: "not provided";
    carrierMetadata.prototype.carrier.location.address = carrierdata.location ? carrierdata.location.address : "not provided";
    carrierMetadata.prototype.carrier.location.landmark = carrierdata.location ? carrierdata.location.landmark: "not provided";
    carrierMetadata.prototype.carrier.location.pincode = carrierdata.location ?carrierdata.location.pincode:"not provided";
    carrierMetadata.prototype.carrier.location.country = carrierdata.location?carrierdata.location.country:"not provided";
    carrierMetadata.prototype.carrier.location.MapCoordinates=carrierdata.location ? carrierdata.location.MapCoordinates : {};
    carrierMetadata.prototype.carrier.location.MapCoordinates.latitude = carrierdata.location?carrierdata.location.MapCoordinates.latitude:"not provided";
    carrierMetadata.prototype.carrier.location.MapCoordinates.longitude = carrierdata.location?carrierdata.location.MapCoordinates.longitude:"not provided";



    carrierMetadata.prototype.carrier.services=carrierdata.services?carrierdata.services:[]


    carrierMetadata.prototype.carrier.lanesAndRoutes = carrierdata.lanesAndRoutes?carrierdata.lanesAndRoutes:{};


   
  //  carrierMetadata.prototype.carrier.tags = carrierdata.tags;


    carrierMetadata.prototype.carrier.timingHours=carrierdata.timingHours?carrierdata.timingHours:[];

    // carrierMetadata.prototype.carrier.timingHours.Days = carrierdata.timingHours?carrierdata.timingHours.Days:"not provided";
    // carrierMetadata.prototype.carrier.timingHours.from = carrierdata.timingHours?carrierdata.timingHours.from:"not provided";
    // carrierMetadata.prototype.carrier.timingHours.to = carrierdata.timingHours?carrierdata.timingHours.from:"not provided";
    
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