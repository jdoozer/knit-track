import { combineReducers } from 'redux';

const initialSection = ({ sectionId, title, numRows }) => ({
  title,
  sectionId,
  numRows: Number(numRows),
  currentRow: 0,
  rows: [],
});

const addSection = (state, action) => {
  const { payload } = action;

  return {
    ...state,
    [payload.sectionId]: initialSection(payload),
  };
};

const deleteSections = (state, action) => {
  const sectionIdsToDelete = action.payload.sectionIds;

  return (
    Object.keys(state).reduce(
      (sections, sectionId) => {
        if (sectionIdsToDelete && !sectionIdsToDelete.includes(sectionId)) {
          sections[sectionId] = state[sectionId];
        }
        return sections;
      },
      {}
    )
  );
};


const addRow = (state, action) => {
  const { sectionId, rowId } = action.payload;
  const section = state[sectionId];

  return {
    ...state,
    [sectionId] : {
      ...section,
      rows: section.rows.concat(rowId),
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

const deleteSectionIds = (state, action) => (
  state.filter(sectionId => !action.payload.sectionIds.includes(sectionId))
);

const sectionsById = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_SECTION':
      return addSection(state, action);
    case 'DELETE_SECTION':
      return deleteSections(state, action);
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
    case 'DELETE_SECTION':
      return deleteSectionIds(state, action);
    default:
      return state;
  }
};

const selectedSection = (state = null, action) => {
  switch(action.type) {
    case 'ADD_SECTION':
      return action.payload.sectionId;
    case 'DELETE_SECTION':
      if (action.payload.sectionIds.includes(state)) {
        return null;
      }
      return state;
    default:
      return state;
  }
};

const sectionsReducer = combineReducers({
  byId: sectionsById,
  allIds: allSections,
  selected: selectedSection,
});

export default sectionsReducer;
