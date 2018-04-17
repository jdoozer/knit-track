import addToState from 'utils/addToState';
import { initialStateNormal } from 'stateData/initialState';
import { handleActions } from 'redux-actions';


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


const sectionsReducer = handleActions({
  ADD_SECTION: (state, action) => (
    addToState(state, action.payload.sectionId, initialSection(action.payload))
  ),

  ADD_ROW: (state, action) => ({
    ...state,
    byId: addRow(state.byId, action)
  }),

  UPDATE_ROW_COUNT: (state, action) => ({
    ...state,
    byId: updateRowCount(state.byId, action)
  }),
}, initialStateNormal);


export default sectionsReducer;
