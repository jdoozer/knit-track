import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
});

/* props here should match the keys used in SectionSetup component */
const RowInfo = ({ currentRow, rowInstructions, notes, stitches, classes }) => {

  let rowText = [];
  if (rowInstructions || stitches)
    rowText.push(<strong key="label">Row {currentRow}</strong>);
  if (rowInstructions)
    rowText.push(`: ${rowInstructions}`);
  if (stitches)
    rowText.push(` [${stitches} sts]`);

  const notesDisplay = [ (<strong key="label">Notes</strong>), `: ${notes}` ];

  return (
    <div className={classes.root}>
      {(rowText.length > 0) &&
        <Typography variant="body1">{rowText}</Typography>
      }
      {notes && notes.trim() &&
        <Typography variant="body1">{notesDisplay}</Typography>
      }
    </div>
  );
};

RowInfo.propTypes = {
  currentRow: PropTypes.number.isRequired,
  rowInstructions: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  stitches: PropTypes.oneOfType(
    [ PropTypes.number, PropTypes.string ]
  ).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RowInfo);
