import React from 'react';
import Typography from 'material-ui/Typography';

const RowCounter = ({ section, rows, dynamic, onUpdateCountClick }) => {
  const { currentRow, numRows } = section;

  const sectionStatusComponent = (
    <Typography type="title">
      {`${currentRow + 1} / ${numRows}`}
    </Typography>
  );

  if (!dynamic) {
    return(sectionStatusComponent);
  }

  let infoDiv = '';
  if (rows && rows[currentRow]) {
    const { fullText, quickText, stitches } = rows[currentRow];
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
      {sectionStatusComponent}
      <div>
        <button type="button" onClick={() => onUpdateCountClick("INCREMENT")}>+</button>
        <button type="button" onClick={() => onUpdateCountClick("DECREMENT")}>-</button>
        <button type="button" onClick={() => onUpdateCountClick("RESET")}>RESET</button>
      </div>
      {infoDiv}
    </div>
  );
};

export default RowCounter;
