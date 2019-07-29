import addItemToState from 'utils/addItemToState';
import updateNormalized from 'utils/updateNormalized';
import { setLoading, mergeStateData } from 'utils/reducerUtils';
import { initialStateNormal } from 'stateData/initialState';
import { handleActions } from 'redux-actions';

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

  REQUEST_PATTERN_DATA: setLoading('sections'),

  RECEIVE_PATTERN_DATA: mergeStateData('sections'),

  ADD_SECTION: (state, action) => (
    addItemToState(
      state,
      action.payload.sectionId,
      { sectionId: action.payload.sectionId,
        ...action.payload.section }
    )
  ),

  ADD_SECTION_WITH_ROWS: (state, action) => {
    return addItemToState(
      state,
      action.payload.sectionId,
      { sectionId: action.payload.sectionId,
        rowIds: action.payload.rowIds,
        ...action.payload.section }
    )
  },

  UPDATE_ROW_COUNT: (state, action) => ({
    ...state,
    byId: updateRowCount(state.byId, action)
  }),

  UPDATE_SECTION: (state, action) => (
    updateNormalized(state, action.payload.sectionId, action.payload.updates)
  ),

}, initialStateNormal);


export default sectionsReducer;
