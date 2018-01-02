import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import MinusIcon from 'material-ui-icons/Remove';
import ResetIcon from 'material-ui-icons/Undo';
import SectionStatusContainer from 'containers/SectionStatusContainer';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconButton: {
    minWidth: 0,
    padding: theme.spacing.unit / 2,
    margin: '0 2px',
  },
});

const RowCounter = ({ sectionID, currentRow, rowData, onUpdateCountClick, classes }) => {

  let infoDiv = '';
  if (rowData && rowData[currentRow]) {
    /* variables here should match the keys used in SectionSetup component */
    const { fullText, quickText, stitches } = rowData[currentRow];
    infoDiv = (
      <div>
        <Typography type="subheading">
          {quickText && quickText.trim() && <span>{quickText}</span>}
        </Typography>
        <Typography type="body1">
          {`${fullText} [${stitches} sts]`}
        </Typography>
      </div>
    );
  }

  return(
    <div className={classes.root}>
      <SectionStatusContainer sectionID={sectionID} displayStyle="row fraction" />
      <div>
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
        <IconButton
          raised
          color="primary"
          className={classes.iconButton}
          onClick={() => onUpdateCountClick("INCREMENT")}>
            <AddIcon />
        </IconButton>
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
