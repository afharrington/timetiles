import React from "react";
import Moment from "react-moment";
import "./style.scss";

class StreamTile extends React.Component {

  constructor(props) {
    super(props);
    let color = props.color <= 8 ? Math.floor(props.color) : 8
    let textColor = color <= 5 ? "dark-text" : "light-text";

    this.state = {
      color: color,
      textColor: textColor
    }
  }

  // Renders total minutes (from stream's state) as hours and minutes
  renderTime() {
    let textClassName = `stream-time ${this.state.textColor}`;
    let totalMinutes = this.props.totalMinutes;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    return (
      <div className={textClassName}>{hours} hrs {minutes} min</div>
    )
  }

  renderLastEntry() {
    let lastEntryText = this.props.lastEntry == "" ?
      <div></div>
    : <p><span className="last-label">LAST:</span><Moment className="stream-time" format="ll">{this.props.lastEntry}</Moment></p>

    let textClassName = `last-entry ${this.state.textColor}`
    return (
      <div className={textClassName}>
        {lastEntryText}
      </div>
    )
  }

  render() {
    let tileClassName = `stream-tile color-${this.state.color}`;
    let textClassName = `stream-name ${this.state.textColor}`;

    return (
      <div className={tileClassName}>
        <div className="stream-content">
          <div className={textClassName}>{this.props.name}</div>
          {this.renderTime()}
          {this.renderLastEntry()}
        </div>
      </div>
    );
  }
}

export default StreamTile;
