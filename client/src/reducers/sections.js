import addItemToState from 'utils/addItemToState';
import mergeNormalized from 'utils/mergeNormalized';
import { initialStateNormal } from 'stateData/initialState';
import { handleActions, combineActions } from 'redux-actions';

const initialSection = ({ title, sectionId, patternId, numRows }) => ({
  title,
  sectionId,
  patternId,
  numRows: Number(numRows),
  currentRow: 0,
  rowIds: [],
});

const setLoading = (state, action) => ({ ...state, loading: true });

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

  [combineActions('REQUEST_PATTERN_EXPANDED', 'REQUEST_SECTION_EXPANDED')]: setLoading,

  RECEIVE_PATTERN_DATA: (state, action) => {
    if (action.payload.section) {
      return addItemToState(
        state,
        action.payload.section.patternId,
        action.payload.section,
        { loading: false, lastUpdated: action.payload.receivedAt }
      );
    } else if (action.payload.sections) {
      return mergeNormalized(
        state,
        action.payload.sections,
        { loading: false, lastUpdated: action.payload.receivedAt }
      );
    } else if (action.payload.rows) {
      return {
        ...state,
        byId: addRow(state.byId, action)
      }
    }
    return state;
  },

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
