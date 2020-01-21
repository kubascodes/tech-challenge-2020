import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: null,
      password: null,
      token: null,
      first_name: null,
      last_name: null,
      position: null,
      department: null,
      role: 'user'
    };
  }
  onChange = (event) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);

  }

  userSignup = (event) => {
    event.preventDefault();
    if (!this.state.email || !this.state.password) return;
    /*
    fetch('/login', { email: 'test@test.com', password: 'testing' }) //create a get request which is a Promise
    .then(function(data){
      console.log(data)
    }).catch(err => console.log(err))
    */

    var component_scope = this;
    var secret_token = window.sessionStorage.secret_token;
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + secret_token
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        position: this.state.position,
        department: this.state.department,
        //role: this.state.role
      }),
    }) //create a get request which is a Promise
    .then(res => res.json(res))
    .then(function(res){
      console.log(res);
      document.getElementById("SignupForm").reset();
      component_scope.setState({
        password: null,
        email: null,
        first_name: null,
        last_name: null,
        position: null,
        department: null,
        //role: null
      });
    })
    .catch(err => alert(err));
  }

  dataToParent (data) {
    console.log(data);
    this.props.auth(data);
  }

/*
  handleLoginClick = (event) => {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick = (event) => {
    this.setState({isLoggedIn: false});
  }

  LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

   LogoutButton(props) {
    return (
      <button onClick={props.onClick}>
        Logout
      </button>
    );
  }
*/
  render() {
    /*
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <this.LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <this.LoginButton onClick={this.handleLoginClick} />;
    }


    */
    if (window.sessionStorage.secret_token != null) {

    return (


      <div class="container" className="SignupForm">

      <form class="form-group" id="SignupForm" onSubmit={this.userSignup}>

      <div class="form-group">
        <label for="rating">Email</label>
        <input type="email" class="form-control" id="email" name="email" onChange={this.onChange} placeholder="Required" value={this.email}/>
      </div>

      <div class="form-group">
        <label for="rating">Password</label>
        <input type="password" class="form-control" id="password" name="password" onChange={this.onChange} placeholder="Required" value={this.password}/>
      </div>

      <div class="form-group">
        <label for="first_name">First name</label>
        <input type="text" class="form-control" id="first_name" name="first_name" onChange={this.onChange} value={this.first_name}/>
      </div>

      <div class="form-group">
        <label for="last_name">Last name</label>
        <input type="text" class="form-control" id="last_name" name="last_name" onChange={this.onChange} value={this.last_name}/>
      </div>

      <div class="form-group">
        <label for="position">Position</label>
        <input type="text" class="form-control" id="position" name="position" onChange={this.onChange} value={this.position}/>
      </div>

      <div class="form-group">
        <label for="department">Department</label>
        <input type="text" class="form-control" id="department" name="department" onChange={this.onChange} value={this.department}/>
      </div>

      <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">Role</label>
      </div>
      <select class="custom-select" id="inputGroupSelect01">
        <option value="user" selected>User</option>
        <option value="admin">Admin</option>
      </select>
      </div>

      <div class="form-group col-sm-12 center">
        <input type="submit" class="btn btn-outline-primary" value="Submit"/>
      </div>
    </form>
    </div>
    )

  }
  else {
    return(
      <LoginForm />
    )
  }

  }

}

export default SignupForm
