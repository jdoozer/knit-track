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

const sectionDefaultFields = {
  loading: false,
  error: null,
  lastActionType: ''
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
    const { dataTypes, id, actionType } = action.payload;
    let updates = { loading: true, lastActionType: '' };
    if (actionType) {
      updates.lastActionType = actionType;
    }
    if (dataTypes.includes('sections')) {
      if (id) {
        return updateItem(state, id, updates);
      }
      return updateState(state, updates);
    }
    return state;
  },

  RECEIVE_ERROR: (state, action) => {
    const { error, dataTypes, id } = action.payload;
    if (dataTypes.includes('sections')) {
      if (id) {
        return updateItem(state, id, { loading: false, error });
      }
      return updateState(state, { loading: false, error });
    }
    return state;
  },

  RECEIVE_DATA: (state, action) => mergeItems(
    state,
    action.payload.sections,
    { loading: false, error: null, lastActionType: '' },
    sectionDefaultFields
  ),

  RECEIVE_NEW_SECTION: (state, action) => addItem(
    state,
    {
      ...action.payload.section,
      ...sectionDefaultFields
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
      { ...sectionUpdates, ...sectionDefaultFields },
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

  CLEAR_LAST_CREATED: (state, action) => {
    if (action.payload.dataTypes.includes('sections')) {
      return updateState(state, { lastCreatedId: '' });
    }
    return state;
  },

  CLEAR_ERROR: (state, action) => {
    const { dataTypes, id } = action.payload;
    if (dataTypes.includes('sections')) {
      if (id) {
        return updateItem(state, id, { error: null, lastActionType: '' });
      }
      return updateState(state, { error: null, lastActionType: '' });
    }
    return state;
  },

}, initialState);

export default sectionsReducer;


// SELECTORS (named exports)
export const getSectionsLoading = state => state.loading;
export const getSectionsError = state => state.error;

export const getSectionById = (state, sectionId) => state.byId[sectionId];

export const getSectionsById = (state, sectionIds) => (
  sectionIds.map(sectionId => getSectionById(state, sectionId))
);

const getLastCreatedSectionId = state => state.lastCreatedId;

export const getPatternIdLastCreatedSection = state => {
  const sectionId = getLastCreatedSectionId(state);
  return sectionId ? state.byId[sectionId].patternId : '';
};

const getSectionField = (field, defaultVal) => (state, sectionId) => {
  const section = getSectionById(state, sectionId);
  if (section) {
    return section[field];
  }
  return defaultVal;
};

export const getSectionLoading = getSectionField('loading', false);
export const getSectionError = getSectionField('error', null);
export const getSectionLastAction = getSectionField('lastActionType', '');
