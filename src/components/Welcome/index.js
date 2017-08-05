import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import "./style.scss";

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <div className="brand">
          <img className="logo" src="../../../img/Logo.png" alt="logo"/>
          <h1>TimeTiles</h1>
        </div>
        <div className="tagline">Track the time you spend toward your goals</div>
        <Link to="/signup"><div className="signup-link">Sign up</div></Link>
      </div>
    )
  }
}

export default Welcome;
