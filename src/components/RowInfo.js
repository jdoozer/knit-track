import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
});

/* props here should match the keys used in SectionSetup component */
const RowInfo = ({ currentRow, rowInstructions, notes, stitches, classes }) => {

  let row = (rowInstructions || stitches) ? [(<b>Row {currentRow}</b>)] : [];
  if (rowInstructions)  row.push(`: ${rowInstructions}`);
  if (stitches)  row.push(` [${stitches} sts]`);

  const notesDisplay = notes && notes.trim() && [(<b>Notes</b>), `: ${notes}`];

  return (
    <div className={classes.root}>
      {row.length && <Typography variant="body1">{row}</Typography>}
      <Typography variant="subtitle1">{notesDisplay}</Typography>
    </div>
  );
};

RowInfo.propTypes = {
  currentRow: PropTypes.number.isRequired,
  rowInstructions: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  stitches: PropTypes.oneOfType(
    [ PropTypes.number, PropTypes.string]
  ).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RowInfo);
