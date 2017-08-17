import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import "./style.scss";

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <div className="welcome-text">
          <h1>TimeTiles</h1>
          <p>Track the time you spend toward your goals</p>
        </div>
        <div className="signup-link-container">
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    )
  }
}

export default Welcome;
