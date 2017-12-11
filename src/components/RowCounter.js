import React from 'react';

const RowCounter = ({ section, dynamic, onUpdateCountClick }) => {
  const { currentRow, numRows, rows } = section;

  let infoDiv = '';
  if (rows.length) {
    const { fullText, quickText, stitches } = rows[currentRow];
    infoDiv =
      <div>
        {quickText.trim() ? <div>{quickText}</div> : ''}
        {`${fullText} [${stitches} sts]`}
      </div>;
  }

  const sectionStatus = `${currentRow + 1} / ${numRows}`;

  if (dynamic) {
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
  } else {
    return(
      <div>{sectionStatus}</div>
    );
  }
};

export default RowCounter;
