import { combineReducers } from 'redux';

const initialSection = ({ title, sectionId, patternId, numRows }) => ({
  title,
  sectionId,
  patternId: patternId,
  numRows: Number(numRows),
  currentRow: 0,
  rowIds: [],
});

const addSection = (state, action) => {
  const { payload } = action;

  return {
    ...state,
    [payload.sectionId]: initialSection(payload),
  };
};

const addRow = (state, action) => {
  const { sectionId, rowId } = action.payload;
  const section = state[sectionId];

  return {
    ...state,
    [sectionId] : {
      ...section,
      rowIds: section.rowIds.concat(rowId),
    },
  };
};

const updateRowCount = (state, action) => {
  const { sectionId, updateType } = action.payload;
  const section = state[sectionId];
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
    [sectionId]: {
      ...section,
      currentRow: nextRow,
    },
  };
};

const addSectionId = (state, action) => (
  state.concat(action.payload.sectionId)
);

const sectionsById = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_SECTION':
      return addSection(state, action);
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
      return addSectionId(state, action);
    default:
      return state;
  }
};

const selectedSection = (state = null, action) => {
  switch(action.type) {
    case 'ADD_SECTION':
      return action.payload.sectionId;
    case 'CLEAR_SECTION':
      return null;
    default:
      return state;
  }
};

const sectionsReducer = combineReducers({
  byId: sectionsById,
  allIds: allSections,
  sectionToEdit: selectedSection,
});

export default sectionsReducer;
