import { combineReducers } from 'redux';

const initialPattern = (payload) => {
  const { patternID, title } = payload;

  return {
    title,
    patternID,
    sections: [],
    info: '<pattern info placeholder>',
  };
};

function addPattern(state, action) {

  const { payload } = action;

  const pattern = initialPattern(payload);

  return {
    ...state,
    [payload.patternID]: pattern
  };
}

function addSection(state, action) {

  const { patternID, sectionID } = action.payload;

  const pattern = state[patternID];

  return {
    ...state,
    [patternID] : {
      ...pattern,
      sections: pattern.sections.concat(sectionID)
    }
  };
}

function patternsByID(state = {}, action) {
  switch(action.type) {
    case 'ADD_PATTERN':
      return addPattern(state, action);
    case 'ADD_SECTION':
        return addSection(state, action);
    default:
      return state;
  }
}

function addPatternID(state, action) {
  return state.concat(action.payload.patternID);
}

function allPatterns(state = [], action) {
  switch(action.type) {
    case 'ADD_PATTERN':
      return addPatternID(state, action);
    default:
      return state;
  }
}

function selectedPattern(state = null, action) {
  switch(action.type) {
    case 'SELECT_PATTERN':
      return action.patternID;
    default:
      return state;
  }
}

const patternsReducer = combineReducers({
  byID: patternsByID,
  allIDs: allPatterns,
  selected: selectedPattern,
});

export default patternsReducer;
