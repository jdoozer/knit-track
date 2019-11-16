import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import {
  update, addItem, deleteFromState, deleteItemsFromArray
} from 'utils/reducerUtils';
import sortByKey from 'utils/sortByKey';
import {
  initialState, itemMetaState, collectionMetaState
} from 'reducers/shared';


const patternsReducer = handleActions({

  RECEIVE_NEW_PATTERN: (state, action) => addItem(
    state,
    { ...action.payload.pattern, ...itemMetaState },
    'patternId',
    {
      ...collectionMetaState,
      lastCreatedId: action.payload.pattern.patternId
    }
  ),

  RECEIVE_NEW_SECTION: (state, action) => {

    const { patternId, sectionId } = action.payload.section;

    const sectionIds = state.byId[patternId].sectionIds;
    const updates = { sectionIds: [...new Set([...sectionIds, sectionId])] };

    return update(state, updates, patternId);

  },

  RECEIVE_DELETE_PATTERN_KEYS: (state, action) => deleteFromState(
    state,
    action.payload.patternId
  ),

  RECEIVE_DELETE_SECTION_KEYS: (state, action) => {

    const { patternId, sectionId } = action.payload;

    const sectionIds = state.byId[patternId].sectionIds;
    const updates = { sectionIds: deleteItemsFromArray(sectionIds, sectionId) };

    return update(state, updates, patternId);

  },

}, initialState);

export default patternsReducer;


// SELECTORS (named exports)
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

export const getPatternsLoading = state => state.loading;
export const getPatternsError = state => state.error;
export const getLastCreatedPatternId = state => state.lastCreatedId;


export const getPatternById = (state, patternId) => (
  getPatternsById(state)[patternId]
);

const getPatternField = (field, defaultVal) => (state, patternId) => {
  const pattern = getPatternById(state, patternId);
  if (pattern) {
    return pattern[field];
  }
  return defaultVal;
};

export const getPatternLoading = getPatternField('loading', false);
export const getPatternError = getPatternField('error', null);
export const getPatternLastAction = getPatternField('lastActionType', '');
