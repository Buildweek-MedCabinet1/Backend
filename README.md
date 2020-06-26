# Backend

///////////////////////*********************TEST SERVER INFO*******************///////////////////////////

https://medcab-backend-test.herokuapp.com/api 

is the base 

https://medcab-backend-test.herokuapp.com/api/patients

responds to get requests, as a whole, and by individual id
ie: https://medcab-backend-test.herokuapp.com/api/patients1

https://medcab-backend-test.herokuapp.com/api/strains

responds to get requests, as a whole and by individual id
ie: https://medcab-backend-test.herokuapp.com/api/strains2


https://medcab-backend-test.herokuapp.com/api/auth/register

responds to post requests to register a user with username and password
(this should be a json object {"username":"Pete","password":"1234"})

https://medcab-backend-test.herokuapp.com/api/auth/login

responds to post requests to log in after registering
(this should be a json object {"username":"Pete","password":"1234"} )

https://medcab-backend-test.herokuapp.com/api/auth/users

will respond to a get request ONLY after the user is logged in


///****************//////MASSIVE UPDATE, END USER/////////**********/////////////

FIRST POINT OF CONTACT

https://medcab-backend-test.herokuapp.com/api/auth/register

POST REQUEST

**This will add a user to the database of users**

--Acceptable Format--

username: "username",
password: "password"


https://medcab-backend-test.herokuapp.com/api/auth/login

POST REQUEST

**This will run against the authentication server if provided with correct
credentials, you will receive a jsonwebtoken, this is your auth key**

--Acceptable Format--

username:"username",
password:"password"

USER MANAGEMENT

GET REQUESTS

https://medcab-backend-test.herokuapp.com/api/auth/users/

**Returns all users**

https://medcab-backend-test.herokuapp.com/api/auth/users/id

**Returns user by ID**

PUT REQUESTS

https://medcab-backend-test.herokuapp.com/api/auth/users/id

**Updates a username and/or Password**

--Acceptable Format--

username:"username",
password:"password"

DELETE REQUESTS

https://medcab-backend-test.herokuapp.com/api/auth/users/id

**Removes a user from the database**

FAVORITE MANAGEMENT

GET REQUESTS

https://medcab-backend-test.herokuapp.com/api/auth/users/id/favorites

**Gets the favorites for that user**

POST REQUESTS

https://medcab-backend-test.herokuapp.com/api/auth/users/id/favorites

**Adds a favorite for that user**

--Acceptable Format--

strain:"strain name",
db_id: integer,
user_id: integer

DELETE REQUESTS

https://medcab-backend-test.herokuapp.com/api/auth/users/id/favorites

**WARNING: YOU MUST INCLUDE IN THE REQUEST THE ID OF THE FAVORITE FOR THE USER TO BE DELETED**

--Acceptable Format--

deleter:integer

STRAINS MANAGEMENT

GET REQUESTS

https://medcab-backend-test.herokuapp.com/api/auth/strains

This only responds to get requests right now, note that this is hooked up to a large API currently,
and may take a little longer than normal to respond






