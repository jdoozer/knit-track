import React from 'react';

class SectionSetup extends React.Component {
  constructor(props) {
    super(props);
    this.rowProperties = ['fullText', 'quickText', 'stitches'];
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    let initialState = {};
    for (let rowInd = 0; rowInd < this.props.numRows; rowInd++) {
      for (let property of this.rowProperties) {
        initialState[property + rowInd] = '';
      }
    }
    this.setState(initialState);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const { history, sectionID, addRow, numRows } = this.props;

    let rowInfo;
    for (let rowInd = 0; rowInd < numRows; rowInd++) {
      rowInfo = {};
      for (let property of this.rowProperties) {
        rowInfo[property] = (this.state[property + rowInd]);
      }
      addRow(sectionID, rowInfo);
    }

    event.preventDefault();
    history.push('/pattern');
  }

  createInput(inputName = '') {
    return (
      <input
        type="text"
        name={inputName}
        key={inputName}
        value={this.state[inputName]}
        onChange={this.handleChange}
      />
    );
  }

  createRowInput(rowNum = 0) {
    return (
      this.rowProperties.map(property =>
        this.createInput(property+rowNum))
    );
  }

  allRowInputs() {
    let rowInputs = [];
    for (let rowInd = 0; rowInd < this.props.numRows; rowInd++) {
      rowInputs.push(<div key={rowInd}>Row {rowInd+1}:</div>);
      rowInputs.push(this.createRowInput(rowInd));
    }
    return rowInputs;
  }

  render() {
    const { sectionID } = this.props;
    if (sectionID == null) {
      return (
        <div>No active section!</div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            {this.allRowInputs()}
            <input type="submit" value="Create Section" />
          </form>
        </div>
      );
    }
  }
};

export default SectionSetup;
