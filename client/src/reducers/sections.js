import { updateState, mergeItems, addItem } from 'utils/reducerUtils';
import { handleActions } from 'redux-actions';

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
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
      return Math.min(currentRow + 1, numRows);
    case 'DECREMENT':
      return Math.max(currentRow - 1, 1);
    case 'RESET':
      return 1;
    default:
      return currentRow;
  }
}

const sectionsReducer = handleActions({

  REQUEST_DATA: (state, action) => updateState(
    state,
    action.payload.dataTypes,
    'sections',
    { loading: true }
  ),

  RECEIVE_ERROR: (state, action) => updateState(
    state,
    action.payload.dataTypes,
    'sections',
    { loading: false, error: action.payload.error }
  ),

  RECEIVE_DATA: (state, action) => mergeItems(
    state,
    action.payload.sections,
    { loading: false, error: null }
  ),

  RECEIVE_NEW_SECTION: (state, action) => addItem(
    state,
    action.payload.section,
    'sectionId',
    { loading: false, error: null }
  ),

  UPDATE_ROW_COUNT: (state, action) => ({
    ...state,
    byId: updateRowCount(state.byId, action)
  }),

}, initialState);


export default sectionsReducer;
