import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import MinusIcon from 'material-ui-icons/Remove';
import ResetIcon from 'material-ui-icons/Undo';
import SectionStatusContainer from 'containers/SectionStatusContainer';

const styles = () => ({
  iconLink: {
    margin: '2px',
    minWidth: 0,
    minHeight: 0,
    padding: '4px'
  },
});

const RowCounter = ({ sectionID, currentRow, rowData, onUpdateCountClick, classes }) => {

  let infoDiv = '';
  if (rowData && rowData[currentRow]) {
    const { fullText, quickText, stitches } = rowData[currentRow];
    infoDiv =
      <div>
        <Typography type="subheading">
          {quickText && quickText.trim() ? <div>{quickText}</div> : ''}
        </Typography>
        <Typography type="body1">
          {`${fullText} [${stitches} sts]`}
        </Typography>
      </div>;
    }

  return(
    <div>
      <SectionStatusContainer sectionID={sectionID} />
      <div>
        <Button
          raised
          color="primary"
          className={classes.iconLink}
          type="button"
          onClick={() => onUpdateCountClick("RESET")}>
            <ResetIcon />
        </Button>
        <Button
          raised
          color="primary"
          className={classes.iconLink}
          type="button"
          onClick={() => onUpdateCountClick("DECREMENT")}>
            <MinusIcon />
        </Button>
        <Button
          raised
          color="primary"
          className={classes.iconLink}
          type="button"
          onClick={() => onUpdateCountClick("INCREMENT")}>
            <AddIcon />
        </Button>
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
