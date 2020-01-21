import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';

const NavBar = ({state}) => {

  const handleLogout = (event) => {
    console.log('clicked logout');
    window.sessionStorage.removeItem('secret_token');
    //this.setState({secret_token: null});
    //this.forceUpdate();
  }

  if (window.sessionStorage.secret_token != null) {
    return (
      <div className="navBar">
      <nav id="navBar" class="navbar navbar-expand navbar-light container-fluid border-black border-bottom shadow-sm bg-white">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav">
          <li class="nav-item nav-link active text-primary"><Link class="font-weight-bolder text-decoration-none" to="/">Home</Link></li>
          <li class="nav-item nav-link text-secondary text-decoration-none"><Link class="font-weight-bolder text-body text-decoration-none" to="/import">New patient</Link></li>
          <li class="nav-item nav-link text-secondary text-decoration-none"><Link class="font-weight-bolder text-body text-decoration-none" to="/display">My patients</Link></li>
        </ul>
        <ul class="navbar-nav navbar-right">
          <li class="nav-item nav-link text-secondary text-primary" onClick={handleLogout}><Link class="font-weight-bolder text-body text-decoration-none" to="/">Logout</Link></li>
        </ul>
      </div>
      </nav>
      </div>
    )
  }

  else {
    return (
      <div className="navBar">
      <nav class="navbar navbar-expand navbar-light container-fluid border-bottom border-black shadow-sm bg-white">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">

        <ul class="navbar-nav">
          <li class="nav-item nav-link active text-primary"><Link class="font-weight-bolder text-decoration-none" to="/">Home</Link></li>
          <li class="nav-item nav-link "><Link class="font-weight-bolder text-body text-decoration-none" to="/about">About</Link></li>
        </ul>

        <ul class="navbar-nav navbar-right">
          <li class="nav-item nav-link text-secondary text-primary"><Link class="font-weight-bolder text-body text-decoration-none" to="/login">Login</Link></li>
        </ul>
      </div>
      </nav>
      </div>
    )
  }


}

export default NavBar
