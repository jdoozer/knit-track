import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  numRows: {
    paddingLeft: 4,
  },
  background: {
    color: '#999',
    fontStyle: 'italic',
  },
});

const SectionStatus = ({ currentRow, numRows, classes, displayStyle }) => {

  if (displayStyle === 'row fraction') {
    return(
      <div className={classes.root}>
        <Typography type="headline">{currentRow + 1}</Typography>
        <Typography type="subheading" className={classes.numRows}>
          / {numRows}
        </Typography>
      </div>
    );
  }

  return(
    <Typography type="subheading" className={classes.background}>total rows: {numRows}</Typography>
  );
};

SectionStatus.propTypes = {
  currentRow: PropTypes.number.isRequired,
  numRows: PropTypes.number.isRequired,
  displayStyle: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionStatus);
