Internship task : 

 Workflow Overview 

1.  User Types : You’re dealing with three types of users:
   -  Buyer : Session expires in  2 days .
   -  Seller : Session expires in  5 days .
   -  Admin : Session expires in  7 days .

2.  Basic Components :
   -  JWT : Used for generating, signing, and verifying tokens.
   -  Middleware : Ensures only authenticated users access certain routes.
   -  Role Management : Some routes may be restricted based on user roles.

 

 Detailed Step-by-Step Workflow 

# 1. Registration (`POST /register`) 

This route is for user signup.  
Here’s how it works:

-  Request : 
  - The user sends their  username ,  password , and  role  (e.g., `Buyer`, `Seller`, or `Admin`) via Postman.
  
-  Backend Logic :
  - Hash the password using  bcrypt  for security.
  - Save the user data in your database (like MongoDB, PostgreSQL, etc.), including their role.

-  Response :
  - Return a success message confirming registration.

 

# 2. Login (`POST /login`) 

This route is for authentication and issuing the JWT.  
Here’s the process:

-  Request :
  - User sends their  username  and  password  via Postman.

-  Backend Logic :
  1. Validate credentials:
     - Check the username and password against the database.
  2. Determine role:
     - Fetch the user's role from the database.
  3. Generate JWT:
     - Create a JWT with the following payload:
        json
       {
         "id": "user_id",
         "role": "Buyer",
         "iat": <timestamp>,
         "exp": <timestamp_based_on_role>
       }
        
     - For the `exp` (expiration) field:
       -  Buyer : Current time + 2 days.
       -  Seller : Current time + 5 days.
       -  Admin : Current time + 7 days.
     - Sign the token with a  secret key  (e.g., `process.env.JWT_SECRET`).

-  Response :
  - Return the JWT to the user in the response body (or as an HTTP-only cookie for better security).

 

# 3. Protected Routes (e.g., `GET /protected-route`) 

This route demonstrates how session management works.  
 Example Route : Only authenticated users can access it.

-  Request :
  - The user includes their JWT in the `Authorization` header:
     
    Authorization: Bearer <JWT_TOKEN>
     

-  Backend Logic  (via Middleware):
  1.  Extract and Validate the Token :
     - Extract the token from the `Authorization` header.
     - Verify the token using your secret key.
     - Decode the token to get the user information (e.g., `role`, `id`).
  2.  Check Expiry :
     - If the token is expired, reject the request with a `401 Unauthorized` error.
  3.  Allow Access :
     - If the token is valid, let the request proceed to the route handler.

-  Response :
  - If valid, return the requested resource.
  - If invalid, return an error message.

 

# 4. Role-Based Access Control (RBAC) 

Some routes should only be accessible to specific roles.

-  Example : 
  - A `GET /admin-dashboard` route should only allow `Admin` users.
  
-  Backend Logic  (via Middleware):
  1. Check the token’s role (`role` field).
  2. If the role doesn’t match the required one (`Admin` in this case), reject the request with a `403 Forbidden` error.
  3. Allow the request to proceed if the role matches.

 

# 5. Token Expiration 

- Each token has an expiration time (`exp` field in JWT).  
- When the token expires:
  - Middleware automatically rejects requests with expired tokens (this is handled by most JWT libraries during token verification).
  - The user will need to log in again to get a new token.

 

# 6. Logout (`POST /logout`) 

Technically, with JWT, logout is  handled on the client side  by deleting the token.  
But if you want to implement server-side logout:

- Store a blacklist of tokens (optional).  
- When a user logs out, add their token to the blacklist.
- Middleware checks every incoming token against the blacklist.

 

 API Endpoints Summary 

|  Route               |  Method    |  Description                                           |
----------------------------------------------------------------------------------------------
|                      |            |                                                        |
| `/register`          | `POST`     | Register a new user (Buyer, Seller, or Admin).         |
| `/login`             | `POST`     | Log in the user and return a JWT.                      |
| `/protected-route`   | `GET`      | A test route; requires a valid JWT to access.          |
| `/admin-dashboard`   | `GET`      | Restricted to Admin users only.                        |
| `/logout` (optional) | `POST`     | Logout and blacklist the current JWT (if implemented). |

 

 Testing with Postman 

Here’s how you can test each endpoint:

1.  Register :
   - URL: `http://localhost:3000/register`
   - Method: `POST`
   - Body (JSON):
      json
     {
       "username": "john_doe",
       "password": "password123",
       "role": "Buyer"
     }
      

2.  Login :
   - URL: `http://localhost:3000/login`
   - Method: `POST`
   - Body (JSON):
      json
     {
       "username": "john_doe",
       "password": "password123"
     }
      
   - Response: Copy the token from the response.

3.  Access Protected Route :
   - URL: `http://localhost:3000/protected-route`
   - Method: `GET`
   - Headers:
      
     Authorization: Bearer <JWT_TOKEN>
      

4.  Access Admin-Only Route :
   - Use an Admin token and test access to an admin-only route.

5.  Logout (Optional) :
   - URL: `http://localhost:3000/logout`
   - Method: `POST`
   - Body: (No specific body needed).

 

 Key Notes 
-  Testing Without Frontend : Postman is sufficient for testing all the backend logic.
-  Session Management :
  - Managed via token expiration (`exp` field).
  - Different roles = Different token lifespans.
-  Middleware :
  - For authentication: Verifies the token.
  - For role-based access: Ensures only specific roles access restricted routes.
