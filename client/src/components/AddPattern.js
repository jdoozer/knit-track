import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
  },
});

const AddPattern = ({ classes }) => (
  <Button
    variant="raised"
    color="primary"
    className={classes.root}
    component={props => <Link to={`/patterns/new`} {...props} />}
  >
    New Pattern
  </Button>
);

AddPattern.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPattern);
