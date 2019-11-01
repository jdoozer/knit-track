import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const rowInputField = ({
  property, rowInd, classes, currState, onChange, rowProps
}) => (
  <TextField
    label={rowProps[property].display(rowInd)}
    className={`${classes.textField} ${classes[property]}`}
    name={property}
    key={property + rowInd}
    value={currState[rowInd][property]}
    onChange={event => onChange(rowInd, event)}
    type={rowProps[property].type}
    variant="filled"
  />
);

const rowInputFields = props => {
  const { rowInd, classes, rowProps } = props;
  return (
    <div className={`${classes.row} ${classes.dataRow}`} key={rowInd}>
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
