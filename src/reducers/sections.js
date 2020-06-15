import { handleActions } from 'redux-actions';
import { update, addItem, deleteFromState } from 'utils/reducerUtils';
import {
  initialState, itemMetaState, collectionMetaState
} from 'reducers/shared';


const getNextRow = (updateType, { currentRow, numRows }) => {
  switch(updateType) {
    case 'INCREMENT':
      return (currentRow < numRows) ? currentRow + 1 : currentRow;
    case 'DECREMENT':
      return (currentRow > 1) ? currentRow - 1 : currentRow;
    case 'RESET':
      return 1;
    default:
      if (typeof updateType === 'number'
          && updateType >= 1 && updateType <= numRows)
        return Math.floor(updateType);
      return currentRow;
  }
};

const sectionsReducer = handleActions({

   RECEIVE_NEW_SECTION: (state, action) => addItem(
     state,
     { ...action.payload.section, ...itemMetaState },
     'sectionId',
     collectionMetaState,
   ),

  RECEIVE_UPDATED_SECTION: (state, action) => {
    const { sectionId, ...sectionUpdates } = action.payload.section;
    return update(
      state,
      { ...sectionUpdates, ...itemMetaState },
      sectionId,
    );
  },

  UPDATE_ROW_COUNT_OPTIMISTIC: (state, action) => {
    const { updateType, sectionId } = action.payload;
    const section = state.byId[sectionId];
    if (section.error || section.loading) {
      return state;
    }
    return update(
      state,
      { currentRow: getNextRow(updateType, section) },
      sectionId
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
export const getSectionsLoading = state => state.loading;
export const getSectionsError = state => state.error;

export const getSectionById = (state, sectionId) => state.byId[sectionId];

export const getSectionsById = (state, sectionIds) => (
  sectionIds.map(sectionId => getSectionById(state, sectionId))
);

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
