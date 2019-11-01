import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: 700,
    minHeight: '100vh',
  },
  toolbar: theme.mixins.toolbar,
});

const MainContentWrapper = ({ classes, children }) => (
  <Paper className={classes.content} square component="main">
    <div className={classes.toolbar} />
    {children}
  </Paper>
);

MainContentWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(MainContentWrapper);
