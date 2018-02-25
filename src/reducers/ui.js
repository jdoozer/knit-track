import { combineReducers } from 'redux';

const selectedPattern = (state = null, action) => {
  switch(action.type) {
    case 'SELECT_PATTERN':
      return action.payload.patternId;
    case 'DELETE_PATTERN':
      if (state === action.payload.patternId) {
        return null;
      }
      return state;
    case 'CLEAR_PATTERN':
      return null;
    default:
      return state;
  }
};

const sectionToEdit = (state = null, action) => {
  switch(action.type) {
    case 'ADD_SECTION':
      return action.payload.sectionId;
    case 'CLEAR_SECTION':
      return null;
    default:
      return state;
  }
};

const uiReducer = combineReducers({
  selectedPattern,
  sectionToEdit
});

export default uiReducer;
