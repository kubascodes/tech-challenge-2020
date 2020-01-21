# Tech Challenge 2020: Creative Solutions

## Hospital Information System

### What is this app good for?
0. **Solves your problems.** No need to copy-paste, store and access information in different places. Have all relevant information at your fingerprints, with many different export options and great collaboration tools.
1. **User-friendly** and idiot-proof interface, it's easy to use.
2. **Fast** access to data thanks to highly performant and secure data transfers
3. **Lightweight** installation and relatively low system requirements
4. **Use it on any device and any platform** that has a web browser. It's optimized and mobile-first.

### Setting up the app

Steps to set-up the app:

1. run `npm install` in the root folder (install npm for back-end server)
2. navigate to the client folder and run `npm install` (install npm dependencies for front-end server)
3. navigate to the root folder and run `npm start` (starts the back-end server on port 3000)
4. navigate to the client folder and run `npm start` (starts the front-end server on port 3001)
5. a user with admin role has to be created first before any other users can be added to the system (only admin can add or remove users). To do this, remove the `passport.authenticate` from the `POST "/signup"` route

### API Routes

#### APIs secured with JWT tokens (only available to logged in users)
1. `GET "/patients"` to get a list of patients from the database. This route accepts search params for first_name and last_name and sends back a match if there is one.
2. `POST "/patients"` to add a new patient record to the database. The data has to be put in `req.body` in the format defined by the **Data Model**
3. `PUT "/patients/:id"` to update a patient record in the database. The request has to have a valid patient id and the response is the updated patient object according to the **Data Model** in case of success. Otherwise error code is sent.
4. `DELETE "/patients/:id"` to delete a patient record in the database. The request has to have a valid patient id and the response is the deleted patient object according to the **Data Model** in case of success. Otherwise error code is sent. 
5. `POST "/signup"` to signup a new user -> only if admin. Sends a response with *Signup successful* or *Signup failed* message to the client.
6. `GET "/profile"` to view and edit your own profile

#### APIs that authenticate users against the local user account system
1. `POST "/login"` to handle login and issue a JWT token that is sent to the client in the response object.

### Security
0. All requests are handled by the authentication service, which uses local accounts implementation of **Passport.js and JWT tokens**.
1. All the routes secured with JWT tokens ensure that only logged in users with valid **secret token** can access sensitive patient data. Each logged in user is issued a unique secret token, by which he is identified and this token is signed by a secret key. For production, change this secret key. This ensures that sensitive user data such as username and password doesn't have to be transmitted at every requests, thereby protecting user credentials. 
2. All user passwords are hashed using **bcrypt with a salt of 10**. Admins do not have access to other user passwords when they open the database. User related data is securely stored even internally.
3. User accounts are handled by **Passport.js**, which means that during sign-up, the email is compared with existing emails to prevent duplicate records and user-typed password is compared with the hashed password version.
4. Additionally, the **client server adds another security layer to request handling** and by acting as a local router, it is preventing unauthorized requests before they even reach the server
5. Make sure to enable helmet package for production, and set up encrypted data transfers using **HTTPS certificates**. The current security measures are designed for local deployment, further security features would have to be added for deployment on the cloud.

### Architecture
0. We are using the **MVC architecture** and this decoupling between server and client allows for high **scalability and performance** of the app.
1. This software is based on **Node.js** runtime environment to ensure maximum compatibility with user devices, the users only need a web browser that can run javascript to access this app. Node.js is highly performant because of its non-blocking I/O, handling requests and responses asynchronously, and thereby achieving superior performance
2. **React.js** runs on the front-end, to allow for dynamic content loading, to prevent unnecessary data requests and to handle interaction with the user (events, actions, redirects, routing) according to the industry standards.
3. On the back-end, we're using the fast **Express.js** server to handle incoming requests from React.js, but also to allow authorized users to access our API from 3rd party applications. This functionality is possible, but we keep it disabled at the moment as it is subject to data privacy protection laws.
4. Data is stored in **MongoDB** according to schemas available in the models folder. There is a schema for users and patients, specifying the required fields. We connect to MongoDB via the Mongoose driver.

### Data Modelling
1. Data model is available in `/models` folder and schemas are defined for both users and patients. Datatypes are defined to prevent users from inserting malicious code.
2. Data is validated on the client before submission and then again on the server to ensure it is correct.
3. The data sent from the client should be available in the `body` of the request to that it can be read by the `body-parser` package.
4. All data transfers are carried by requests and responses in `JSON` format.

### Dependencies
0. The dependencies used by the app enable various functionality.
1. The app is designed to implement features as microservices.
2. Therefore when you decide to remove a dependency, you might need to remove a feature.
