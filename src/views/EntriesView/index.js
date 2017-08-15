// EntriesView fetches entries for a single tile and renders the components
// for the tile detail page (with total time, form container, and all entries)
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {bindActionCreators} from "redux";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchEntries, updateEntry, deleteEntry, deleteTile } from "../../actions";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FontAwesome from "react-fontawesome";

import EntryAddContainer from "../../components/EntryAddContainer";
import EntryItemContainer from "../../components/EntryItemContainer";

import "../../styles/main.scss";
import "./style.scss";

class EntriesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tileId: this.props.match.params.tileId
    };
  }

  // Fetch this tile's data
  componentDidMount() {
    this.props.fetchEntries(this.state.tileId);
  }

  // updateEntry(_id) {
  //   this.props.updateEntry(_id, () => {
  //     this.props.fetchEntries(this.state.tileId);
  //   });
  // }

  // These actions will get moved to EntryItemContainer
  // deleteEntry(_id) {
  //   this.props.deleteEntry(this.state.tileId, _id, () => {
  //     this.props.fetchEntries(this.state.tileId);
  //   });
  // }

  deleteTile() {
    this.props.deleteTile(this.state.tileId, () => {
      this.props.history.push("/app");
    });
  }

  // Renders total minutes (from tile's state) as hours and minutes
  renderTotalMinutes() {
    let totalMinutes = this.props.tile.totalMinutes;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    return (
      <div className="total-time">{hours} hr {minutes} min</div>
    )
  }

  // Creates an entry item for each entry in the entries array on tile's state
  // Passes edit/delete event handlers as props to EntryItem
  renderEntries() {
    return _.map(this.props.tile.entries, entry => {
      return (
          <EntryItemContainer
            key={entry._id}
            tileId={this.state.tileId}
            entryId={entry._id}
            date={entry.created_date}
            content={entry.content}
            minutes={entry.minutes}
          />
      );
    });
  }

  render() {
    const { tile } = this.props;
    if (!tile) {
      return <div className="nothing-here">Nothing here! Please log in and try again.</div>
    }

    return (
      <div className="entries-view">
        <div className="entry-list-container">
        <div className="tile-name">{this.props.tile.name}</div>
          {this.renderTotalMinutes()}
          <div className="entries-container">
            <EntryAddContainer tileId={this.state.tileId}/>
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              {this.renderEntries()}
            </ReactCSSTransitionGroup>
          </div>
          <div className="delete-tile" onClick={this.deleteTile.bind(this)}>DELETE ALL</div>
        </div>
      </div>
    );
  }
}

// Passes a single tile's data as props to this component
function mapStateToProps(state, ownProps) {
  return {
    tile: state.tiles[ownProps.match.params.tileId]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchEntries,
    updateEntry,
    deleteEntry,
    deleteTile
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesView);
