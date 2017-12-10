import { combineReducers } from 'redux';

const initialPattern = (payload) => {
  const { patternID, title } = payload;

  return {
    title: title,
    sections: [],
    info: `here's some pattern info`,
    patternID: patternID
  };
};

function addPattern(state, action) {

  const { payload } = action;
  const { patternID } = payload;

  const pattern = initialPattern(payload);

  return {
    ...state,
    [patternID]: pattern
  };
}

function addSection(state, action) {
  const { payload } = action;
  const { patternID, sectionID } = payload;

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
  const { payload } = action;
  const { patternID } = payload;
  return state.concat(patternID);
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
