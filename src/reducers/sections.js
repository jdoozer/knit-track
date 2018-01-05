import { combineReducers } from 'redux';

const initialSection = ({ sectionID, title, numRows }) => ({
  title,
  sectionID,
  numRows: Number(numRows),
  currentRow: 0,
  rows: [],
});

const addSectionEntry = (state, action) => {
  const { payload } = action;

  return {
    ...state,
    [payload.sectionID]: initialSection(payload),
  };
};

const addRow = (state, action) => {
  const { sectionID, rowID } = action.payload;
  const section = state[sectionID];

  return {
    ...state,
    [sectionID] : {
      ...section,
      rows: section.rows.concat(rowID),
    },
  };
};

const updateRowCount = (state, action) => {
  const { sectionID, updateType } = action.payload;
  const section = state[sectionID];
  const { currentRow, numRows } = section;

  let nextRow = currentRow;

  switch(updateType) {
    case 'INCREMENT':
      nextRow = Math.min(currentRow + 1, numRows - 1);
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
      currentRow: nextRow,
    },
  };
};

const addSectionID = (state, action) => (
  state.concat(action.payload.sectionID)
);

const sectionsByID = (state = {}, action) => {
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
};

const allSections = (state = [], action) => {
  switch(action.type) {
    case 'ADD_SECTION':
      return addSectionID(state, action);
    default:
      return state;
  }
};

const selectedSection = (state = null, action) => {
  switch(action.type) {
    case 'ADD_SECTION':
      return action.payload.sectionID;
    default:
      return state;
  }
};

const sectionsReducer = combineReducers({
  byID: sectionsByID,
  allIDs: allSections,
  selected: selectedSection,
});

export default sectionsReducer;
