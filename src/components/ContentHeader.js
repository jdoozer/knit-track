import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = () => ({
  root: {
    width: '100%',
    borderBottom: '1px solid #AAA',
  },
});

const ContentHeader = ({ classes, children }) => (
  <AppBar
    position="static"
    elevation="0"
    color="accent"
    className={classes.root}
  >
    <Toolbar>
      <Typography type="headline" color="inherit">
        {children}
      </Typography>
    </Toolbar>
  </AppBar>
);

ContentHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(ContentHeader);
