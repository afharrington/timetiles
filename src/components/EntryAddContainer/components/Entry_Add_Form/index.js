// EntryAddForm uses redux-form to manage form state in Redux
import React from 'react';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createEntry, fetchEntries } from "../../../../actions";
import FontAwesome from "react-fontawesome";
import moment from 'moment';
import "../../../../styles/main.scss";
import "./style.scss";

class EntryAddForm extends React.Component {
  constructor(props) {
    super(props);

    const date = moment().format();

    // initialData date is formatted for datetime-local input
    // Save offset for onSubmit method
    this.state = {
      isodate: date,
      offset: date.slice(19, 27),
      initialData: {
        date: date.slice(0,-9)
      }
    }
  }

  componentDidMount() {
    this.props.initialize(this.state.initialData);
  }

  // Renders the text field configured in the main render() function
  renderTextField(field) {
    return (
      <div className="field-container text-box">
        {field.meta.touched ? field.meta.error : ""}
        <textarea
          className={field.styleclass}
          type="text"
          placeholder={field.placeholder}
          {...field.input}
        />
      </div>
    );
  }

  // Renders the numeric fields configured in the main render() function
  renderNumbersField(field) {
    return (
      <div className="field-container">
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

  renderDateField(field) {
    return (
      <div className="date-container">
        <input
          className={field.styleclass}
          type="datetime-local"
          {...field.input}
        />
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

    const dateWithOffset = values.date + this.state.offset;

    let formattedValues = {
      date: dateWithOffset,
      content: values.content,
      comments: values.comments,
      minutes: Number(values.minutes) + Number(hoursInMinutes)
    };
    // dispatch createEntry then call onExit function to exit form
    this.props.createEntry(formattedValues, this.props.tileId, () => {
      this.props.onExit();
      this.props.fetchEntries(this.props.tileId);
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="entry-add-form">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Date"
            name="date"
            styleclass="entry-date"
            component={this.renderDateField}
          />
          <Field
            label="Activity"
            name="content"
            placeholder="Activity"
            styleclass="activity"
            component={this.renderTextField}
          />
          <Field
            label="Comments"
            name="comments"
            placeholder="Comments (optional)"
            styleclass="comments"
            component={this.renderTextField}
          />
          <Field
            label="Hrs"
            name="hours"
            styleclass="hours"
            component={this.renderNumbersField}
            min="0"
            max="99"
          />
          <Field
            label="Min"
            name="minutes"
            styleclass="min"
            component={this.renderNumbersField}
            min="0"
            max="59"
          />
          <div className="button-container">
            <button className="submit-button" type="submit">SAVE</button>
          </div>
        </form>
        <div onClick={this.props.onExit}><FontAwesome className="cancel-icon" name='times-circle'/></div>
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
  validate,
  form: "EntryAddForm"
})(
  connect(null, { createEntry, fetchEntries })(EntryAddForm)
);
