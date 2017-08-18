import React from 'react';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { updateEntry, fetchEntries } from "../../../../actions";
import FontAwesome from "react-fontawesome";

import "./style.scss";

class EntryEditForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      initialData: {
        content: this.props.content,
        comments: this.props.comments,
        hours: this.props.hours,
        minutes: this.props.minutes
      }
    }
  }

  componentDidMount(){
    this.props.initialize(this.state.initialData);
  }

  // Renders the text field configured in the main render() function
  renderTextField(field) {
    return (
      <div className="field-container text-box-edit">
        {field.meta.touched ? field.meta.error : ""}
        <textarea
          className={field.styleclass}
          type="text"
          {...field.input}
        />
      </div>
    );
  }

  // Renders the numeric fields configured in the main render() function
  renderNumbersField(field) {
    return (
      <div className="edit-numbers-container">
        <input
          className={field.styleclass}
          type="number"
          min={field.min}
          max={field.max}
          {...field.input}
        />
        <label>{field.label}</label>
      </div>
    )
  }

  // Converts time inputs to minutes and dispatches createEntry action creator
  // with form values, then exits the form and re-fetches entries for the tile
  onSubmit(values) {

    if (!values.minutes) {
      values.minutes = 0;
    }
    let hoursInMinutes = values.hours * 60;

    let formattedValues = {
      content: values.content,
      comments: values.comments,
      minutes: Number(values.minutes) + Number(hoursInMinutes)
    };
    // dispatch createEntry then call onExit function to exit form
    this.props.updateEntry(formattedValues, this.props.tileId, this.props.entryId, () => {
      this.props.fetchEntries(this.props.tileId);
      this.props.onExit();
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="entry-edit-form">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Activity"
            name="content"
            styleclass="activity-edit"
            component={this.renderTextField}
          />
          <Field
            label="Comments"
            name="comments"
            styleclass="comments-edit"
            component={this.renderTextField}
          />
          <Field
            label="Hrs"
            name="hours"
            styleclass="hours-edit"
            component={this.renderNumbersField}
            min="0"
            max="99"
          />
          <Field
            label="Min"
            name="minutes"
            styleclass="min-edit"
            component={this.renderNumbersField}
            min="0"
            max="59"
          />
          <div className="button-container">
            <button className="submit-button" type="submit">SAVE CHANGES</button>
          </div>
        </form>
        <div className="cancel" onClick={this.props.onExit}><FontAwesome className="cancel-icon" name='times-circle'/></div>
      </div>
    );
  }
}

function validate(values) {
    const errors = {};
    if (!values.content) {
      errors.content = "Enter an activity";
    }
    return errors;
}


export default reduxForm({
  validate
})(
  connect(null, { updateEntry, fetchEntries })(EntryEditForm)
);
