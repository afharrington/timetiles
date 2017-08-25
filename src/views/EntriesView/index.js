// EntriesView fetches entries for a single tile and renders the components
// for the tile detail page (with total time, form container, and all entries)
import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import {bindActionCreators} from "redux";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchEntries, updateEntry, deleteEntry, deleteTile } from "../../actions";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FontAwesome from "react-fontawesome";
import TileSettings from "../../components/TileSettings";
import EntryAddContainer from "../../components/EntryAddContainer";
import EntryItemContainer from "../../components/EntryItemContainer";
import Alert from "../../components/Alert";

import "../../styles/main.scss";
import "./style.scss";

class EntriesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tileId: this.props.match.params.tileId,
      showAlert: false,
      showSettings: false
    };
  }

  // Fetch this tile's data
  componentDidMount() {
    this.props.fetchEntries(this.state.tileId);
  }

  toggleAlert() {
    this.setState({ showAlert: !this.state.showAlert });
  }

  toggleSettings() {
    this.setState({ showSettings: !this.state.showSettings });
  }

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
            date={entry.date}
            content={entry.content}
            comments={entry.comments}
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

    let alert = null;
    if (this.state.showAlert) {
      alert = <Alert
        message="Are you sure you want to delete this tile and its entries? This action cannot be undone."
        onDelete={this.deleteTile.bind(this)}
        onCancel={this.toggleAlert.bind(this)}
        />
    }

    let settings = null;
    if (this.state.showSettings) {
      settings = <TileSettings
        tileName={this.props.tile.name}
        tileId={this.state.tileId}
        mode={this.props.tile.mode}
        continuousHours={this.props.tile.continuousHours}
        continuousDays={this.props.tile.continuousDays}
        goalHours={this.props.tile.goalHours}
        goalCycle={this.props.tile.goalCycle}
        onClick={this.toggleSettings.bind(this)}
        />
    }

    return (
      <div className="entries-view">
        <div className="entry-list-container">
        {alert}
        {settings}
        <div className="settings-button" onClick={this.toggleSettings.bind(this)}>
          <FontAwesome className="settings-icon" name='cog'/>
        </div>
        <div className="tile-name">{this.props.tile.name}</div>
          {this.renderTotalMinutes()}
          <div className={ this.state.showSettings ? "entries-container transparent" : "entries-container" }>
            <EntryAddContainer tileId={this.state.tileId}/>
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              {this.renderEntries()}
            </ReactCSSTransitionGroup>
          </div>
          <div className="delete-tile" onClick={this.toggleAlert.bind(this)}>DELETE ALL</div>
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
