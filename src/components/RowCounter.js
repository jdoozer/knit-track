import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import ResetIcon from '@material-ui/icons/Undo';
import Tooltip from '@material-ui/core/Tooltip';
import gray from '@material-ui/core/colors/blueGrey';
import CurrentRowBig from 'components/CurrentRowBig';
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
  bigIcon: {
    width: 50,
    height: 50,
  },
});

const RowCounter = ({
  currentRow, rows, onClick, classes, error, loading, final
}) => {

  let rowColor = textColor;
  if (error)
    rowColor = textErrorColor;
  if (loading)
    rowColor = textUpdatingColor;

  return (
    <div className={classes.root}>
      <div className={classes.rowCounter}>

        <CurrentRowBig
          color={rowColor}
          currentRow={currentRow}
          final={final}
        />

        <div className={classes.counterButtonRoot}>
          <Tooltip title="Increment" placement="right">
            <Button
              variant="contained"
              className={classes.counterButton}
              color="secondary"
              onClick={() => onClick("INCREMENT")}
            >
              <PlusIcon className={classes.bigIcon} />
            </Button>
          </Tooltip>
          <div className={classes.counterButtonSecondary}>
            <Tooltip title="Reset" placement="bottom-start">
              <Button
                variant="contained"
                className={classes.counterButton}
                onClick={() => onClick("RESET")}
              >
                <ResetIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Decrement" placement="right">
              <Button
                variant="contained"
                className={classes.counterButton}
                onClick={() => onClick("DECREMENT")}
              >
                <MinusIcon />
              </Button>
            </Tooltip>
          </div>
        </div>

      </div>
      {rows[currentRow]
        && <RowInfo currentRow={currentRow} {...rows[currentRow]} />}
    </div>
  )
}

RowCounter.propTypes = {
  onClick: PropTypes.func.isRequired,
  currentRow: PropTypes.number.isRequired,
  rows: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RowCounter);
