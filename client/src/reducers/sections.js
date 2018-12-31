import addItemToState from 'utils/addItemToState';
import mergeNormalized from 'utils/mergeNormalized';
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

  return {
    ...state,
    [sectionId]: {
      ...section,
      currentRow: getNextRow(updateType, section),
    },
  };
};

const getNextRow = (updateType, { currentRow, numRows }) => {
  switch(updateType) {
    case 'INCREMENT':
      return Math.min(currentRow + 1, numRows - 1);
    case 'DECREMENT':
      return Math.max(currentRow - 1, 0);
    case 'RESET':
      return 0;
    default:
      return currentRow;
  }
}

const sectionsReducer = handleActions({

  REQUEST_PATTERN_EXPANDED: setFetching,
  REQUEST_SECTION_EXPANDED: setFetching,

  RECEIVE_PATTERN_EXPANDED: (state, action) => (
    mergeNormalized(
      state,
      action.payload.sections,
      { isFetching: false, lastUpdated: action.payload.receivedAt }
    )
  ),

  RECEIVE_SECTION_EXPANDED: (state, action) => (
    addItemToState(
      state,
      action.payload.section.sectionId,
      action.payload.section,
      { isFetching: false, lastUpdated: action.payload.receivedAt }
    )
  ),

  ADD_SECTION: (state, action) => (
    addItemToState(state, action.payload.sectionId, initialSection(action.payload))
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
