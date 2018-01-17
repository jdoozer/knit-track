import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';

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

const ContentHeader = ({ classes, children, buttonFunc }) => (
  <AppBar
    position="static"
    elevation="0"
    color="accent"
    className={classes.root}
  >
    <Toolbar>
      <Typography type="headline" color="inherit" className={
        (typeof buttonFunc === "function") ? [classes.flex, classes.titleLeft].join(' ') : classes.flex
      }>
        {children}
      </Typography>
      {(typeof buttonFunc === "function") && (
        <IconButton color="inherit" className={classes.button} onClick={() => buttonFunc()}>
          <DeleteIcon />
        </IconButton>
      )}
    </Toolbar>
  </AppBar>
);

ContentHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(ContentHeader);
