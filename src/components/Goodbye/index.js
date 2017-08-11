import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { unauthorizeUser } from '../../actions';
import { connect } from "react-redux";

import "./style.scss";

class Goodbye extends Component {

  componentDidMount() {
    this.props.unauthorizeUser();
  }

  render() {
    return (
      <div className="goodbye">
        Goodbye, {this.props.name}! See you next time.
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    name: state.auth.name
  };
}

export default connect(mapStateToProps, { unauthorizeUser })(Goodbye);
