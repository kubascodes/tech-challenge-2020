const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//NOTES SCHEMA TO FEED IN PATIENT SCHEMA
const NotesSchema = new Schema({
      body: String,
      date: { type: Date, default: Date.now },
      user: String
});

//CREATE PATIENT SCHEMA AND MODEL
 const PatientSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'You forgot the first name']
  },
  last_name: {
    type: String,
    required: [true, 'You forgot the last name']
  },
  date_of_birth: {
    type: Date, //date of birth as a valid date
    required: [true, 'You forgot the date of birth']
  },
  address: String,
  weight: Number, //in kilograms
  height: Number, //in centimeters
  gender: String, //male, female, other
  allergies: [String], //array of strings
  current_medication: [String], //array of current medication
  pre_existing_conditions: [String], //array of pre-existing conditions
  contact_email: String, // email of the patient
  contact_phone: String, //phone of the patient
  contact_emergency: {
   name: String, //emergency contact's name
   phone: String //emergency contact's phone
   },
  contact_gp: {
   name: String, //general practitioning doctor's name
   phone: String //general practitioning doctor's phone
   },
  notes: [NotesSchema] //notes from different doctors (note, time, doctor id) store in an array of objects,
   });



//WE CREATE A MODEL -> mongoose pluralises the data table patient_data -> patient_datas
 const Patient = mongoose.model('patient', PatientSchema); //Patient objects are saved in the patient database

//EXPORT THE MODEL SO WE CAN ACCESS IT ELSEWHERE
 module.exports = Patient;
