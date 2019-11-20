import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import gray from '@material-ui/core/colors/blueGrey';

const borderColor = gray[700];
const textColor = gray[900];

const styles = theme => ({
  root: {
    border: 'solid 2px ' + borderColor,
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 30,
    height: 'auto',
    marginRight: theme.spacing(1),
    padding: theme.spacing(0, 1),
    color: ({ color }) => color || textColor,
    background: ({ final }) => final ? theme.palette.primary.bg : '#FFF',
  }
});

const CurrentRowSmall = ({ currentRow, classes, big }) => (
  <Paper className={classes.root} elevation={1}>
    <Typography variant="subtitle1">
      {currentRow}
    </Typography>
  </Paper>
);

CurrentRowSmall.propTypes = {
  currentRow: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  final: PropTypes.bool,
};

export default withStyles(styles)(CurrentRowSmall);
