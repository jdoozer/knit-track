import addToState from 'utils/addToState';
import initialState from 'utils/initialState';

const initialSection = ({ title, sectionId, patternId, numRows }) => ({
  title,
  sectionId,
  patternId: patternId,
  numRows: Number(numRows),
  currentRow: 0,
  rowIds: [],
});

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

const sectionsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_SECTION':
      const { payload } = action;
      return addToState(state, payload.sectionId, initialSection(payload));
    case 'ADD_ROW':
      return {
        ...state,
        byId: addRow(state.byId, action)
      };
    case 'UPDATE_ROW_COUNT':
      return {
        ...state,
        byId: updateRowCount(state.byId, action)
      };
    default:
      return state;
  }
};

export default sectionsReducer;
