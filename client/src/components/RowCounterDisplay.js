import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/Button';
import PlusIcon from 'material-ui-icons/Add';
import MinusIcon from 'material-ui-icons/Remove';
import ResetIcon from 'material-ui-icons/Undo';
import gray from 'material-ui/colors/blueGrey';
import RowInfo from 'components/RowInfo';

const textInd = 900;
const borderInd = 500;
const bgInd = 50;

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rowCounter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    border: 'solid 2px ' + gray[borderInd],
    background: gray[bgInd],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 94,
    marginRight: theme.spacing.unit,
  },
  rowDisplay: {
    color: gray[textInd],
  },
  counterButtonRoot: {
    display: 'flex',
    flexDirection: 'column',
  },
  counterButtonSecondary: {
    display: 'flex',
    flexDirection: 'row',
  },
  counterButton: {
    minWidth: 0,
    minHeight: 0,
    padding: 2,
    margin: theme.spacing.unit / 2,
    border: 'solid 1px ' + gray[borderInd],
    color: gray[textInd],
  },
  plusIcon: {
    width: 50,
    height: 50,
  },
});

const RowCounterDisplay = ({ currentRow, rows, onUpdateCountClick, classes }) => {

  return (
    <div className={classes.root}>
      <div className={classes.rowCounter}>
        <Paper className={classes.row} elevation={1}>
          <Typography variant="display2" className={classes.rowDisplay}>
            {currentRow}
          </Typography>
        </Paper>
        <div className={classes.counterButtonRoot}>
          <IconButton
            variant="raised"
            className={classes.counterButton}
            color="secondary"
            onClick={() => onUpdateCountClick("INCREMENT")}>
              <PlusIcon className={classes.plusIcon} />
          </IconButton>
          <div className={classes.counterButtonSecondary}>
            <IconButton
              variant="raised"
              className={classes.counterButton}
              color="secondary"
              onClick={() => onUpdateCountClick("RESET")}>
                <ResetIcon />
            </IconButton>
            <IconButton
              variant="raised"
              className={classes.counterButton}
              color="secondary"
              onClick={() => onUpdateCountClick("DECREMENT")}>
                <MinusIcon />
            </IconButton>
          </div>
        </div>
      </div>
        {rows
        && rows[currentRow]
        && <RowInfo currentRow={currentRow} {...rows[currentRow]} />}
    </div>
  );
}

RowCounterDisplay.propTypes = {
  currentRow: PropTypes.number.isRequired,
  rows: PropTypes.object.isRequired,
  onUpdateCountClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RowCounterDisplay);
