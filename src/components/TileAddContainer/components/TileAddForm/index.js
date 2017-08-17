import React from 'react';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createTile, fetchTiles } from "../../../../actions";

import FontAwesome from "react-fontawesome";

import "./style.scss";

class TileAddForm extends React.Component {
  constructor(props) {
    super(props);
  }

  // This function responsible for actually rendering the field JSX
  renderField(field) {
    return (
      <div className="field-container">
      {field.meta.touched ? field.meta.error : ""}
        <input
          className="text-field"
          type="text"
          {...field.input}
          placeholder="New tile name"
        />
      </div>
    );
  }

  // Takes the userId from state, passes it along with the form values
  onSubmit(values) {
    this.props.createTile(values, () => {
      this.props.onExit();
      this.props.fetchTiles();
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="tile-form-exit" onClick={this.props.onExit}><FontAwesome name='times-circle'/></div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Name"
            name="name"
            component={this.renderField}
            placeholder="Tile name"
          />
          <div className="button-container">
            <button className="submit-button" type="submit">ADD</button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
    const errors = {};
    if (!values.name) {
      errors.name = "Enter a tile name";
    }
    return errors;
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default reduxForm({
  validate,
  form: "TileAddForm"
})(
  connect(mapStateToProps, { createTile, fetchTiles })(TileAddForm)
);
