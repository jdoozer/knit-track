import generateID from 'uuid/v4';

export function addPattern(title) {
  const patternID = generateID();
  return {
    type: 'ADD_PATTERN',
    payload: {
      patternID,
      title
    }
  };
}

export function selectPattern(patternID) {
  return {
    type: 'SELECT_PATTERN',
    patternID
  };
}

export function addSection(patternID, title, numRows) {
  const sectionID = generateID();
  return {
    type: 'ADD_SECTION',
    payload: {
      title,
      numRows,
      patternID,
      sectionID
    }
  };
}

export function addRow(sectionID, rowInfo) {
  const rowID = generateID();
  return {
    type: 'ADD_ROW',
    payload: {
      sectionID,
      rowID,
      ...rowInfo
    }
  }
}

export function updateRowCount(sectionID, updateType) {
  return {
    type: 'UPDATE_ROW_COUNT',
    payload: {
      sectionID,
      updateType
    }
  };
}
