import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
});

const MessageBlock = ({ classes, children }) => (
  <Typography variant="subtitle1" className={classes.root}>
    {children}
  </Typography>
);

export default withStyles(styles)(MessageBlock);
