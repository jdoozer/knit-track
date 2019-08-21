import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ContentHeader from 'components/ContentHeader';
import SectionRowInputs from 'components/SectionRowInputs';
import updateNestedItem from 'utils/updateNestedItem';
import objValsNotEmpty from 'utils/objValsNotEmpty';

// keys here should match the props pulled out in RowInfo component
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

const styles = theme => {
  const mainStyles = {
    root: {
      padding: theme.spacing(3),
    },
    textField: {
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    button: {
      marginTop: theme.spacing(2),
    },
  };

  let rowPropStyles = {};
  for (let prop in rowProps) {
    rowPropStyles[prop] = { width: rowProps[prop].width };
  }

  return Object.assign(mainStyles, rowPropStyles);
}

// initialization support for form component state
const numRowsStart = 5;

let initialRow = {};
Object.keys(rowProps).forEach(key => { initialRow[key] = '' });

let rowData = [];
for (let rowNum = 0; rowNum < numRowsStart; rowNum++) {
  rowData.push({...initialRow})
}


class SectionSetupForm extends React.Component {

  state = {
    title: '' ,
    numRows: numRowsStart,
    rowData
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRowDataChange = this.handleRowDataChange.bind(this);
    this.handleRowNumChange = this.handleRowNumChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  patternPageRedirect(event) {
    const { history, pattern } = this.props;
    event.preventDefault();
    history.push(`/patterns/${pattern.patternId}`);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleRowNumChange(event) {

    const numRowsValue = event.target.value;
    console.log(numRowsValue);

    if (numRowsValue !== '') {
      const numRows = Math.max(parseInt(numRowsValue, 10), 1);
      this.setState(state => {
        const rowData = [...state.rowData];
        while (numRows > rowData.length) {
          rowData.push({...initialRow})
        }
        return { numRows, rowData }
      });
    }
  }

  handleRowDataChange(rowInd, event) {

    const { name, value } = event.target;

    this.setState(state => ({
      rowData: updateNestedItem(state.rowData, rowInd, name, value)
    }));

  }

  handleSubmit(event) {

    const { createSection, pattern: { patternId } } = this.props;
    const { title, numRows, rowData } = this.state;

    // convert array to 1-indexed object
    const rowDataObject = rowData.reduce((acc, item, index) => {
      if (objValsNotEmpty(item)) {
        acc[index+1] = item;
      }
      return acc;
    }, {});

    const newSection = { patternId, title, numRows, rows: rowDataObject };

    createSection(newSection);

    this.patternPageRedirect(event);
  }

  handleReset(event) {
    this.patternPageRedirect(event);
  }

  render() {

    const { pattern: { title }, classes } = this.props;

    return (
      <Hidden xsDown>
        <ContentHeader>{title} - New Section Setup</ContentHeader>
        <form
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
          className={classes.root}
        >
          <TextField label="Section Title"
            className={classes.textField}
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <TextField label="Number of Rows"
            className={classes.textField}
            name="numRows"
            value={this.state.numRows}
            onChange={this.handleRowNumChange}
            type="number"
          />
          <SectionRowInputs
            classes={classes}
            currState={this.state.rowData}
            onChange={this.handleRowDataChange}
            rowProps={rowProps}
            numRows={this.state.numRows}
          />
          <Button variant="contained" color="primary" className={classes.button} type="submit">
            Create Section
          </Button>
        </form>
      </Hidden>
    );
  }
};

SectionSetupForm.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  createSection: PropTypes.func.isRequired,
  pattern: PropTypes.shape({
    title: PropTypes.string.isRequired,
    patternId: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(SectionSetupForm);
