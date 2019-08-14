import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  background: {
    color: '#999',
    fontStyle: 'italic',
  },
});

const SectionStatus = ({ currentRow, numRows, classes, displayStyle }) => {

  if (displayStyle === 'fraction') {
    return (
      <Typography variant="subtitle1">
        {currentRow} / {numRows}
      </Typography>
    );
  }

  return (
    <Typography variant="subtitle1" className={classes.background}>
      ROWS: {numRows}
    </Typography>
  );
};

SectionStatus.propTypes = {
  currentRow: PropTypes.number.isRequired,
  numRows: PropTypes.number.isRequired,
  displayStyle: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionStatus);
