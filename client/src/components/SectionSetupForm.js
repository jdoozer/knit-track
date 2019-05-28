import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import ContentHeader from 'components/ContentHeader';
import SectionRowInputs from 'components/SectionRowInputs';

/* keys here should match the props pulled out in RowInfo component */
const rowProps = {
  fullText: {
    display: 'Full Row Instructions',
    width: 300,
    type: 'string',
  },
  quickText: {
    display: 'Shorthand/Alert',
    width: 150,
    type: 'string',
  },
  stitches: {
    display: 'Sts',
    width: 40,
    type: 'number',
  },
};

const numRowsStart = 5;

let initialRow = {};
Object.keys(rowProps).forEach(key => { initialRow[key] = '' });

const styles = theme => {
  const mainStyles = {
    root: {
      padding: theme.spacing.unit * 3,
    },
    textField: {
      marginLeft: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    button: {
      marginTop: theme.spacing.unit * 2,
    },
  };

  let rowPropStyles = {};
  for (let prop in rowProps) {
    rowPropStyles[prop] = { width: rowProps[prop].width };
  }

  return Object.assign(mainStyles, rowPropStyles);
}

class SectionSetupForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRowDataChange = this.handleRowDataChange.bind(this);
    this.handleRowNumChange = this.handleRowNumChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillMount() {

    // redirect to home if pattern ID is invalid (check by looking at pattern)
    const { pattern, history } = this.props;
    if (pattern === null) history.push('/');

    let rowData = [];
    for (let rowNum = 0; rowNum < numRowsStart; rowNum++) {
      rowData.push({...initialRow})
    }

    this.setState({
      title: '' ,
      numRows: numRowsStart,
      rowData
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleRowNumChange(event) {
    const numRows = parseInt(event.target.value, 10);
    this.setState(state => {
      const rowData = state.rowData;
      while (numRows > rowData.length) {
        rowData.push({...initialRow})
      }
      return { numRows, rowData }
    });
  }

  handleRowDataChange(rowInd, event) {

    let { name, value } = event.target;
    value = (rowProps[name].type === 'number') ? parseInt(value, 10) : value;

    this.setState(state => {
      let rowData = state.rowData;
      rowData[rowInd][name] = value;
      return { rowData };
    });
  }

  handleSubmit(event) {
    const { history, patternId, addSectionWithRows } = this.props;
    const { title, numRows, rowData } = this.state;

    const sectionDataToAdd = { patternId, title, numRows, currentRow: 0 };
    const rowDataToAdd = [...rowData].slice(0, numRows);

    addSectionWithRows(sectionDataToAdd, rowDataToAdd);

    event.preventDefault();
    history.push(`/patterns/${patternId}`);
  }

  handleReset(event) {
    const { history, patternId } = this.props;
    event.preventDefault();
    history.push(`/patterns/${patternId}`);
  }

  render() {

    const { classes } = this.props;
      return (
        <Hidden xsDown>
          <ContentHeader>Section Setup</ContentHeader>
          <form
            onSubmit={this.handleSubmit}
            onReset={this.handleReset}
            className={classes.root}
          >
            <TextField label='Section Title'
              className={classes.textField}
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
            />
            <TextField label='Number of Rows'
              className={classes.textField}
              name='numRows'
              value={this.state.numRows}
              onChange={this.handleRowNumChange}
              type='number'
            />
            <SectionRowInputs
              classes={classes}
              currState={this.state.rowData}
              onChange={this.handleRowDataChange}
              rowProps={rowProps}
              numRows={this.state.numRows}
            />
            <Button variant="raised" color="primary" className={classes.button} type="submit">
              Create Section
            </Button>
          </form>
        </Hidden>
      );
    }
  // }
};

SectionSetupForm.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  addSectionWithRows: PropTypes.func.isRequired,
  patternId: PropTypes.string,
};

export default withStyles(styles)(SectionSetupForm);
