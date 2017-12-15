import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
    const { dispatch, patternID, history } = this.props;

    if (title.trim()) {
      dispatch(addSection(patternID, title, numRows));
    }

    event.preventDefault();
    history.push('/section');
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

AddSection = withRouter(connect()(AddSection));

export default AddSection;
