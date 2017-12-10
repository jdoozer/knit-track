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

export function addSection(patternID, title, rows) {
  const sectionID = generateID();
  return {
    type: 'ADD_SECTION',
    payload: {
      title,
      rows,
      patternID,
      sectionID
    }
  };
}

export function updateCount(sectionID, updateType) {
  return {
    type: 'UPDATE_COUNT',
    payload: {
      sectionID,
      updateType
    }
  };
}
