import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import HeaderAction from 'components/HeaderAction';

const styles = theme => ({
  root: {
    width: '100%',
    borderBottom: '1px solid #AAA',
    background: theme.palette.contrast,
    color: theme.palette.contrastText,
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

const ContentHeader = ({ classes, children, ...buttonProps }) => (
  <AppBar
    position="static"
    elevation={0}
    className={classes.root}
  >
    <Toolbar>
      <Typography type="headline" color="inherit" className={
        buttonProps.onClick ? classNames(classes.flex, classes.titleLeft) : classes.flex
      }>
        {children}
      </Typography>
      {buttonProps.onClick && (<HeaderAction buttonProps={buttonProps} />)}
    </Toolbar>
  </AppBar>
);

ContentHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  buttonProps: PropTypes.object,
};

export default withStyles(styles)(ContentHeader);
