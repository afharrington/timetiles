import React from "react";

import "./style.scss";

const TileAddFormHidden = (props) => {
  return (
    <div className="tile-form-hidden" onClick={props.onClick}>
      <p className="tile-form-plus">+</p>
    </div>
  );
}

export default TileAddFormHidden;
