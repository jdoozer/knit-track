import addToState from 'utils/addToState';
import { initialStateNormal } from 'stateData/initialState';
import { handleActions } from 'redux-actions';

const initialSection = ({ title, sectionId, patternId, numRows }) => ({
  title,
  sectionId,
  patternId,
  numRows: Number(numRows),
  currentRow: 0,
  rowIds: [],
});

const setFetching = (state, action) => ({ ...state, isFetching: true });

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

  REQUEST_PATTERN_EXPANDED: setFetching,
  REQUEST_SECTION_EXPANDED: setFetching,

  RECEIVE_PATTERN_EXPANDED: (state, action) => ({
    ...state,
    isFetching: false,
    byId: {
      ...state.byId,
      ...action.payload.sections,
    },
    allIds: state.allIds.concat(Object.keys(action.payload.sections)),
    lastUpdated: action.payload.receivedAt
  }),

  RECEIVE_SECTION_EXPANDED: (state, action) => ({
    ...state,
    isFetching: false,
    byId: {
      ...state.byId,
      [action.payload.section.sectionId]: {
        ...action.payload.section
      },
    },
    allIds: state.allIds.concat(action.payload.section.sectionId),
    lastUpdated: action.payload.receivedAt
  }),

}, initialStateNormal);


export default sectionsReducer;
