import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { signupUser } from '../../actions';

import "./style.scss";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false }
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
    this.props.signupUser(values, () => {
      this.setState({ redirect: true });
    })
  }

  render() {
    const { handleSubmit } = this.props;
    if (this.state.redirect) {
      return ( <Redirect to="/app"/> );
    }

    return (
      <div className="signup">
        <div className="create-account-message">Create an account</div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Email"
            name="email"
            placeholder="Enter your email"
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
          <Field
            label="Confirm password"
            name="confirm"
            placeholder="Confirm password"
            styleclass="confirm"
            component={this.renderField}
            type="password"
          />
          <button className="signup-button" type="submit">Sign up</button>
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
    if (!values.confirm) {
      errors.confirm = "Type password again to confirm";
    }
    if ((values.password && values.confirm) && (values.password !== values.confirm)) {
      errors.confirm = "Passwords do not match";
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
  form: "SignupForm"
})(
  connect(mapStateToProps, { signupUser })(Signup)
);
