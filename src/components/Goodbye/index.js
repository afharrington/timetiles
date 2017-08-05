import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { unauthorizeUser } from '../../actions';
import { connect } from "react-redux";

import "./style.scss";

class Goodbye extends Component {

  componentWillMount() {
    this.props.unauthorizeUser();
  }

  render() {
    return (
      <div className="goodbye">
        Goodbye! See you next time.
      </div>
    )
  }
}

export default connect(null, { unauthorizeUser })(Goodbye);
