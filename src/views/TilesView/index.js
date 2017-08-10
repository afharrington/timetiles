// tilesView renders the tile tiles and add form
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom"
import _ from "lodash";
import { fetchTiles, updateColor } from "../../actions";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import TileAddContainer from "../../components/TileAddContainer";
import Tile from "../../components/Tile";

import "./style.scss";

class TilesView extends Component {

  componentDidMount() {
    this.props.fetchTiles();
  }

  renderTiles() {
    // If there is at least one entry, passes that date as a prop to the tile,
    // else sends an empty string
    return _.map(this.props.tiles, tile => {

      let lastEntry = tile.entries[0] ? tile.entries[0].created_date : "";
      // FOR TESTING let lastEntry = tile.entries[0] ? "Wed Jul 12 2017 16:10:02" : "";

      // For every 2 days since last entry, subtract -1 from color and send PUT request
      // then re-fetch all tiles
      if (lastEntry !== "") {
        let lastEntryDate = new Date(lastEntry);
        let oneDay = 24*60*60*1000;
        let currentDate = new Date();
        // Checks numbers of days since the last entry
        let daysSince = Math.round(Math.abs((currentDate.getTime() - lastEntryDate.getTime())/(oneDay)));
        if (daysSince >= 2) {
          let numColorValues = Math.floor(daysSince / 2);
          tile.color = tile.color - numColorValues;
          // If the color value becomes negative, set it to 0
          if (tile.color < 0) {
            tile.color = 0;
          }

          // Update the tile in Mongo
          this.props.updateColor(tile._id, { "color": tile.color}, fetchTiles());
        }
      }

      return (
        <Link to={`/app/${tile._id}`} key={tile._id}>
          <Tile
            id={tile._id}
            name={tile.name}
            totalMinutes={tile.totalMinutes}
            lastEntry={lastEntry}
            color={tile.color}
          />
        </Link>
      );
    });
  }

  renderMessage() {
    function isEmpty(obj) {
      for (let key in obj) {
        if(obj.hasOwnProperty(key))
          return false;
      }
      return true;
    }

    if (isEmpty(this.props.tiles) ) {
      return (
        <div className="tiles-message">Add your first tile</div>
      )
    }
  }

  render() {
    return (
      <div className="tiles-view">
          {this.renderMessage()}
        <div className="tiles-grid">
          <TileAddContainer />
          {this.renderTiles()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tiles: state.tiles
  };
}

export default connect(mapStateToProps, { fetchTiles, updateColor })(TilesView);
