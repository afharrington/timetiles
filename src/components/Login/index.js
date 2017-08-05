import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { authorizeUser, authError } from '../../actions';

import "./style.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false }
  }

  // If there's an error displayed, remove it before leaving the component
  componentWillUnmount() {
    this.props.authError('');
  }

  renderField(field) {
    return (
      <div>
        <input
          className={field.styleclass}
          type={field.type}
          placeholder={field.placeholder}
          {...field.input}
        />
        <div className="confirm-password-error">
          {field.meta.submitFailed ? field.meta.error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // Will only be called if validated by redux form
    this.props.authorizeUser(values, () => {
      this.setState({ redirect: true });
    })
  }

  render() {
    const { handleSubmit } = this.props;

    if (this.state.redirect) {
      return ( <Redirect to="/app"/> );
    }

    return (
      <div className="login-form">
        <div className="login-message">Sign in to your account</div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Email"
            name="email"
            placeholder="Email"
            styleclass="email-field"
            component={this.renderField}
            type="text"
          />
          <Field
            label="Password"
            name="password"
            placeholder="Password"
            styleclass="password-field"
            component={this.renderField}
            type="password"
          />
          <button className="login-button" type="submit">Log in</button>
        </form>
        <div>{this.props.auth.error}</div>
      </div>
    )
  }
}

function validate(values) {
    const errors = {};
    if (!values.email) {
      errors.email = "Enter your email";
    }
    if (!values.password) {
      errors.password = "Enter a password";
    }
    return errors;
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default reduxForm({
  validate,
  form: "LoginForm"
})(
  connect(mapStateToProps, { authorizeUser, authError })(Login)
);
