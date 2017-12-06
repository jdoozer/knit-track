import React from 'react';
import { connect } from 'react-redux';
import { addPattern } from 'actions';

class AddPattern extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {

    const { value } = this.state;
    const { dispatch } = this.props;

    event.preventDefault();

    if (value.trim()) {
      dispatch(addPattern(value));
      this.setState({ value: '' });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Add Pattern" />
        </form>
      </div>
    );
  }
}


AddPattern = connect()(AddPattern);

export default AddPattern;
