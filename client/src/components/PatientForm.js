import React from 'react';
import LoginForm from './LoginForm';

class PatientForm extends React.Component {

  state = {
    patients: []
  }

  handleSubmit = (event) => {
    event.preventDefault();

    console.log('Form submitted!');
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const date_of_birth = document.getElementById('date_of_birth').value;
    const address = document.getElementById('address').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    var gender;
    if (document.querySelector('input[name="gender"]:checked')){
      var gender = document.querySelector('input[name="gender"]:checked').value
    }
    else {
      var gender = '';
    }
    //const gender = document.getElementById('gender').checked.value;
    const allergies = document.getElementById('allergies').value;
    const current_medication = document.getElementById('current_medication').value;
    const pre_existing_conditions = document.getElementById('pre_existing_conditions').value;
    const contact_email = document.getElementById('contact_email').value;
    const contact_phone = document.getElementById('contact_phone').value;
    const contact_emergency_name = document.getElementById('contact_emergency_name').value;
    const contact_emergency_phone = document.getElementById('contact_emergency_phone').value;
    const contact_gp_name = document.getElementById('contact_gp_name').value;
    const contact_gp_phone = document.getElementById('contact_gp_phone').value;
    const notes = document.getElementById('notes').value;
    const data = {
      first_name: first_name,
      last_name: last_name,
      date_of_birth: date_of_birth,
      address: address,
      weight: weight,
      height: height,
      gender: gender,
      allergies: allergies,
      current_medication: current_medication,
      pre_existing_conditions: pre_existing_conditions,
      contact_email: contact_email,
      contact_phone: contact_phone,
      contact_emergency: {
        name: contact_emergency_name,
        phone: contact_emergency_phone
      },
      contact_gp: {
        name: contact_gp_name,
        phone: contact_gp_phone
      },
      notes: {
        body: notes,
        date: Date.now,
        user: null
      }
    };
    console.log(data);
    var secret_token = window.sessionStorage.secret_token;
    fetch('/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + secret_token
      },
      body: JSON.stringify(data),
    }) //create a get request which is a Promise
    .then(res => res.json(res))
    .then(function(){
      alert("Data uploaded!");
      document.getElementById("patientForm").reset();
    })
    .catch(err => alert(err));
  }

  render () {
  if (window.sessionStorage.secret_token != null) {

    return (
      <div class="container" className="patientForm" onSubmit={this.handleSubmit}>
      <form class="form-group shadow p-4 mb-4 bg-white" id="patientForm">

      <div class="form-group">
        <label for="title">First name</label>
        <input type="text" class="form-control border-danger" id="first_name" name="first_name" placeholder="Required"/>
      </div>

      <div class="form-group">
        <label for="author">Last name</label>
        <input type="text" class="form-control border-danger" id="last_name" name="last_name" placeholder="Required"/>
      </div>

      <div class="form-group">
        <label for="releaseDate">Date of birth</label>
        <input type="date" class="form-control border-danger" id="date_of_birth" name="date_of_birth"/>
      </div>

      <div class="form-group">
        <label for="releaseDate">Address</label>
        <input type="text" class="form-control" id="address" name="address"/>
      </div>

      <div class="form-group">
        <label for="releaseDate">Weight</label>
        <input type="text" class="form-control" id="weight" name="weight" placeholder="in kilograms"/>
      </div>

      <div class="form-group">
        <label for="releaseDate">Height</label>
        <input type="text" class="form-control" id="height" name="height" placeholder="in centimeters"/>
      </div>

      <div class="form-group form-check-inline">
        <label class="form-check-inline" for="releaseDate">Gender</label>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="gender" id="gender_male" value="Male"/>
        <label class="form-check-label" for="inlineRadio1">Male</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="gender" id="gender_female" value="Female"/>
        <label class="form-check-label" for="inlineRadio2">Female</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="gender" id="gender_other" value="Other"/>
        <label class="form-check-label" for="inlineRadio3">Other</label>
      </div>
      </div>

      <div class="form-group">
        <label for="releaseDate">Allergies</label>
        <input type="text" class="form-control" id="allergies" name="allergies"/>
      </div>

      <div class="form-group">
        <label for="rating">Current Medication</label>
        <input type="text" class="form-control" id="current_medication" name="current_medication"/>
      </div>

      <div class="form-group">
        <label for="rating">Pre-existing conditions</label>
        <input type="text" class="form-control" id="pre_existing_conditions" name="pre_existing_conditions"/>
      </div>

      <div class="form-group">
        <label for="rating">Email</label>
        <input type="email" class="form-control" id="contact_email" name="contact_email"/>
      </div>

      <div class="form-group">
        <label for="rating">Phone</label>
        <input type="text" class="form-control" id="contact_phone" name="contact_phone"/>
      </div>

      <div class="form-group">
        <label for="language">Emergency Contact</label>
        <div class="form-row">
            <div class="col">
              <input type="text" class="form-control" id="contact_emergency_name" placeholder="Name"/>
            </div>
            <div class="col">
              <input type="text" class="form-control" id="contact_emergency_phone" placeholder="Phone"/>
            </div>
          </div>
      </div>

      <div class="form-group">
        <label for="language">General Practitioner Doctor Contact</label>
        <div class="form-row">
            <div class="col">
              <input type="text" class="form-control" id="contact_gp_name" placeholder="Name"/>
            </div>
            <div class="col">
              <input type="text" class="form-control" id="contact_gp_phone" placeholder="Phone"/>
            </div>
          </div>
      </div>

      <div class="form-group">
    <label for="notes">Notes</label>
    <textarea class="form-control" id="notes" name="notes" rows="3"></textarea>
      </div>

      <div class="form-group col-sm-12 center">
        <input type="submit" class="btn btn-outline-primary" value="Submit"/>
      </div>
    </form>
    </div>
    )
  }
  else {
    return (
      <LoginForm />
    )
  }
}


}

export default PatientForm
