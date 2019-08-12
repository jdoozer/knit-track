import { updateState, mergeItems, addItem, updateItem } from 'utils/reducerUtils';
import { handleActions } from 'redux-actions';

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
};

const getNextRow = (updateType, { currentRow, numRows }) => {
  switch(updateType) {
    case 'INCREMENT':
      return (currentRow < numRows) ? currentRow + 1 : currentRow;
    case 'DECREMENT':
      return (currentRow > 1) ? currentRow - 1 : currentRow;
    case 'RESET':
      return 1;
    default:
      return currentRow;
  }
};

const sectionsReducer = handleActions({

  REQUEST_DATA: (state, action) => {
    const { dataTypes, id } = action.payload;
    if (id) {
      return updateItem(
        state,
        id,
        { loading: true }
      );
    }
    return updateState(
      state,
      { loading: true },
      dataTypes,
      'sections',
    );
  },

  RECEIVE_ERROR: (state, action) => {
    const { error, dataTypes, id } = action.payload;
    if (id) {
      return updateItem(
        state,
        id,
        { loading: false, error },
      );
    }
    return updateState(
      state,
      { loading: false, error },
      dataTypes,
      'sections'
    );
  },

  RECEIVE_DATA: (state, action) => mergeItems(
    state,
    action.payload.sections,
    { loading: false, error: null }
  ),

  RECEIVE_NEW_SECTION: (state, action) => addItem(
    state,
    {
      ...action.payload.section,
      loading: false,
      error: null
    },
    'sectionId',
  ),

  RECEIVE_UPDATED_SECTION: (state, action) => {
    const { sectionId, ...sectionUpdates } = action.payload.section;
    return updateItem(
      state,
      sectionId,
      { ...sectionUpdates, loading: false, error: null },
    );
  },

  UPDATE_ROW_COUNT_OPTIMISTIC: (state, action) => {
    const { error } = state;
    if (error) {
      return state;
    }
    const { updateType, sectionId } = action.payload;
    const section = state.byId[sectionId];
    if (section.error) {
      return state;
    }
    return updateItem(
      state,
      sectionId,
      { currentRow: getNextRow(updateType, section) }
    );
  },

}, initialState);


export default sectionsReducer;
