const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router(); //the router object

//reference Patient so that we can use it
const Patient = require('../models/patients');
//reference UserData so that we can use it
const UserData = require('../models/users');

//routes attached to the above router object

//GET A LIST OF PATIENTS FROM THE DATABASE
router.get("/patients", passport.authenticate('jwt', { session : false, failureRedirect: '/login' }), function(req, res, next) {
  //return one patient
  var query = {};
  if (req.query.first_name) {
    query.first_name = req.query.first_name;
  }
  if (req.query.last_name) {
    query.last_name = req.query.last_name;
  }
  //if (req.query) {
    Patient.find(query).then(function (patient){
      res.send(patient);
    }).catch(next);
});

//ADD A NEW PATIENT TO THE DATABASE
//next passes the argument to the next piece of middleware
router.post("/patients", passport.authenticate('jwt', { session : false, failureRedirect: '/login' }), function(req, res, next) {

  //we need to use a promise to wait for this to complete
  async function update (req) {
    //search for users
     var user = await UserData.findOne( {_id: req.user._id} )

     if (!user) {
       return
     }
     else {
       console.log(req.body.notes.user)
       req.body.notes.user = user.first_name + " " + user.last_name;
       console.log(req.body.notes.user)
       Patient.create(req.body).then(function(patient){ //patient is the data saved to db
         res.send(patient);
       }).catch(next);

     }
  }
  update(req);

});

//UPDATE A PATIENT IN THE DATABASE
router.put("/patients/:id", passport.authenticate('jwt', { session : false, failureRedirect: '/login' }), function(req, res, next) {





  async function update (req) {
    //search for users
     var user = await UserData.findOne( {_id: req.user._id} )

     if (!user) {
       return
     }
     //push new note to the notes array in patients object
     else if (req.body.new_note != '') {
         var note = {
           body: req.body.new_note,
           user: user.first_name + " " + user.last_name
         }
       Patient.findByIdAndUpdate({ _id: req.params.id}, {$push: { notes: note } })
       .then(function (){
         Patient.findOne({_id: req.params.id}).then(function (patient){
          res.send(patient);
         })
       }).catch(next);
     }
     //otherwise push
     else {
       Patient.findByIdAndUpdate({ _id: req.params.id}, req.body).then(function (){
         Patient.findOne({_id: req.params.id}).then(function(patient){ //get the updated patient record
           res.send(patient);
         })
       }).catch(next);
     }

  }
  update (req);

});

//DELETE A PATIENT FROM THE DATABASE
router.delete("/patients/:id", passport.authenticate('jwt', { session : false, failureRedirect: '/login' }), function(req, res, next) {
  Patient.findByIdAndRemove({_id: req.params.id}).then(function (patient) { //then function sends back the old data object
    res.send(patient);
  }).catch(next);
});

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post('/signup', passport.authenticate('jwt', { session : false, failureRedirect: '/login' }), function(req, res, next) {
  async function update (req) {
    //search for users
    console.log(req);
     var user = await UserData.findOne( { _id: req.user._id } );
     console.log(user.role);
     if (user.role === 'admin') {
       UserData.create(req.body).then(function(user){ //patient is the data saved to db
         res.send('Signup successful');
       }).catch(next);
     }
     else {
       return res.json({
         message : 'Signup failed'
       })
     }

   }
   update(req).then(res.send(message));
});

//HANDLE LOGIN AND ISSUING OF JWT TOKEN
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {     try {
      if(err || !user){
        const error = new Error('An Error occured')
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { _id : user._id, email : user.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user : body },'top_secret');
        //Send back the token to the user
        return res.json({ token });
      });     } catch (error) {
      return next(error);
    }
  })(req, res, next);
});


router.get('/profile', passport.authenticate('jwt', { session : false, failureRedirect: '/login' }), (req, res, next) => {
  //We'll just send back the user details and the token
  res.json({
    message : 'You made it to the secure route',
    user : req.user,
    token : req.query.secret_token
  })
});

module.exports = router; //exporting all the routes which are attached to the router object so that we can import it somewhere else
