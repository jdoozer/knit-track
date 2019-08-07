
import { updateState, updateItem, mergeItems } from 'utils/reducerUtils';
import { handleActions } from 'redux-actions';

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
};

const patternsReducer = handleActions({

  REQUEST_DATA: (state, action) => updateState(
    state,
    action.payload.dataTypes,
    'patterns',
    { loading: true }
  ),

  RECEIVE_ERROR: (state, action) => updateState(
    state,
    action.payload.dataTypes,
    'patterns',
    { loading: false, error: action.payload.error }
  ),

  RECEIVE_DATA: (state, action) => mergeItems(
    state,
    action.payload.patterns,
    { loading: false, error: null }
  ),

  RECEIVE_NEW_SECTION: (state, action) => {
    const { patternId, sectionId } = action.payload.section;
    const sectionIds = state.byId[patternId].sectionIds;

    return updateItem(
      state,
      patternId,
      { sectionIds: sectionIds.concat(sectionId) },
    );
  },

}, initialState);


export default patternsReducer;
