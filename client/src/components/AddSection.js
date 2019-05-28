import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
    marginTop: 0,
  },
});

const AddSection = ({ classes, patternId }) => (
  <Button
    variant="raised"
    color="primary"
    className={classes.root}
    component={props => <Link to={`/patterns/${patternId}/newsection`} {...props} />}
  >
    New Section
  </Button>
);

AddSection.propTypes = {
  classes: PropTypes.object.isRequired,
  patternId: PropTypes.string.isRequired,
};

export default withStyles(styles)(AddSection);
