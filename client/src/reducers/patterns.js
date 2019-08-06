
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

  REQUEST_DATA: setLoading('patterns'),

  RECEIVE_DATA: mergeStateData('patterns'),

  RECEIVE_ERROR: setError('patterns'),

  ADD_SECTION: (state, action) => ({
    ...state,
    byId: addSection(state.byId, action)
  }),


}, initialStatePatterns);


export default patternsReducer;
