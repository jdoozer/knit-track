import { handleActions } from 'redux-actions';
import {
  updateState,
  updateItem,
  addItem,
  mergeItems,
  deleteFromState,
} from 'utils/reducerUtils';

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
  lastCreatedId: ''
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
    {
      loading: false,
      error: null,
      lastCreatedId: action.payload.section.sectionId
    }

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
    const { updateType, sectionId } = action.payload;
    const section = state.byId[sectionId];
    if (section.error || section.loading) {
      return state;
    }
    return updateItem(
      state,
      sectionId,
      { currentRow: getNextRow(updateType, section) }
    );
  },

  RECEIVE_DELETE_PATTERN_KEYS: (state, action) => deleteFromState(
    state,
    action.payload.sectionIds
  ),

  RECEIVE_DELETE_SECTION_KEYS: (state, action) => deleteFromState(
    state,
    action.payload.sectionId
  ),

  CLEAR_LAST_CREATED: (state, action) => updateState(
    state,
    { lastCreatedId: '' },
    action.payload.dataTypes,
    'sections'
  ),

  CLEAR_ERROR: (state, action) => {
    const { dataTypes, id } = action.payload;
    if (id) {
      return updateItem(state, id, { error: null });
    }
    return updateState(
      state, { error: null }, dataTypes, 'sections'
    );
  }

}, initialState);

export default sectionsReducer;


// SELECTORS (named exports)
export const getSectionsLoading = state => state.loading;
export const getSectionsError = state => state.error;

const getSectionById = (state, sectionId) => state.byId[sectionId];

export const getSectionsById = (state, sectionIds) => (
  sectionIds.map(sectionId => getSectionById(state, sectionId))
);

const getLastCreatedSectionId = state => state.lastCreatedId;

export const getPatternIdLastCreatedSection = state => {
  const sectionId = getLastCreatedSectionId(state);
  return sectionId ? state.byId[sectionId].patternId : '';
};
