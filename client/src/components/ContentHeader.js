import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ActionIconButton from 'components/ActionIconButton';

const styles = theme => ({
  root: {
    width: '100%',
    borderBottom: '1px solid #AAA',
    background: theme.palette.contentHeader,
  },
  text: {
    flex: 1,
    textAlign: props => props.icon ? 'left' : 'center',
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
      <Typography
        variant="h5"
        color="inherit"
        className={classes.text}
      >
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
