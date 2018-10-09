# XPRS login SERVICE
    This service contains end points to manage user Management API's. 

# Installation
    Install node modules using `npm install`

# Usage
    1. Set the environment variables for the service.
        - AUTH0_CLIENT_ID - Auth0 Details
        - AUTH0_DOMAIN - Auth0 Details
        - AUTH0_CLIENT_SECRET - Auth0 Details
        - PORT - Based on env.
    2. The endpoints and the inputs/outputs to be provided to them are available in "./api/swagger/swagger.yaml".
    
# AUTH0-SERVICE DEPENDS ON
    1. This service has following dependencies, so they must be running:
        - Auth0 Management Api v2  

# Business Logic
    1. To create user/vendor
        a. Creates a user in Auth0 as a part of user/vendor onboarding.
    
   
