import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const selectedPattern = handleActions({
  SELECT_PATTERN: (state, action) => action.payload,
  DELETE_PATTERN: (state, action) => (state === action.payload) ? null : state,
}, null);

const sectionToEdit = handleActions({
  ADD_SECTION: (state, action) => action.payload,
  CLEAR_SECTION: (state, action) => null,
}, null);

const uiReducer = combineReducers({
  selectedPattern,
  sectionToEdit
});

export default uiReducer;
