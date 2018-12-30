import addToState from 'utils/addToState';
import { initialStateNormal } from 'stateData/initialState';
import { handleActions } from 'redux-actions';


const initialPattern = ({ patternId, title }) => ({
  title,
  patternId,
  sectionIds: [],
  info: '<pattern info placeholder>',
});

const setFetching = (state, action) => ({ ...state, isFetching: true });

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

const patternsReducer = handleActions({

  ADD_PATTERN: (state, action) => (
    addToState(state, action.payload.patternId, initialPattern(action.payload))
  ),

  ADD_SECTION: (state, action) => ({
    ...state,
    byId: addSection(state.byId, action)
  }),

  REQUEST_PATTERNS: setFetching,
  REQUEST_PATTERN_EXPANDED: setFetching,

  RECEIVE_PATTERNS: (state, action) => ({
    ...state,
    isFetching: false,
    byId: {
      ...state.byId,
      ...action.payload.patterns.byId,
    },
    allIds: state.allIds.concat(action.payload.patterns.allIds),
    lastUpdated: action.payload.receivedAt
  }),

  RECEIVE_PATTERN_EXPANDED: (state, action) => ({
    ...state,
    isFetching: false,
    byId: {
      ...state.byId,
      [action.payload.pattern.patternId]: {
        ...action.payload.pattern
      },
    },
    allIds: state.allIds.concat(action.payload.pattern.patternId),
    lastUpdated: action.payload.receivedAt
  }),

}, initialStateNormal);


export default patternsReducer;
