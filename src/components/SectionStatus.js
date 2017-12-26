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
  totalRows: {
    paddingLeft: 4,
  },
});

const SectionStatus = ({ section, classes }) => {
  const { currentRow, numRows } = section;

  return(
    <div className={classes.root}>
      <Typography type="title">{currentRow + 1}</Typography>
      <Typography type="body1" className={classes.totalRows}> / {numRows}</Typography>
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
