import React from "react";

import "./style.scss";

const EntryAddFormHidden = (props) => {
  return (
    <div className="entry-plus">
      <div className="plus" onClick={props.onClick}>+</div>
    </div>
  );
}

export default EntryAddFormHidden;
