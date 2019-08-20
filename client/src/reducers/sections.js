import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import {
  updateState,
  mergeItems,
  addItem,
  updateItem,
  deleteFromState,
} from 'utils/reducerUtils';

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
    { loading: false, error: null }
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

  RECEIVE_DELETE_PATTERN_KEYS: (state, action) => deleteFromState(
    state,
    action.payload.sectionIds
  ),

  RECEIVE_DELETE_SECTION_KEYS: (state, action) => deleteFromState(
    state,
    action.payload.sectionId
  ),

}, initialState);

export default sectionsReducer;


// SELECTORS (named exports)

const getAllSectionsById = state => state.byId;
const getSectionById = (state, sectionId) => state.byId[sectionId];

export const getSectionLoading = createSelector(
  [getSectionById],
  section => section.loading
);

const getSectionError = createSelector(
  [getSectionById],
  section => section.error
);

export const getSectionErrorMsg = createSelector(
  [getSectionError],
  error => (error && error.message) ? error.message : ''
);

export const getCurrentRow = createSelector(
  [getSectionById],
  section => section.currentRow
);

export const getRowsFromSection = createSelector(
  [getSectionById],
  section => section.rows
);

export const getSectionsById = createSelector(
  [getAllSectionsById],
  (allSections) => ((sectionIds) => {
    const sections = sectionIds.map(sectionId => allSections[sectionId]);
    return sections.filter(section => section);
  })
);
