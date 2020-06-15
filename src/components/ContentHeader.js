import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  root: {
    width: '100%',
    borderBottom: '1px solid #EEE',
  },
  text: {
    flexGrow: 1,
    textAlign: ({ iconButton }) => iconButton ? 'left' : 'center',
  },
});

const ContentHeader = ({ classes, children, iconButton }) => (
  <Toolbar className={classes.root}>
    <Typography variant="h4" className={classes.text}>
      {children}
    </Typography>
    {iconButton}
  </Toolbar>
);

ContentHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  iconButton: PropTypes.oneOfType(
    [PropTypes.element, PropTypes.arrayOf(PropTypes.element)]
  ),
};

export default withStyles(styles)(ContentHeader);
