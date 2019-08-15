import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import ResetIcon from '@material-ui/icons/Undo';
import gray from '@material-ui/core/colors/blueGrey';
import RowInfo from 'components/RowInfo';

const textColor = gray[900];
const textUpdatingColor = gray[500];
const textErrorColor = 'red';
const borderColor = gray[700];

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
    border: 'solid 2px ' + borderColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 94,
    marginRight: theme.spacing(1),
    color: ({ loading, error }) => {
      if (error) return textErrorColor;
      if (loading) return textUpdatingColor;
      return textColor;
    }
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
    margin: theme.spacing(1) / 2,
    border: 'solid 1px ' + borderColor,
    color: textColor,
  },
  plusIcon: {
    width: 50,
    height: 50,
  },
});

const RowCounterDisplay = ({
  currentRow, rows, onUpdateCountClick, classes
}) => (
  <div className={classes.root}>
    <div className={classes.rowCounter}>
      <Paper className={classes.row} elevation={1}>
        <Typography variant="h3">{currentRow}</Typography>
      </Paper>
      <div className={classes.counterButtonRoot}>
        <Button
          variant="contained"
          className={classes.counterButton}
          color="secondary"
          onClick={() => onUpdateCountClick("INCREMENT")}>
            <PlusIcon className={classes.plusIcon} />
        </Button>
        <div className={classes.counterButtonSecondary}>
          <Button
            variant="contained"
            className={classes.counterButton}
            onClick={() => onUpdateCountClick("RESET")}>
              <ResetIcon />
          </Button>
          <Button
            variant="contained"
            className={classes.counterButton}
            onClick={() => onUpdateCountClick("DECREMENT")}>
              <MinusIcon />
          </Button>
        </div>
      </div>
    </div>
      {rows
      && rows[currentRow]
      && <RowInfo currentRow={currentRow} {...rows[currentRow]} />}
  </div>
);

RowCounterDisplay.propTypes = {
  currentRow: PropTypes.number.isRequired,
  rows: PropTypes.object.isRequired,
  onUpdateCountClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default withStyles(styles)(RowCounterDisplay);
