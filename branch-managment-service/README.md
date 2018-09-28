#Technical Information


# xprs-branches-usermanagement-service 


2. Add Auth0 client ID , Secret , management Api client, managment Api secret [here](https://github.com/umar4sap/xprs-usermanagement-serve/blob/company-serve/config/config.js). 
      
      OR 
  
  You can pass the these value from environment vars.

  > auth0Secret 
  > auth0ClientID
  > auth0ManageSecret
  > auth0ManageClientID

3. db host has intialized with  "localhost" which in xprstrails docker account find the referance here [here](https://github.com/umar4sap/xprs-usermanagement-serve/blob/company-serve/config/config.js). 




# Swagger File to quick look at routes
* [__configured swagger.yml__](https://github.com/umar4sap/xprs-usermanagement-serve/blob/company-serve/api/swagger/swagger.yaml) - Swagger routes and Definitions

# Contributions

* Incase of errors or issues or feature requests report [here](https://github.com/umar4sap/xprs-usermanagement-serve/issues)
* Incase of contributions fork and create a pull request.


# Functional Information:

1.The Auth0 users should need below as the basic structure in his app_metadata to perform tenant managment operation
>{
  "permissions": {
    "companys": [
      {
        "companyName": {
          "branchs": [
            {
              "branch": "headbranch",
              "role": "admin"
            }
          ]
        }
      }
    ]
  }
}




