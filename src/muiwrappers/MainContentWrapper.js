import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    justifyContent: 'center',
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    minWidth: 300,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const MainContentWrapper = ({ classes, children }) => (
  <Grid container className={classes.root}>
    <Grid item>
      <Paper className={classes.paper}>
        {children}
      </Paper>
    </Grid>
  </Grid>
);

export default withStyles(styles)(MainContentWrapper);
