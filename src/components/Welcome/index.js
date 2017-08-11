import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import "./style.scss";

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <div className="brand">
          <div className="logo-container">
            <img className="logo" src="../../../img/Logo.png" alt="logo"/>
          </div>
          <h1>TimeTiles</h1>
        </div>
        <div className="tagline">
          <p>Track the time you spend toward your goals</p>
        </div>
        <div className="signup-link">
          <Link to="/signup">Sign up
          </Link>
        </div>
      </div>
    )
  }
}

export default Welcome;
