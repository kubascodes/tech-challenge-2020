import React from 'react';
import LoginForm from './LoginForm';
import PatientDisplay from './PatientDisplay';

const Homepage = ({state}) => {

  if (window.sessionStorage.secret_token != null) {
    return (
      <div class=""  className="img-homepage">
      <PatientDisplay>
      </PatientDisplay>
      </div>
    )
  }
  else {
    return (

      <div class=""  className="img-homepage">
      <LoginForm>
      </LoginForm>
      </div>
    )
  }
}

export default Homepage
