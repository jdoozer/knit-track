import React from 'react';
import { connect } from 'react-redux';
import { addSection } from 'actions';

class AddSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', numRows: 0 };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleRowsChange(event) {
    this.setState({ numRows: event.target.value });
  }

  handleSubmit(event) {

    const { title, numRows } = this.state;
    const { dispatch, patternID } = this.props;

    event.preventDefault();

    if (title.trim()) {
      dispatch(addSection(patternID, title, numRows));
      this.setState({ title: '', numRows: 0 });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" title={this.state.title} onChange={this.handleTitleChange} />
          <input type="text" title={this.state.numRows} onChange={this.handleRowsChange} />
          <input type="submit" title="Add Section" />
        </form>
      </div>
    );
  }
}

AddSection = connect()(AddSection);

export default AddSection;
