import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ProgressModal from 'components/ProgressModal';
import ErrorSnackbar from 'components/ErrorSnackbar';
import ContentHeader from 'components/ContentHeader';
import SectionRowInputs from 'components/SectionRowInputs';
import updateNestedItem from 'utils/updateNestedItem';
import arrayToRowObject from 'utils/arrayToRowObject';

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
  // eslint-disable-next-line
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
    this.handleRowDataChange = this.handleRowDataChange.bind(this);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleRowNumChange = ({ target: { value } }) => {
    if (value !== '') {
      const numRows = Math.max(parseInt(value, 10), 1);
      this.setState(state => {
        const rowData = [...state.rowData];
        while (numRows > rowData.length) {
          rowData.push({...initialRow})
        }
        return { numRows, rowData }
      });
    }
  };

  handleRowDataChange = (rowInd, { target: { name, value } }) => {
    this.setState(state => ({
      rowData: updateNestedItem(state.rowData, rowInd, name, value)
    }));
  };

  handleSubmit = event => {
    const { createSection, pattern: { patternId } } = this.props;
    const { title, numRows, rowData } = this.state;
    const newSection = {
      patternId, title, numRows, rows: arrayToRowObject(rowData)
    };
    createSection(newSection);
    event.preventDefault();
  };

  render() {

    const {
      pattern: { title }, classes, loading, error, clearError
    } = this.props;

    return (
      <React.Fragment>
        <ContentHeader>{title} - New Section Setup</ContentHeader>
        <form
          onSubmit={this.handleSubmit}
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
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Create Section
          </Button>
        </form>

        <ProgressModal open={loading} />
        <ErrorSnackbar open={error} onClose={clearError}>
          Error creating section, please retry!
        </ErrorSnackbar>

      </React.Fragment>
    );
  }
};

SectionSetupForm.propTypes = {
  classes: PropTypes.object.isRequired,
  createSection: PropTypes.func.isRequired,
  pattern: PropTypes.shape({
    title: PropTypes.string.isRequired,
    patternId: PropTypes.string.isRequired,
  }).isRequired,
  clearError: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SectionSetupForm);
