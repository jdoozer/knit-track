import addItemToState from 'utils/addItemToState';
import mergeNormalized from 'utils/mergeNormalized';
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

  REQUEST_PATTERNS: setFetching,
  REQUEST_PATTERN_EXPANDED: setFetching,

  RECEIVE_PATTERNS: (state, action) => (
    mergeNormalized(
      state,
      action.payload.patterns,
      { isFetching: false, lastUpdated: action.payload.receivedAt }
    )
  ),

  RECEIVE_PATTERN_EXPANDED: (state, action) => (
    addItemToState(
      state,
      action.payload.pattern.patternId,
      action.payload.pattern,
      { isFetching: false, lastUpdated: action.payload.receivedAt }
    )
  ),

  ADD_PATTERN: (state, action) => (
    addItemToState(state, action.payload.patternId, initialPattern(action.payload))
  ),

  ADD_SECTION: (state, action) => ({
    ...state,
    byId: addSection(state.byId, action)
  }),


}, initialStateNormal);


export default patternsReducer;
