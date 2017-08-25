import React from "react";
import "./style.scss";

class TileInstructions extends React.Component {
  render() {
    return (
      <div className="tile-instructions">
        <div className="tile-instructions-text">
          <h1>Add your first tile below.</h1>
          <p>Each tile represets a goal or a category for your entries. Select the tile to add entries to it. Tile colors darken as you add entries.</p>
        </div>
      </div>
    )
  }
}

export default TileInstructions;
