function initialSectionFormState(section, numRowsDefault, initialRow) {
  const { title, numRows, rows } = section || {};

  const numRowsStart = numRows || numRowsDefault;

  let rowData = [];
  for (let rowNum = 1; rowNum <= numRowsStart; rowNum++) {
    if (rows && rows[rowNum])
      rowData.push({ ...rows[rowNum] });
    else
      rowData.push({ ...initialRow });
  }

  return {
    title: title || '',
    numRowsInput: numRowsStart,
    numRows: numRowsStart,
    rowData,
  }
}

export default initialSectionFormState;