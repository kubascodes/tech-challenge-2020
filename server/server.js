// require express
const express = require('express');
//import the routes file
const routes = require('./routes/api')
//import body parser middleware
const bodyParser = require('body-parser');
//import cors middleware
const cors = require('cors');
//import helmet middleware for PROD
//const helmet = require('helmet');
//import morgan for DEV
//const morgan = require('morgan');
//require mongoose
const mongoose = require('mongoose');
//require passport
const passport = require('passport');
//require authentication
require('./services/auth');


// set up express app
const app = express();
app.use( bodyParser.urlencoded({ extended : false }) );
/*AUTHENTICATION SERVICE*/

//enhancing app security with helmet for PROD
//app.use(helmet());

//enable all CORS requests for DEV
app.use(cors());

//enable morgan for DEV
//app.use(morgan('combined'));

//connect to mongodb
mongoose.connect('mongodb://localhost/hospital'); //mongoose will create the database if it doesn't exist
mongoose.Promise = global.Promise; //because mongoose promise is deprecated -> we override




//serve static files
app.use(express.static('public')); //it's not going to iterate through the other middlewares, but return static files served from the public folder

//use the body parser -> order of middleware is important because routes have access to req.body
app.use(bodyParser.json());//we want to parse json data and attach it to the req

//we want our app to use a middleware
app.use(routes); //use the routes we specified in api file
//app.use('/api',routes); //use the routes with /api in front of normal routes
//app.use('/login', routes );
//app.use('/secret', passport.authenticate('jwt', { session : false }), routes);

//we add error handling middleware next
app.use(function(err, req, res, next) {
  //console.log(err);
  res.status(422).send({error: err.message})
});

// RUN SERVER and listen for requests at a given port -> listen to port set up in the environment or port 3000
app.listen(process.env.port || 3001, function(){
  console.log("now listening for requests");
});
