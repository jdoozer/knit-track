import generateID from 'uuid/v4';

// PATTERN ACTIONS
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
    payload: { patternID },
  };
}

export function deletePattern(patternID) {
  return {
    type: 'DELETE_PATTERN',
    payload: { patternID },
  };
}

// SECTION ACTIONS
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


// ROW ACTIONS
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
