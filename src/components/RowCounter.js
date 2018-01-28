import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/Button';
import PlusIcon from 'material-ui-icons/Add';
import MinusIcon from 'material-ui-icons/Remove';
import ResetIcon from 'material-ui-icons/Undo';
import blueGrey from 'material-ui/colors/blueGrey';
import RowInfo from 'components/RowInfo';

const greyText = blueGrey[900];
const greyBorder = blueGrey[500];
const greyBG = blueGrey[50];

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
    border: 'solid 2px ' + greyBorder,
    background: greyBG,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 94,
    marginRight: theme.spacing.unit,
  },
  rowDisplay: {
    color: greyText,
  },
  rowButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
  rowButtonsSmall: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconButton: {
    minWidth: 0,
    minHeight: 0,
    padding: 2,
    margin: theme.spacing.unit / 2,
    border: 'solid 1px ' + greyBorder,
    color: greyText,
  },
  plusIcon: {
    width: 50,
    height: 50,
  },
});

const RowCounter = ({ currentRow, rowData, onUpdateCountClick, classes }) => (
  <div className={classes.root}>
    <div className={classes.rowCounter}>
      <Paper className={classes.row} elevation={1}>
        <Typography type="display2" className={classes.rowDisplay}>
          {currentRow + 1}
        </Typography>
      </Paper>
      <div className={classes.rowButtons}>
        <IconButton
          raised
          color="secondary"
          className={classes.iconButton}
          onClick={() => onUpdateCountClick("INCREMENT")}>
            <PlusIcon className={classes.plusIcon} />
        </IconButton>
        <div className={classes.rowButtonsSmall}>
          <IconButton
            raised
            color="secondary"
            className={classes.iconButton}
            onClick={() => onUpdateCountClick("RESET")}>
              <ResetIcon />
          </IconButton>
          <IconButton
            raised
            color="secondary"
            className={classes.iconButton}
            onClick={() => onUpdateCountClick("DECREMENT")}>
              <MinusIcon />
          </IconButton>
        </div>
      </div>
    </div>
    {(
      rowData
      && rowData[currentRow]
      && <RowInfo currentRow={currentRow} {...rowData[currentRow]} />
    )}
  </div>
);

RowCounter.propTypes = {
  currentRow: PropTypes.number.isRequired,
  rowData: PropTypes.array.isRequired,
  onUpdateCountClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RowCounter);
