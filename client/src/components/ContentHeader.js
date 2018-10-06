import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ActionIconButton from 'components/ActionIconButton';

const styles = theme => ({
  root: {
    width: '100%',
    borderBottom: '1px solid #AAA',
    background: theme.palette.contentHeader,
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
    color="secondary"
  >
    <Toolbar>
      <Typography variant="headline" color="inherit" className={
        buttonProps.icon ? classNames(classes.flex, classes.titleLeft) : classes.flex
      }>
        {children}
      </Typography>
      {buttonProps.icon && (<ActionIconButton {...buttonProps} />)}
    </Toolbar>
  </AppBar>
);

ContentHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  buttonProps: PropTypes.object,
};

export default withStyles(styles)(ContentHeader);
