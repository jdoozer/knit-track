import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import HeaderAction from 'components/HeaderAction';

const styles = theme => ({
  root: {
    width: '100%',
    borderBottom: '1px solid #AAA',
  },
  flex: {
    flex: 1,
  },
  titleLeft: {
    textAlign: 'left',
  },
  button: {
    minWidth: 0,
    padding: theme.spacing.unit,
  },
});

const ContentHeader = ({ classes, children, buttonProps }) => (
  <AppBar
    position="static"
    elevation="0"
    color="accent"
    className={classes.root}
  >
    <Toolbar>
      <Typography type="headline" color="inherit" className={
        buttonProps ? [classes.flex, classes.titleLeft].join(' ') : classes.flex
      }>
        {children}
      </Typography>
      {buttonProps && (<HeaderAction buttonProps={buttonProps} />)}
    </Toolbar>
  </AppBar>
);

ContentHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  buttonFunc: PropTypes.object,
};

export default withStyles(styles)(ContentHeader);
