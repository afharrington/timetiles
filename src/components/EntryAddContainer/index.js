// EntryAddContainer conditionally renders the entry form or the hidden form
// and passes event handlers down to children
import React from "react";
import EntryAddFormHidden from "./components/Entry_Add_Form_Hidden";
import EntryAddForm from "./components/Entry_Add_Form";

// Renders the form or hidden form depending on formVisible state, which can be
// toggled
class EntryAddContainer extends React.Component {
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
      <EntryAddForm onExit={this.handleExitForm} streamId={this.props.streamId}/>
    : <EntryAddFormHidden onClick={this.handleClick}/>;

    return (
      <div>
        {display}
      </div>
    );
  }
}

export default EntryAddContainer;
