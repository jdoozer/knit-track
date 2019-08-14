import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
  paper: {
    minWidth: 330,
    textAlign: 'center',
  },
});

const MainContentWrapper = ({ classes, children }) => (
  <Grid container className={classes.root}>
    <Grid item>
      <Paper className={classes.paper} elevation={4}>
        {children}
      </Paper>
    </Grid>
  </Grid>
);

MainContentWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(MainContentWrapper);
