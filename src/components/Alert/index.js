import React from "react";
import "./style.scss";

class Alert extends React.Component {
  render() {
    return (
      <div className="alert">
        <div className="alert-text">
          <p>{this.props.message}</p>
        </div>
        <div className="alert-options">
          <button className="confirm-delete" onClick={this.props.onDelete}>Delete</button>
          <button onClick={this.props.onCancel}>Cancel</button>
        </div>
      </div>
    )
  }
}

export default Alert;
