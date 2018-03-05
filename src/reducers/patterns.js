import { combineReducers } from 'redux';

const initialPattern = ({ patternId, title }) => ({
  title,
  patternId,
  sectionIds: [],
  info: '<pattern info placeholder>',
});

const addPattern = (state, action) => {
  const { payload } = action;

  return {
    ...state,
    [payload.patternId]: initialPattern(payload),
  };
};

const addPatternId = (state, action) => (
  state.concat(action.payload.patternId)
);

const addSection = (state, action) => {
  const { patternId, sectionId } = action.payload;
  const pattern = state[patternId];

  return {
    ...state,
    [patternId]: {
      ...pattern,
      sectionIds: pattern.sectionIds.concat(sectionId),
    },
  };
};

const patternsById = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_PATTERN':
      return addPattern(state, action);
    case 'ADD_SECTION':
      return addSection(state, action);
    default:
      return state;
  }
};

const allPatterns = (state = [], action) => {
  switch(action.type) {
    case 'ADD_PATTERN':
      return addPatternId(state, action);
    default:
      return state;
  }
};

const patternsReducer = combineReducers({
  byId: patternsById,
  allIds: allPatterns,
});

export default patternsReducer;
