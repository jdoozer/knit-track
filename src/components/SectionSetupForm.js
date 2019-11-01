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

// keys here should match the props pulled out in RowInfo component
const rowProps = {
  rowInstructions: {
    display: rowInd => `Row ${rowInd+1} Instructions`,
    flex: '8 0 250px',
    type: 'string',
  },
  notes: {
    display: () => 'Notes',
    flex: '5 0 150px',
    type: 'string',
  },
  stitches: {
    display: () => 'Sts',
    flex: '1 0 75px',
    type: 'number',
  },
};

const styles = theme => {
  const mainStyles = {
    root: {
      padding: `${theme.spacing(3)}px 0`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    },
    setup: {
      '& button': {
        marginLeft: theme.spacing(2),
      },
      width: 350,
      marginBottom: theme.spacing(3),
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    dataRow: {
      width: '100%',
      '& > div': {
        margin: `${theme.spacing(1)}px ${theme.spacing(.5)}px`,
      },
      '& > div:first-child': {
        marginLeft: 0
      },
      '& > div:last-child': {
        marginRight: 0
      }
    },
    button: {
      marginTop: theme.spacing(2),
    },
    textField: {
      flexGrow: 1,
      verticalAlign: 'bottom'
    }
  };

  let rowPropStyles = {};
  // eslint-disable-next-line
  for (let prop in rowProps) {
    // rowPropStyles[prop] = { width: rowProps[prop].width };
    rowPropStyles[prop] = { flex: rowProps[prop].flex };
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
    numRowsInput: numRowsStart,
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

  handleRowNumChange = () => {
    const value = this.state.numRowsInput;
    if (value !== '') {
      const numRows = Math.max(parseInt(value, 10), 1);
      this.setState(state => {
        if (numRows < state.rowData.length) {
          return { numRows, rowData: state.rowData.slice(0, numRows) }
        }

        const rowData = [...state.rowData];
        while (numRows > rowData.length) {
          rowData.push({...initialRow});
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
      patternId, title, numRows, rows: [{}].concat(rowData)
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

          <div className={classes.setup}>
            <div className={classes.row}>
              <TextField label="Section Title"
                className={classes.textField}
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                margin="dense"
                variant="filled"
              />
            </div>
            <div className={classes.row}>
              <TextField label="# Rows"
                className={classes.textField}
                name="numRowsInput"
                value={this.state.numRowsInput}
                onChange={this.handleChange}
                type="number"
                margin="dense"
                variant="filled"
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={this.handleRowNumChange}
              >
                update
              </Button>
            </div>
          </div>

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
