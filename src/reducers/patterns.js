import { combineReducers } from 'redux';

const initialPattern = ({ patternID, title }) => ({
  title,
  patternID,
  sections: [],
  info: '<pattern info placeholder>',
});

const addPattern = (state, action) => {
  const { payload } = action;

  return {
    ...state,
    [payload.patternID]: initialPattern(payload),
  };
};

const deletePattern = (state, action) => {
  const { patternIDToDelete } = action.payload;

  return (
    Object.keys(state).reduce(
      (patterns, patternID) => {
        if (patternID !== patternIDToDelete) {
          patterns[patternID] = state[patternID];
        }
        return patterns;
      },
      {}
    )
  );
};

const addPatternID = (state, action) => (
  state.concat(action.payload.patternID)
);

const deletePatternID = (state, action) => (
  state.filter(pattID => pattID !== action.payload.patternID)
);

const addSection = (state, action) => {
  const { patternID, sectionID } = action.payload;
  const pattern = state[patternID];

  return {
    ...state,
    [patternID]: {
      ...pattern,
      sections: pattern.sections.concat(sectionID),
    },
  };
};

const patternsByID = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_PATTERN':
      return addPattern(state, action);
    case 'DELETE_PATTERN':
      return deletePattern(state, action);
    case 'ADD_SECTION':
      return addSection(state, action);
    default:
      return state;
  }
};

const allPatterns = (state = [], action) => {
  switch(action.type) {
    case 'ADD_PATTERN':
      return addPatternID(state, action);
    case 'DELETE_PATTERN':
      return deletePatternID(state, action);
    default:
      return state;
  }
};

const selectedPattern = (state = null, action) => {
  switch(action.type) {
    case 'SELECT_PATTERN':
      return action.payload.patternID;
    case 'DELETE_PATTERN':
      if (state === action.payload.patternID) {
        return null;
      }
      return state;
    default:
      return state;
  }
};

const patternsReducer = combineReducers({
  byID: patternsByID,
  allIDs: allPatterns,
  selected: selectedPattern,
});

export default patternsReducer;
