import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import {
  updateState,
  updateItem,
  addItem,
  mergeItems,
  deleteFromState,
  deleteItemsFromArray,
} from 'utils/reducerUtils';
import sortByKey from 'utils/sortByKey';

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
  lastCreatedId: ''
};

const patternsReducer = handleActions({

  REQUEST_DATA: (state, action) => {
    const { dataTypes, id } = action.payload;
    if (dataTypes.includes('patterns')) {
      if (id) {
        return updateItem(state, id, { loading: true });
      }
      return updateState(state, { loading: true });
    }
    return state;
  },

  RECEIVE_ERROR: (state, action) => {
    const { error, dataTypes, id } = action.payload;
    if (dataTypes.includes('patterns')) {
      if (id) {
        return updateItem(state, id, { loading: false, error });
      }
      return updateState(state, { loading: false, error });
    }
    return state;
  },

  RECEIVE_DATA: (state, action) => mergeItems(
    state,
    action.payload.patterns,
    { loading: false, error: null }
  ),

  RECEIVE_NEW_PATTERN: (state, action) => addItem(
    state,
    action.payload.pattern,
    'patternId',
    {
      loading: false,
      error: null,
      lastCreatedId: action.payload.pattern.patternId
    }
  ),

  RECEIVE_NEW_SECTION: (state, action) => {
    const { patternId, sectionId } = action.payload.section;
    const sectionIds = state.byId[patternId].sectionIds;

    return updateItem(
      state,
      patternId,
      { sectionIds: sectionIds.concat(sectionId) },
      { loading: false, error: null }
    );
  },

  RECEIVE_DELETE_PATTERN_KEYS: (state, action) => deleteFromState(
    state,
    action.payload.patternId
  ),

  RECEIVE_DELETE_SECTION_KEYS: (state, action) => {
    const { patternId, sectionId } = action.payload;
    const sectionIds = state.byId[patternId].sectionIds;

    return updateItem(
      state,
      patternId,
      { sectionIds: deleteItemsFromArray(sectionIds, sectionId) },
    );
  },

  CLEAR_LAST_CREATED: (state, action) => {
    if (action.payload.dataTypes.includes('patterns')) {
      return updateState(state, { lastCreatedId: '' });
    }
    return state;
  },

  CLEAR_ERROR: (state, action) => {
    const { dataTypes, id } = action.payload;
    if (dataTypes.includes('patterns')) {
      if (id) {
        return updateItem(state, id, { error: null });
      }
      return updateState(state, { error: null });
    }
    return state;
  },

}, initialState);

export default patternsReducer;


// SELECTORS (named exports)
export const getPatternsLoading = state => state.loading;

export const getPatternsError = state => state.error;

export const getPatternsErrorCode = createSelector(
  getPatternsError,
  error => ((error && error.status) ? error.status : 200)
);

const getPatternsById = state => state.byId;
const getPatternIds = state => state.allIds;
const getPatternTitles = createSelector(
  getPatternsById,
  getPatternIds,
  (patternsById, patternIds) => patternIds.map(
    patternId => ({ patternId, title: patternsById[patternId].title })
  )
);

export const getPatternTitlesSorted = createSelector(
  getPatternTitles,
  patternTitles => sortByKey(patternTitles, 'title')
);

export const getPatternById = (state, patternId) => (
  getPatternsById(state)[patternId]
);

export const getLastCreatedPatternId = state => state.lastCreatedId;
