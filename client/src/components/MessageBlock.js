import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
});

const MessageBlock = ({ classes, children }) => (
  <Typography variant="subtitle1" className={classes.root}>
    {children}
  </Typography>
);

MessageBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(MessageBlock);
