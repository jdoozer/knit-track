import generateId from 'uuid/v4';

// PATTERN ACTIONS
export function addPattern(title) {
  const patternId = generateId();
  return {
    type: 'ADD_PATTERN',
    payload: {
      patternId,
      title
    }
  };
}

export function selectPattern(patternId) {
  return {
    type: 'SELECT_PATTERN',
    payload: { patternId },
  };
}

export function deletePattern(patternId) {
  return {
    type: 'DELETE_PATTERN',
    payload: { patternId },
  };
}

// SECTION ACTIONS
export function addSection(patternId, title, numRows) {
  const sectionId = generateId();
  return {
    type: 'ADD_SECTION',
    payload: {
      title,
      numRows,
      patternId,
      sectionId
    }
  };
}

export function deleteSection(patternId, sectionIds) {
  return {
    type: 'DELETE_SECTION',
    payload: { patternId, sectionIds },
  };
}

// ROW ACTIONS
export function addRow(sectionId, rowInfo) {
  const rowId = generateId();
  return {
    type: 'ADD_ROW',
    payload: {
      sectionId,
      rowId,
      ...rowInfo
    }
  }
}

export function updateRowCount(sectionId, updateType) {
  return {
    type: 'UPDATE_ROW_COUNT',
    payload: {
      sectionId,
      updateType
    }
  };
}

export function deleteRow(rowIds) {
  return {
    type: 'DELETE_ROW',
    payload: { rowIds },
  };
}
