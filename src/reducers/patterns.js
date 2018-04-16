import addToState from 'utils/addToState';
import initialState from 'utils/initialState';

const initialPattern = ({ patternId, title }) => ({
  title,
  patternId,
  sectionIds: [],
  info: '<pattern info placeholder>',
});

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

const patternsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_PATTERN':
      const { payload } = action;
      return addToState(state, payload.patternId, initialPattern(payload));
    case 'ADD_SECTION':
      return {
        ...state,
        byId: addSection(state.byId, action)
      };
    default:
      return state;
  }
};

export default patternsReducer;
