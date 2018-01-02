import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/Button';
import PlusIcon from 'material-ui-icons/Add';
import MinusIcon from 'material-ui-icons/Remove';
import ResetIcon from 'material-ui-icons/Undo';

const styles = theme => {
  /*debugger;*/
return({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rowCounter: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing.unit * 2,
  },
  row: {
    border: 'solid 2px #333',
    background: '#CCC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    marginRight: theme.spacing.unit,
  },
  rowDisplay: {
    color: '#333',
  },
  rowButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
  rowButtonsSmall: {
    display: 'flex',
    flexDirection: 'row',
  },
  quickText: {
    color: theme.palette.secondary["A200"],
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  iconButton: {
    minWidth: 0,
    minHeight: 0,
    padding: 2,
    margin: theme.spacing.unit / 2,
  },
  plusButton: {
    minHeight: 50,
  },
  plusIcon: {
    width: 50,
    height: 50,
  },
})};

const RowCounter = ({ currentRow, rowData, onUpdateCountClick, classes }) => {

  let infoDiv = '';
  if (rowData && rowData[currentRow]) {
    /* variables here should match the keys used in SectionSetup component */
    const { fullText, quickText, stitches } = rowData[currentRow];
    infoDiv = (
      <div>
        <Typography type="body1">
          {`Row ${currentRow+1}: ${fullText} [${stitches} sts]`}
        </Typography>
        <Typography type="subheading" className={classes.quickText}>
          {quickText && quickText.trim() && <span>{quickText}</span>}
        </Typography>
      </div>
    );
  }

  return(
    <div className={classes.root}>
      <div className={classes.rowCounter}>
        <div className={classes.row}>
          <Typography type="display2" className={classes.rowDisplay}>
            {currentRow + 1}
          </Typography>
        </div>
        <div className={classes.rowButtons}>
          <IconButton
            raised
            color="primary"
            className={[classes.iconButton, classes.plusButton].join(' ')}
            onClick={() => onUpdateCountClick("INCREMENT")}>
              <PlusIcon className={classes.plusIcon} />
          </IconButton>
          <div className={classes.rowButtonsSmall}>
            <IconButton
              raised
              color="primary"
              className={classes.iconButton}
              onClick={() => onUpdateCountClick("RESET")}>
                <ResetIcon />
            </IconButton>
            <IconButton
              raised
              color="primary"
              className={classes.iconButton}
              onClick={() => onUpdateCountClick("DECREMENT")}>
                <MinusIcon />
            </IconButton>
          </div>
        </div>
      </div>
      {infoDiv}
    </div>
  );
};

RowCounter.propTypes = {
  currentRow: PropTypes.number.isRequired,
  rowData: PropTypes.array.isRequired,
  onUpdateCountClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RowCounter);
