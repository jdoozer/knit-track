import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    margin: theme.spacing(3),
    marginTop: 0,
  },
});

const AddSectionLink = patternId => React.forwardRef(
  (props, ref) => (
    <Link
      innerRef={ref}
      to={`/patterns/${patternId}/newsection`}
      {...props}
    />
  )
);

const AddSection = ({ classes, patternId }) => (
  <Button
    variant="contained"
    color="primary"
    className={classes.root}
    component={AddSectionLink(patternId)}
  >
    New Section
  </Button>
);

AddSection.propTypes = {
  classes: PropTypes.object.isRequired,
  patternId: PropTypes.string.isRequired,
};

export default withStyles(styles)(AddSection);
