import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { addPattern } from 'actions';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  textField: {
    minWidth: 250,
    marginRight: theme.spacing.unit * 2,
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
          <Button variant="raised" color="primary" type="submit">
            Add Pattern
          </Button>
        </form>
      </div>
    );
  }
}

AddPattern.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withStyles(styles)(connect()(AddPattern));
