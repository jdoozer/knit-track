import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    margin: theme.spacing(5),
    marginBottom: theme.spacing(1),
  },
});

const AddPatternLink = React.forwardRef(
  (props, ref) => <Link innerRef={ref} to={`/patterns/new`} {...props} />
);

const AddPattern = ({ classes }) => (
  <Button
    variant="outlined"
    color="primary"
    className={classes.root}
    component={AddPatternLink}
  >
    + New Pattern
  </Button>
);

AddPattern.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPattern);
