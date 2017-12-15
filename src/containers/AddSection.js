import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { addSection } from 'actions';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});


class AddSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', numRows: '' };
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
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Section Name"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleTitleChange}
            style={{width:200}}
          />
          <TextField
            label="# Rows"
            className={classes.textField}
            value={this.state.numRows}
            onChange={this.handleRowsChange}
            style={{width:75}}
          />
          <Button raised color="primary" className={classes.button} type="submit">
            Add Section
          </Button>
        </form>
      </div>
    );
  }
}

AddSection = withRouter(connect()(AddSection));

export default withStyles(styles)(AddSection);
