import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
});

const MessageBlock = ({ classes, children }) => (
  <Typography variant="subheading" className={classes.root}>
    {children}
  </Typography>
);

export default withStyles(styles)(MessageBlock);
