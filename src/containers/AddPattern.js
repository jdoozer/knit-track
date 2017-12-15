import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { addPattern } from 'actions';

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
    minWidth: 250
  },
});


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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Pattern Name"
            className={classes.textField}
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Button raised color="primary" className={classes.button} type="submit">
            Add Pattern
          </Button>

        </form>
      </div>
    );
  }
}


AddPattern = connect()(AddPattern);

export default withStyles(styles)(AddPattern)
