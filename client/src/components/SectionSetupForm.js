import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import ContentHeader from 'components/ContentHeader';
import SectionRowInputs from 'components/SectionRowInputs';
import MessageBlock from 'components/MessageBlock';
import updateNestedItem from 'utils/updateNestedItem';
import objValsNotEmpty from 'utils/objValsNotEmpty';

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

    const { createSection, pattern } = this.props;
    const { title, numRows, rowData } = this.state;

    const rowDataObject = rowData.reduce((acc, item, index) => {
      if (objValsNotEmpty(item)) {
        acc[index+1] = item;
      }
      return acc;
    }, {});

    const section = {
      patternId: pattern.patternId,
      title,
      numRows,
      currentRow: 1,
      rows: rowDataObject
    };

    createSection(section);

    this.patternPageRedirect(event);
  }

  handleReset(event) {
    this.patternPageRedirect(event);
  }

  render() {

    const { pattern, loading, error, classes } = this.props;

    if (loading) {
      return (<CircularProgress />);
    }

    if (error) {
      return (
        <MessageBlock>
          An error occurred while fetching data. Please reload to try again.
        </MessageBlock>
      );
    }

    if (pattern === null) {
      return (
        <MessageBlock>Invalid Pattern ID</MessageBlock>
      );
    }

    return (
      <Hidden xsDown>
        <ContentHeader>{pattern.title} - New Section Setup</ContentHeader>
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
          <Button variant="raised" color="primary" className={classes.button} type="submit">
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
    title: PropTypes.string,
    info: PropTypes.string,
    patternId: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SectionSetupForm);
