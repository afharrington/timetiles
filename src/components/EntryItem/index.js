import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import FontAwesome from "react-fontawesome";

import "./style.scss";

class EntryItem extends React.Component {
  constructor(props) {
    super(props);
  }

  // Renders entry minutes as hours and minutes
  renderTime() {
    let totalMinutes = this.props.minutes;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    return (
      <div className="time">{hours} hrs {minutes} min</div>
    )
  }

  render() {
    return (
      <div className="entry">
        <div className="top-row">
          <Moment className="date" format="dddd, MMMM Do YYYY, h:mm a">{this.props.date}</Moment>
          <p className="delete" onClick={this.props.onClick.bind(this)}><FontAwesome name='trash'/></p>
        </div>
        <div>
          <div className="entry-content">{this.props.content}</div>
        </div>
        <div>
        {this.renderTime()}
        </div>
      </div>
    );
  }
}

export default EntryItem;
