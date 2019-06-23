import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

const rowInputField = ({
  property='',
  rowInd=0,
  classes, currState, onChange, rowProps
}) => (
  <TextField label=''
    className={[classes.textField, classes[property]].join(' ')}
    name={property}
    key={property + rowInd}
    value={currState[rowInd][property]}
    onChange={event => onChange(rowInd, event)}
    placeholder={rowProps[property].display}
    type={rowProps[property].type}
  />
);

const rowInputFields = props => {
  const { rowInd, classes, rowProps } = props;
  return (
    <div className={classes.row} key={rowInd}>
      <Typography variant="subheading" className={classes.rowLabel}>
        Row {rowInd+1}
      </Typography>
      {Object.keys(rowProps).map(
        property => rowInputField({ property, ...props })
      )}
    </div>
  );
};

const SectionRowInputs = ({ numRows, ...props }) => {
  let rowInputs = [];
  const displayRows = Math.min(numRows, props.currState.length);
  for (let rowInd = 0; rowInd < displayRows; rowInd++) {
    rowInputs.push(rowInputFields({ rowInd, ...props }));
  }
  return rowInputs;
};

SectionRowInputs.propTypes = {
  numRows: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  currState: PropTypes.array.isRequired,
  rowProps: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SectionRowInputs;
