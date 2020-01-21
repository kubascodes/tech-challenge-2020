import React, { Component } from 'react';
import PatientDisplay from './components/PatientDisplay';
import PatientForm from './components/PatientForm';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Homepage from './components/Homepage';
import { Route, Link, BrowserRouter } from 'react-router-dom';

class App extends Component {



  state = {
    users: [],
    secret_token: null,
    login: false,
    username: ''
  }
  addPatient = (patient) => {
    console.log(patient);
  }

  updatePatient = (patient) => {
    console.log(patient);
  }

  deletePatient = (patient) => {
    console.log(patient);
  }
  componentDidMount() {
    if (window.sessionStorage.secret_token) {
      this.setState({
        login: true,
        username: 'Doctor Jekyll',
        secret_token: window.sessionStorage.secret_token,
      })
    }
    else {
      this.setState({
        login: false,
        username: null,
        secret_token: null
      })
    }
  }

  auth_token = (data) => {
    this.setState({
      secret_token: data
    });
    console.log(this.state);
    console.log("main state");
  }

  //RENDER CODE
  //OLD <Route path='/login' component={LoginForm} />
  //NEW PASSING AUTH
  //<Route path='/login'render={(props) => <LoginForm {...props} auth={this.auth} />} />

  render() {
    return (
          <div>
          <BrowserRouter>
          <NavBar state={this.state}/>
          <div class="container-fluid mt-4 mb-4">
          <Route path='/signup'render={(props) => <SignupForm {...props} auth_token={this.secret_token} />} />
          <Route path='/login'render={(props) => <LoginForm {...props} auth_token={this.auth_token} />} />
          <Route path='/import'render={(props) => <PatientForm {...props} secret_token={this.state.secret_token} addPatient={this.addPatient} />} />
          <Route path='/display'render={(props) => <PatientDisplay {...props} secret_token={this.state.secret_token} deletePatient={this.deletePatient} updatePatient={this.updatePatient}/>} />
          <Route exact path='/'render={(props) => <Homepage {...props} state={this.state} auth_token={this.auth_token} secret_token={this.state.secret_token} />} />
          </div>
          </BrowserRouter>
          </div>



    );
  }
}

export default App;
