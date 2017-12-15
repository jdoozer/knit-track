import { combineReducers } from 'redux';

const initialSection = (payload) => {

  const { sectionID, title, numRows } = payload;

  return {
    title,
    sectionID,
    numRows,
    rows: [],
    currentRow: 0,
  };

};

function addSectionEntry(state, action) {

  const { payload } = action;

  const section = initialSection(payload);

  return {
    ...state,
    [payload.sectionID]: section,
  };
}

function addRow(state, action) {
  const { sectionID, payload } = action;
  const { rowID } = payload;
  const section = state[sectionID];

  return {
    ...state,
    [sectionID] : {
      ...section,
      rows: section.rows.concat(rowID)
    }
  };
}

function updateRowCount(state, action) {
  const { sectionID, updateType } = action.payload;
  const section = state[sectionID];

  const currentRow = section.currentRow;
  const lastRow = section.numRows;
  let nextRow = currentRow;

  switch(updateType) {
    case 'INCREMENT':
      nextRow = Math.min(currentRow + 1, lastRow - 1);
      break;
    case 'DECREMENT':
      nextRow = Math.max(currentRow - 1, 0);
      break;
    case 'RESET':
      nextRow = 0;
      break;
    default:
      break;
  }

  return {
    ...state,
    [sectionID]: {
      ...section,
      currentRow: nextRow
    }
  };
}

function sectionsByID(state = {}, action) {
  switch(action.type) {
    case 'ADD_SECTION':
      return addSectionEntry(state, action);
    case 'ADD_ROW':
      return addRow(state, action);
    case 'UPDATE_ROW_COUNT':
      return updateRowCount(state, action);
    default:
      return state;
  }
}

function addSectionID(state, action) {
  return state.concat(action.payload.sectionID);
}

function allSections(state = [], action) {
  switch(action.type) {
    case 'ADD_SECTION':
      return addSectionID(state, action);
    default:
      return state;
  }
}

function selectedSection(state = null, action) {
  switch(action.type) {
    case 'ADD_SECTION':
      return action.payload.sectionID;
    default:
      return state;
  }
}

const sectionsReducer = combineReducers({
  byID: sectionsByID,
  allIDs: allSections,
  selected: selectedSection
});

export default sectionsReducer;
