import React from "react";
import TileAddForm from "./components/TileAddForm";
import TileAddFormHidden from "./components/TileAddFormHidden";
import "./style.scss";

class TileAddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisible: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleExitForm = this.handleExitForm.bind(this);
  }

  handleClick(e) {
    this.setState({ formVisible: true} );
  }

  handleExitForm(e) {
    this.setState( {formVisible: false} );
  }

  render() {
    let display = this.state.formVisible ?
      <TileAddForm onExit={this.handleExitForm}/>
    : <TileAddFormHidden onClick={this.handleClick}/>;

    return (
      <div className="tile-add-container">
        {display}
      </div>
    );
  }
}

export default TileAddContainer;
