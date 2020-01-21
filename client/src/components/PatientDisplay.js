import React from 'react';
import moment from 'moment';
import PatientFormEdit from './PatientFormEdit';
import LoginForm from './LoginForm';
import { saveAs } from 'file-saver';
import {JSONToCSV, Parser, parseAsync } from "json2csv";

class PatientDisplay extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        patients: [],
        token: null,
        new_note: null,
      }
    }

    /*
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    */
    componentDidMount() {
      var secret_token = window.sessionStorage.secret_token;
      fetch('/patients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + secret_token
        }
      })
      //fetch('/patients?secret_token='+secret_token) //create a get request which is a Promise
      .then(function(data){
        return data.json();
      }).then( json => { //json = data.json();
        console.log(json);
        this.setState({ //we update the state of the component, when the state changes, the component re-renders
          patients: json
        })
      })
    }

    getInitialState() {
      return({
        patients: []
      })
    }

    //const { first_name, last_name, date_of_birth, address, emergency_contact, allergies, current_medication, notes, id } = this.props;
    handleSubmit = (event) => {
      event.preventDefault();
      var secret_token = window.sessionStorage.secret_token;
      var patient = this.refs.first_name.value; //this refers to this component

      fetch('/patients/?first_name='+patient, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + secret_token
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      })
      .then(function(data){
        return data.json();
      }).then( json => { //json = data.json();
        this.setState({ //we update the state of the component, when the state changes, the component re-renders
          patients: json
        })
      })
    }

    //this is handling the search function -> would need to add a delay to prevent too many calls to server
    handleChange = (event) => {
      event.preventDefault();
        var secret_token = window.sessionStorage.secret_token;
        var patient = this.refs.first_name.value; //this refers to this component
        fetch('/patients/?first_name='+patient, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + secret_token
          }
        }).then(function(data){
            return data.json();
          }).then( json => { //json = data.json();
            this.setState({ //we update the state of the component, when the state changes, the component re-renders
              patients: json
            })
          })
    }

    handleDownload = (event) => {
      var id = event.target.id;
      var hidden = document.getElementById("hidden_share"+id).hidden;
      if (hidden == false) {
        document.getElementById("hidden_share"+id).hidden = true;
      }
      else if (hidden == true) {
        document.getElementById("hidden_share"+id).hidden = false;
      }
    }

    handleDownloadWord = (event) => {
      var id = event.target.id;
      let patient = this.state.patients.filter(patient => {
        return patient._id == id
      });
      patient = patient[0];

      //console.log(patient);
      //var json = JSON.stringify(patient);
      //console.log(patient);
      //var document = "<html xmlns:office='urn:schemas-microsoft-com:office:office' xmlns:word='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>" + "<head>" "<xml>" + "<word:WordDocument>" + "<word:View>Print</word:View>" + "<word:Zoom>90</word:Zoom>" + "<word:DoNotOptimizeForBrowser/>" + "</word:WordDocument>" + "</xml>" + "</head>" + "<body>" + "<h1 style='text-align:center'>Beispiel</h1>" + "</body>" + "</html>";
      var word = "<html xmlns:office='urn:schemas-microsoft-com:office:office' xmlns:word='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>" + "<head><xml><word:WordDocument><word:View>Print</word:View><word:DoNotOptimizeForBrowser/></word:WordDocument></xml></head>" + "<body>" +
      "<h1 style='text-align:center'>" + "Beispiel" + "</h1>" + "<h3>" + "ARZTBRIEF" + "</h3>" + "<p>" + patient.first_name + ", " + patient.last_name + ", " + moment(patient.date_of_birth).format('D.MM.YYYY') + ", " + patient.address + "</p>" +
      "<p>Sehr geehrte Frau Kollegin, sehr geehrter Herr Kollege,</p></p>ich berichte Ihnen über " + patient.first_name + " " + patient.last_name + ", der sich heute in meiner Sprechstunde vorstellte.</p><br>" +
      "<h3>Diagnose:</h3><br>" + "<h3>Anamese:</h3><br>" + "<h3>Körperlicher Untersuchungsbefund:</h3><br>" +
      "<h3>Kritische Bewertung und Procedere:</h3><br>" +
      "<p>" + patient.first_name + " " + patient.last_name + "</p><br>" +
      "<p>Mit freundlichen kollegialen Grüßen</p>" + "<br>" + "<p style='text-align:left';>Arbeitsbereich</p>" + "<p style=text-align:right'>Stand: " + moment().format('D.MM.YYYY') + "</p>" +
       "</body>" +  "</html>";
      //console.log(word);
      //console.log(<WordTemplate />)
      var blob = new Blob([word], {type: "text/plain;charset=utf-8"});
      saveAs(blob, patient.last_name + "_export.doc");
    }

    handleDownloadJSON = (event) => {
      var id = event.target.id;
      let patient = this.state.patients.filter(patient => {
        return patient._id == id
      });
      patient = patient[0];
      var json = JSON.stringify(patient);
      var blob = new Blob([json], {type: "text/plain;charset=utf-8"});
      saveAs(blob, patient.last_name + "_export.json");
    }

    handleDownloadExcel = (event) => {
      var id = event.target.id;
      let patient = this.state.patients.filter(patient => {
        return patient._id == id
      });
      patient = patient[0];
      var json = JSON.stringify(patient);

      const fields = ["first_name", "last_name", "date_of_birth", "address", "weight", "height", "gender", "allergies", "current_medication", "pre_existing_conditions", "contact_email", "contact_phone", "contact_emergency", "contact_gp", "notes"];
      const opts = { fields };

      parseAsync(json, opts)
      .then(csv => {
        var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
        saveAs(blob, patient.last_name + "_export.csv");
      })
      .catch(err => console.error(err));
    }
    /*
    IMPLEMENTATION NEEDED
    handleDownloadXML = (event) => {
      var id = event.target.id;
      let patient = this.state.patients.filter(patient => {
        return patient._id == id
      });
      patient = patient[0];
      var xml = JSON.stringify(patient);
      var blob = new Blob([xml], {type: "text/plain;charset=utf-8"});
      saveAs(blob, patient.last_name + "_export.xml");
    }
    */

    handleDelete = (event) => {
      var secret_token = window.sessionStorage.secret_token;
      event.preventDefault();
      if (window.confirm('Are you sure you wish to delete this item?')) {
        var id = event.target.id;
        fetch('/patients/'+event.target.id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + secret_token
          }
        })
          .then((res) => {
            var deleted_object = res.json();
            //console.log(deleted_object);
            //loop through current array and remove the deleted patient from the state
            let patients = this.state.patients.filter(patient => {
              return patient._id !== id
            });
            this.setState({patients: patients})
            //console.log(this.state.patients);
          })
          .catch(err => console.log(err));
      }
      //this.props.deletePatient(object) if we wanted to pass the object to parent for handling
    }

    storeNewValues = (event) => {
          this.setState({ [event.target.name]: event.target.value });
          console.log(this.state);
    }

    handleNewNote = (event) => {
      var secret_token = window.sessionStorage.secret_token;
      var id = event.target.id;
      event.preventDefault();
        console.log(event.target.id);
        fetch('/patients/'+event.target.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + secret_token
          },
          body: JSON.stringify({
            new_note: this.state.new_note,
          }),
        })
          .then((res) => {
            var response = res.json();
            return response
          })
          .then((response) => {
            let otherPatients = this.state.patients.filter(patient => {
              return patient._id !== id
            });
            let updatedPatients = [...otherPatients, response];
            //console.log(updatedPatients);
            this.setState({patients: updatedPatients});

          })
          .catch(err => console.log(err));
    }

    render () {

    if (window.sessionStorage.secret_token != null) {

      const { patients } = this.state;
    const patients_list = patients.map(patient => {
      return (
        <div className="patient" key={patient._id} class="shadow bg-white card mt-4 mb-4">
          <h3 class="card-header">{patient.first_name} {patient.last_name} </h3>
          <div class="card-body">
            <p class=""><strong>Date of birth: </strong>
            { moment(patient.date_of_birth).format('D.MM.YYYY') }
            </p>
            <p class=""><strong>Address:</strong> {patient.address}</p>
            <p class=""><strong>Phone:</strong> {patient.contact_phone}</p>
            <p class=""><strong>Email:</strong> {patient.contact_email}</p>
            <p class=""><strong>Weight:</strong> {patient.weight} kg</p>
            <p class=""><strong>Height:</strong> {patient.height} cm</p>
            <p class=""><strong>Gender:</strong> {patient.gender}</p>
            <p class=""><strong>Allergies:</strong> {patient.allergies.map(allergy => {
              return(<li class="list-group-item">{allergy}</li>)
            })}</p>
            <p class=""><strong>Current Medication:</strong> {patient.current_medication.map(medication => {
              return(<li class="list-group-item">{medication}</li>)
            })}</p>
            <p><strong>Pre-existing conditions:</strong>
            {patient.pre_existing_conditions.map(condition => {
             return(<li class="list-group-item">{condition}</li>)
           })}
            </p>
            <p class=""><strong>Emergency Contact:</strong>
            <li class="list-group-item mt-1"><b>Name: </b>{patient.contact_emergency.name} <b> Phone: </b>{patient.contact_emergency.phone}</li>
            </p>
            <p class=""><strong>General Practitioner Doctor Contact:</strong>
              <li class="list-group-item mt-1"><b>Name: </b>{patient.contact_gp.name} <b> Phone: </b>{patient.contact_gp.phone}</li>
              </p>
            <p class=""><strong>Notes:</strong> {patient.notes.map(note => {
              return (<li class="list-group-item"><b>{moment(note.date).format('D.MM.YYYY')} by {note.user}:</b> {note.body} </li>)
            })}</p>
            <div class="form-group">
          <textarea class="form-control border border-dark" id="notes" name="new_note" rows="3" onChange={this.storeNewValues} value={this.state.new_note} placeholder="Add a new note.."></textarea>
            </div>

            <div class="row justify-content-center">
            <button type="button" class="btn btn-outline-dark btn-md ml-1 mr-1" onClick={this.handleNewNote} id={patient._id} placeholder="Add new note">Add a new note</button>
            <button type="button" class="btn btn-outline-dark btn-md ml-1 mr-1" onClick={this.handleDownload} id={patient._id} placeholder="Share">Share</button>
            <button type="button" class="btn btn-outline-dark btn-md ml-1 mr-1" id={patient._id}>Edit</button>
            <button type="button" class="btn btn-outline-dark btn-md ml-1 mr-1" id={patient._id} onClick={this.handleDelete}>Delete</button>
            </div>

            <div class="row justify-content-center mt-3" id={"hidden_share"+patient._id} hidden="true">
              <button type="button" class="btn btn-outline-danger btn-md ml-1 mr-1" onClick={this.handleDownloadWord} id={patient._id} placeholder="Word">Word</button>
              <button type="button" class="btn btn-outline-danger btn-md ml-1 mr-1" onClick={this.handleDownloadExcel} id={patient._id} placeholder="Excel">Excel</button>
              <button type="button" class="btn btn-outline-danger btn-md ml-1 mr-1" onClick={this.handleDownloadJSON} id={patient._id} placeholder="JSON">JSON</button>
            </div>

          </div>
        </div>
      );
    })
    return(
      <div className="patientList" class="container">

      <form id="search" class="shadow-sm" onChange={this.handleChange} onSubmit={this.handleSubmit}>
      <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search for patient" aria-label="Search for patient" ref="first_name" aria-describedby="button-addon2"/>
      <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
      </div>
      </div>
      </form>
        { patients_list }
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

export default PatientDisplay;
