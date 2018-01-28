import { combineReducers } from 'redux';

const initialPattern = ({ patternId, title }) => ({
  title,
  patternId,
  sections: [],
  info: '<pattern info placeholder>',
});

const addPattern = (state, action) => {
  const { payload } = action;

  return {
    ...state,
    [payload.patternId]: initialPattern(payload),
  };
};

const deletePattern = (state, action) => {
  const patternIdToDelete = action.payload.patternId;

  return (
    Object.keys(state).reduce(
      (patterns, patternId) => {
        if (patternId !== patternIdToDelete) {
          patterns[patternId] = state[patternId];
        }
        return patterns;
      },
      {}
    )
  );
};

const addPatternId = (state, action) => (
  state.concat(action.payload.patternId)
);

const deletePatternId = (state, action) => (
  state.filter(pattId => pattId !== action.payload.patternId)
);

const addSection = (state, action) => {
  const { patternId, sectionId } = action.payload;
  const pattern = state[patternId];

  return {
    ...state,
    [patternId]: {
      ...pattern,
      sections: pattern.sections.concat(sectionId),
    },
  };
};

const deleteSection = (state, action) => {
  const { patternId, sectionIds } = action.payload;
  const pattern = state[patternId];

  if (!pattern.sections) return state;
  
  const updatedSections = pattern.sections.filter(
    sectId => !sectionIds.includes(sectId)
  );

  return {
    ...state,
    [patternId]: {
      ...pattern,
      sections: updatedSections,
    },
  };
};

const patternsById = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_PATTERN':
      return addPattern(state, action);
    case 'DELETE_PATTERN':
      return deletePattern(state, action);
    case 'ADD_SECTION':
      return addSection(state, action);
    case 'DELETE_SECTION':
      return deleteSection(state, action);
    default:
      return state;
  }
};

const allPatterns = (state = [], action) => {
  switch(action.type) {
    case 'ADD_PATTERN':
      return addPatternId(state, action);
    case 'DELETE_PATTERN':
      return deletePatternId(state, action);
    default:
      return state;
  }
};

const selectedPattern = (state = null, action) => {
  switch(action.type) {
    case 'SELECT_PATTERN':
      return action.payload.patternId;
    case 'DELETE_PATTERN':
      if (state === action.payload.patternId) {
        return null;
      }
      return state;
    default:
      return state;
  }
};

const patternsReducer = combineReducers({
  byId: patternsById,
  allIds: allPatterns,
  selected: selectedPattern,
});

export default patternsReducer;
