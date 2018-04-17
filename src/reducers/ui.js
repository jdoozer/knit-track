import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const selectedPattern = handleActions({
  SELECT_PATTERN: (state, action) => action.payload.patternId,
  DELETE_PATTERN: (state, action) => (
    (state === action.payload.patternId) ? null : state
  )
}, null);

const sectionToEdit = handleActions({
  ADD_SECTION: (state, action) => action.payload.sectionId,
  CLEAR_SECTION: (state, action) => null,
}, null);

const uiReducer = combineReducers({
  selectedPattern,
  sectionToEdit
});

export default uiReducer;
