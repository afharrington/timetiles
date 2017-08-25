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

  calculateColor(tile, mostRecentDate) {
    const currentDate = new Date();
    const oneDay = 24*60*60*1000;


    if (tile.mode == "continuous") {
      const daysColorFade = tile.continuousDays;
      let daysSince = mostRecentDate !== "" ? Math.round(Math.abs((currentDate.getTime() - mostRecentDate.getTime())/(oneDay))) : 0;
      if (daysSince >= daysColorFade) {
        let colorValuesToFade = Math.floor(daysSince / 2);
        tile.color = tile.color - colorValuesToFade;
        // If the color value becomes negative, set it to 0
        if (tile.color < 0) {
          tile.color = 0;
        }
      }
      // If a goal cycle is complete, reset the tile color and the cycle start date
    } else if (tile.mode == "goal") {
        const cycleLength = tile.goalCycle;
        const cycleStart = new Date(tile.goalLastCycleStart);
        let daysSince = Math.round(Math.abs((currentDate.getTime() - cycleStart.getTime())/(oneDay)));

        if (daysSince > cycleLength) {
          tile.color = 0;
          tile.goalLastCycleStart = currentDate;
        }
      }
      // Update the tile in Mongo
    this.props.updateColor(tile._id, { "color": tile.color }, fetchTiles());
  }


  renderTiles() {
    // If there is at least one entry, passes that date as a prop to the tile,
    // else sends an empty string
    return _.map(this.props.tiles, tile => {
      const mostRecentDate = tile.entries[0] ? new Date(tile.entries[0].date) : "";
      this.calculateColor(tile, mostRecentDate);

      return (
        <Link to={`/app/${tile._id}`} key={tile._id}>
          <Tile
            id={tile._id}
            name={tile.name}
            totalMinutes={tile.totalMinutes}
            mostRecentDate={mostRecentDate}
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
