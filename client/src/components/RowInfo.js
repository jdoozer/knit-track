import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  quickText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

/* props here should match the keys used in SectionSetup component */
const RowInfo = ({ currentRow, fullText, quickText, stitches, classes }) => {

  let infoString = (fullText || stitches) ? `Row ${currentRow}` : '';
  infoString += fullText ? `: ${fullText} ` : '';
  infoString += stitches ? ` [${stitches} sts]` : '';

  return (
    <div className={classes.root}>
      <Typography variant="body1">
        {infoString}
      </Typography>
      <Typography variant="subtitle1" className={classes.quickText}>
        {quickText && quickText.trim() && <span>{quickText}</span>}
      </Typography>
    </div>
  );
};

RowInfo.propTypes = {
  currentRow: PropTypes.number.isRequired,
  fullText: PropTypes.string.isRequired,
  quickText: PropTypes.string.isRequired,
  stitches: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RowInfo);
