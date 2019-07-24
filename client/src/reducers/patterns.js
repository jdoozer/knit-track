import addItemToState from 'utils/addItemToState';
import { mergeStateData, setLoading, setError } from 'utils/reducerUtils';
import { handleActions } from 'redux-actions';

const initialPattern = ({ patternId, title }) => ({
  title,
  patternId,
  sectionIds: [],
  info: '<pattern info placeholder>',
});

const initialStatePatterns = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
};


const addSection = (state, action) => {
  const { section, sectionId } = action.payload;
  const patternId = section.patternId;
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

  REQUEST_PATTERN_DATA: setLoading('patterns'),

  RECEIVE_PATTERN_DATA: (state, action) => (
    mergeStateData(state, action.payload.patterns, action.payload.receivedAt)
  ),

  PATTERNS_ERROR: setError('patterns'),

  ADD_PATTERN: (state, action) => (
    addItemToState(state, action.payload.patternId, initialPattern(action.payload))
  ),

  ADD_SECTION_WITH_ROWS: (state, action) => ({
    ...state,
    byId: addSection(state.byId, action)
  }),


}, initialStatePatterns);


export default patternsReducer;
