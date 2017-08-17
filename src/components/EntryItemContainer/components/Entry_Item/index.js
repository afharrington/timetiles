import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import FontAwesome from "react-fontawesome";

import "./style.scss";

class EntryItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="entry">
        <p className="edit" onClick={this.props.showEditForm}><FontAwesome className="edit-icon" name='pencil'/></p>
        <p className="delete" onClick={this.props.onDelete}><FontAwesome className="trash-icon" name='trash'/></p>
        <div className="top-row">
          <Moment className="date" format="dddd, MMMM Do YYYY, h:mm a">{this.props.date}</Moment>
        </div>
        <div className="entry-content">{this.props.content}</div>
        <div className="entry-comments">{this.props.comments}</div>
        <div>
          <div className="time">{this.props.hours} hrs {this.props.minutes} min</div>
        </div>
      </div>
    );
  }
}

export default EntryItem;
