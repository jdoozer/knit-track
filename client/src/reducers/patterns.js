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

  REQUEST_DATA: (state, action) => updateState(
    state,
    { loading: true },
    action.payload.dataTypes,
    'patterns',
  ),

  RECEIVE_ERROR: (state, action) => updateState(
    state,
    { loading: false, error: action.payload.error },
    action.payload.dataTypes,
    'patterns',
  ),

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

  CLEAR_LAST_CREATED: (state, action) => updateState(
    state,
    { lastCreatedId: '' },
    action.payload.dataTypes,
    'patterns'
  ),

  CLEAR_ERROR: (state, action) => updateState(
    state,
    { error: null, loading: false },
    action.payload.dataTypes,
    'patterns'
  )

}, initialState);

export default patternsReducer;


// SELECTORS (named exports)
export const getPatternsLoading = state => state.loading;

export const getPatternsErrorMsg = state => (
  (state.error && state.error.message) ? state.error.message : ''
);

export const getPatternsErrorCode = state => (
  (state.error && state.error.status) ? state.error.status : 200
);

const getPatternsById = state => state.byId;
const getPatternTitles = createSelector(
  getPatternsById,
  patternsById => Object.keys(patternsById).map(
    key => ({ patternId: key, title: patternsById[key].title })
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
