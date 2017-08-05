// Higher order component to make sure user is logged in
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Allows you to pass in another component as an argument
export default function(ComposedComponent) {

  class Authentication extends Component {

    constructor(props) {
      super(props);
      this.state = { redirect: false }
    }

    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.setState({ redirect: true });
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.setState({ redirect: true });
      }
    }

    render() {
      if (this.state.redirect) {
        return ( <Redirect to="/login"/> );
      }
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
