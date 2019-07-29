
import { setLoading, setError, mergeStateData } from 'utils/reducerUtils';
import { handleActions } from 'redux-actions';

// const initialPattern = ({ patternId, title }) => ({
//   title,
//   patternId,
//   sectionIds: [],
//   info: '<pattern info placeholder>',
// });

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

  RECEIVE_PATTERN_DATA: mergeStateData('patterns'),

  PATTERNS_ERROR: setError('patterns'),

  ADD_SECTION_WITH_ROWS: (state, action) => ({
    ...state,
    byId: addSection(state.byId, action)
  }),


}, initialStatePatterns);


export default patternsReducer;
