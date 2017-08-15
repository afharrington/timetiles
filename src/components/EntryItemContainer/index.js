// EntryItemContainer conditionally renders the entry or the entry edit form
import React from "react";
import EntryItem from "./components/Entry_Item";
import EntryEditForm from "./components/Entry_Edit_Form";

// Renders the form or hidden form depending on formVisible state
class EntryItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisible: false,
      hours: 0,
      minutes: 0
    };
    this.showEditForm = this.showEditForm.bind(this);
    this.handleExitForm = this.handleExitForm.bind(this);
  }

  componentDidMount() {
    let time = this.convertTime();
    this.setState({ hours: time[0]});
    this.setState({ minutes: time[1]});
  }

  showEditForm(e) {
    this.setState({ formVisible: true} );
  }

  deleteEntry(_id) {
    this.props.deleteEntry(this.state.tileId, _id, () => {
      this.props.fetchEntries(this.state.tileId);
    });
  }

  handleExitForm(e) {
    this.setState( {formVisible: false} );
  }

  // Convert entry minutes to hours and minutes
  convertTime() {
    let totalMinutes = this.props.minutes;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    return [hours, minutes];
  }

  render() {
    let display = this.state.formVisible ?
      <EntryEditForm
        onExit={this.handleExitForm}
        tileId={this.props.tileId}
        entryId={this.props.entryId}
        date={this.props.date}
        content={this.props.content}
        hours={this.state.hours}
        minutes={this.state.minutes}
        form={`EntryEditForm-${this.props.entryId}`}
      />
    : <EntryItem
        showEditForm={this.showEditForm.bind(this)}
        deleteEntry={this.deleteEntry.bind(this)}
        entryId={this.props.entryId}
        date={this.props.date}
        content={this.props.content}
        hours={this.state.hours}
        minutes={this.state.minutes}
      />;

    return (
      <div>
        {display}
      </div>
    );
  }
}

export default EntryItemContainer;
