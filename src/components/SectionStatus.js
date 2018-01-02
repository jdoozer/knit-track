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
});

const SectionStatus = ({ section, classes, displayStyle }) => {
  const { currentRow, numRows } = section;

  if (displayStyle == 'row fraction') {
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
    <div className={classes.root}>
      <Typography type="subheading">Rows in Section: {numRows}</Typography>
    </div>
  );
};

SectionStatus.propTypes = {
  section: PropTypes.shape({
    currentRow: PropTypes.number.isRequired,
    numRows: PropTypes.number.isRequired,
  }).isRequired,
};

export default withStyles(styles)(SectionStatus);
