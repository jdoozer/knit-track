import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  buttons: {
    marginTop: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
  rowLabel: {
    marginRight: theme.spacing.unit * 2,
  },
  stitches: {
    width: 40
  },
  fullText: {
    width: 300,
  },
  quickText: {
    width: 150
  }
});

class SectionSetup extends React.Component {
  constructor(props) {
    super(props);
    this.rowProperties = ['fullText', 'quickText', 'stitches'];
    this.rowPropsDisplay = {
      fullText: 'Full Row Instructions',
      quickText: 'Shorthand/alert',
      stitches: 'sts'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
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

  handleReset(event) {
    const { history } = this.props;

    event.preventDefault();
    history.push('/pattern');
  }

  createInput(property = '', rowNum = 0) {
    const inputName = property + rowNum;
    const { classes } = this.props;

    return (
      <TextField label=''
        className={[classes.textField, classes[property]].join(' ')}
        name={inputName}
        key={inputName}
        value={this.state[inputName]}
        onChange={this.handleChange}
        placeholder={this.rowPropsDisplay[property]}
      />
    );
  }

  createRowInput(rowNum = 0) {
    const { classes } = this.props;

    return (
      <div className={classes.row} key={rowNum}>
        <Typography type="subheading" className={classes.rowLabel}>
          Row {rowNum+1}
        </Typography>
        {this.rowProperties.map(property =>
          this.createInput(property, rowNum))}
      </div>
    );
  }

  allRowInputs() {
    let rowInputs = [];
    for (let rowInd = 0; rowInd < this.props.numRows; rowInd++) {
      rowInputs.push(this.createRowInput(rowInd));
    }
    return rowInputs;
  }

  render() {
    const { sectionID, classes } = this.props;
    if (sectionID == null) {
      return (
        <div>No active section!</div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
            {this.allRowInputs()}
            <div className={classes.buttons}>
              <Button raised color="primary" className={classes.button} type="submit">
                Create Section
              </Button>
            </div>
          </form>
        </div>
      );
    }
  }
};

export default withStyles(styles)(SectionSetup);
