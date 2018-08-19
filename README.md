# fahadpro
Project code name business :).



# architecture:

## Design 1 High level services flow  and integration 
![alt text](https://github.com/umar4sap/fahadpro/blob/master/design2.png)

## Design 2 Onborading of users through signup and login service 
![alt text](https://github.com/umar4sap/fahadpro/blob/master/design1.png)

# API documentation 
- will add this once confirm on current architecture

# Description:

## Signup process:
 Signup form [/post signup service integrated with third part user managment]-> verify through email ->verified eligible for login
 
## login process:
Login with id/pass -> authication -> Ui recievces jwt token which could have information about user/vendor with roles
example
JWt token one time use  
- Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibm
FtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
- example decoded values:{
  "carrierId": "1234567890",
  "name": "John Doe",
  "branch": "Hyderbad",
  role:"manager"
}


## create carrier[vendor]
- Approach 1
- create vendor [vendor service create vendor] -> look for carrier which loads from xloop db -> if found  -> request for approval[verification] to submit details -> approval recived -> can fill data -> request to publish in listing [Listing service /post data to db inreview status]-> once platform [fahad team]
 approved the publish request -> carrier status get update[publish]

- Approach 2
- create vendor [vendor service create vendor] -> add carrier  -> request for approval[verification] to confirm -> approval recived -> can fill data -> request to publish in listing [Listing service /post data to db inreview status] -> once platform [fahad team]
 approved the publish request -> carrier status get update[publish]
 
## Public listing page [listing service /get]
- Get api call which will get all published carriers list summary in card/tiles format with option to expand
[Ui can add filters to view as per end user choices]
- detailed view for carrier 
- contant 
- call
- etc

## analytics service
- Whenever user hit for contact/view details/call/book -> hit backend service to save event[analytic service /post ] -> stored in db
- can add plugin to get view analytics 
- analytics data [/get] can show to vendors dashboard





## Components:
- `Listing
- Could be more 

## Types of Users
- Public User
- Registered public User
- vendor User
- could be more rules in futher releases



## Security: JWT
- Authentication
- Authorization



## As public user
- Able to see  all the business near by and filter operations
- should be able to see detail view of abusiness
- Q.is it mandatory to signup in order to contact to business 
- should be able to signup with user role 

## As regitered public user
- should be able to login with user role 
- should be able to contact to business 
- should be able to see detail view of business
-  He can order/booking things in futher releases[Next release]

## Vendor

- on-boarding Vendors[signup process]

## Signup
- Should be able to signup in order Upload Business data
- look for your business name
- filter by -area business
- Q. is he directly can select the business name from list and start filling information or there could be a review process to make sure he owns that business

 if found

- fill information data about your business 
- pan verification /kyc upload
- Request to publish your business
- wait for verification to be done from platform admin[fahad]---


if not found
- + add your business
- fill information data about your business 
- pan verification /kyc upload
- publish
- wait for verification to be done from platform admin[fahad]----

## Login
- should be able to login as  admin[business/branch level]
- Dashboard for vendor with analytics and data about his business.
- Q.can he able to update business data
- Q.can he able to view data
- Q.can he able to see user data like [phone number and email etc to contact them]





`


