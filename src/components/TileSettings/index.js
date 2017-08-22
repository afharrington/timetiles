import React from 'react';
import { connect, compose } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import FontAwesome from "react-fontawesome";
import './style.scss';

class TileSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialData: {
        modeValue: "continuous",
        hours: 1,
        days: 2,
        "goal-hours": 5
      }
    }
  }

  componentDidMount() {
    this.props.initialize(this.state.initialData);
  }

  renderGoalSettings() {
    return (
      <div className="goal-settings">
        <div className="setting-item">
          <label>Log</label>
          <Field
            name="goal-hours"
            id="goal-hours"
            component="input"
            type="number"
            min="1"
            max="99"
          />
          <label>hours of activity for each</label>
        </div>
        <div className="setting-item">
          <Field name="cycle" component="select" className="cycle-menu">
            <option value="7">7-Day</option>
            <option value="14">14-Day</option>
            <option value="30">30-Day</option>
          </Field>
          <label>cycle</label>
        </div>
      </div>
    )
  }

  renderContinuousSettings() {
    return (
      <div className="continuous-settings">
        <div className="setting-item">
          <label>Boost color for every</label>
          <Field name="hours" component="select" className="hours-menu">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </Field>
          <label>hours logged</label>
        </div>
        <div className="setting-item">
          <label>Fade color for every</label>
          <Field name="days" component="select" className="days-menu">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </Field>
          <label>days since last activity</label>
        </div>
      </div>
    )
  }

  render() {
    const { modeValue, handleSubmit, pristine, reset, submitting } = this.props;
    let settings;
    if (modeValue == "goal") {
      settings = this.renderGoalSettings();
    } else {
      settings = this.renderContinuousSettings();
    }

    return (
      <div className="tile-settings">
        <h1>Settings</h1>
        <div className="tile-settings-exit" onClick={this.props.onClick}><FontAwesome name='times-circle'/></div>
        <form onSubmit={handleSubmit}>
          <div>
            <Field name="mode" component="select" className="mode-menu">
              <option value="continuous">Continuous (default)</option>
              <option value="goal">Goal</option>
            </Field>
          </div>
          {settings}
          <div>
            <button type="submit" disabled={pristine || submitting} className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

TileSettings = reduxForm({
  form: 'tileSettings'
})(TileSettings)

const selector = formValueSelector('tileSettings') // <-- same as form name
TileSettings = connect(
  state => {
    const modeValue = selector(state, 'mode')
    return {
      modeValue
    }
  }
)(TileSettings);


export default TileSettings;
