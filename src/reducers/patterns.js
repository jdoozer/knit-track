import addToState from 'utils/addToState';
import { initialStateNormal } from 'stateData/initialState';
import { handleActions } from 'redux-actions';


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

const patternsReducer = handleActions({

  ADD_PATTERN: (state, action) => (
    addToState(state, action.payload.patternId, initialPattern(action.payload))
  ),

  ADD_SECTION: (state, action) => ({
    ...state,
    byId: addSection(state.byId, action)
  }),

  REQUEST_PATTERNS: (state, action) => ({
    ...state,
    isFetching: true
  }),

  RECEIVE_PATTERNS: (state, action) => ({
    ...state,
    isFetching: false,
    byId: action.patterns,
    allIds: Object.keys(action.patterns),
    lastUpdated: action.receivedAt
  }),

}, initialStateNormal);


export default patternsReducer;
