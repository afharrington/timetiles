// EntriesView fetches entries for a single tile and renders the components
// for the tile detail page (with total time, form container, and all entries)
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {bindActionCreators} from "redux";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchEntries, deleteEntry, deleteTile } from "../../actions";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FontAwesome from "react-fontawesome";

import EntryAddContainer from "../../components/EntryAddContainer";
import EntryItem from "../../components/EntryItem";

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

  // Deletes an entry by finding its index in the entries array and passing
  // that index to the deleteEntry action creator
  // When complete, re-fetch entries for the tile for component to re-render
  deleteEntry(_id) {
    const currentEntries = this.props.tile.entries;
    const indexToDelete = currentEntries
      .findIndex(
        function(entry) {
          return entry._id === _id;
        }
      )
    this.props.deleteEntry(this.state.tileId, indexToDelete, () => {
      this.props.fetchEntries(this.state.tileId);
    });
  }

  // Passes the tile's id to the delete_Tile action creator and then
  // redirects user to the TilesView
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
  renderEntries() {
    const entries = this.props.tile.entries;
    return entries.map((entry) => {
      return (
          <EntryItem
            key={entry._id}
            content={entry.content}
            minutes={entry.minutes}
            onClick={this.deleteEntry.bind(this, entry._id)}
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
        <Link className="back" to="/app"><FontAwesome name='chevron-circle-left'/></Link>
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
    deleteEntry,
    deleteTile
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesView);
