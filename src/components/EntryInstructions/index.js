import React from "react";
import "./style.scss";
import FontAwesome from "react-fontawesome";

class EntryInstructions extends React.Component {
  render() {
    return (
      <div className="entry-instructions">
        <div className="entry-instructions-text">
          <h1>Now add your first entry.</h1>
          <p>Customize the tile color settings by selecting the <FontAwesome name='cog'/> icon above.</p>
          <p>In "Continuous" mode, set how quickly tiles darken and how quickly they fade.</p>
          <p>In "Goal" mode, set a target number of hours per cycle. The tile will be its darkest when you reach the target and reset at the start of a new cycle.</p>
        </div>
      </div>
    )
  }
}

export default EntryInstructions;
