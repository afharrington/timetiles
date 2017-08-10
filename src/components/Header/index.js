import React, { Component } from 'react';
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import { unauthorizeUser } from '../../actions';
import { connect } from "react-redux";

import EntriesView from '../../views/EntriesView';
import TilesView from '../../views/TilesView';
import Goodbye from '../Goodbye';
import Login from '../Login';
import Signup from '../Signup';

import "./style.scss";

class Header extends Component {

  // If logged in, show a link to the app home (tiles) page and log out
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li key={1}>
          <NavLink to="/app">MyTiles</NavLink>
        </li>,
        <li key={2}>
          <NavLink to="/goodbye">Logout</NavLink>
        </li>
      ];
    // If not logged in, show links to log in or sign up for an account
    } else {
      return [
        <li key={1}>
          <NavLink to="/">TimeTiles</NavLink>
        </li>,
        <li key={2}>
          <NavLink to="/login">Log in</NavLink>
        </li>,
        <li className="nav-item" key={3}>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      ];
    }
  }

  logout() {
    this.props.unauthorizeUser();
  }

  render() {
    return (
      <div className="nav">
        <div className="header-text">
          {this.renderLinks()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, { unauthorizeUser })(Header);
