import React from 'react';

const RowCounter = ({ section, rows, dynamic, onUpdateCountClick }) => {
  const { currentRow, numRows } = section;

  const sectionStatus = `${currentRow + 1} / ${numRows}`;

  if (!dynamic) {
    return(
      <div>{sectionStatus}</div>
    );
  }

  let infoDiv = '';
  if (rows && rows[currentRow]) {
    const { fullText, quickText, stitches } = rows[currentRow];
    infoDiv =
      <div>
        {quickText && quickText.trim() ? <div>{quickText}</div> : ''}
        {`${fullText} [${stitches} sts]`}
      </div>;
    }

  return(
    <div>
      <div>{sectionStatus}</div>
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
