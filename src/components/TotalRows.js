import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import gray from '@material-ui/core/colors/blueGrey';

const styles = () => ({
  root: {
    color: gray[200],
    fontStyle: 'italic',
  },
});

const TotalRows = ({ numRows, classes }) => (
  <Typography variant="subtitle1" className={classes.root}>
    ROWS: {numRows}
  </Typography>
);

TotalRows.propTypes = {
  numRows: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TotalRows);
