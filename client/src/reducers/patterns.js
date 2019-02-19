import addItemToState from 'utils/addItemToState';
import { mergeStateData, setLoading } from 'utils/reducerUtils';
import { initialStateNormal } from 'stateData/initialState';
import { handleActions, combineActions } from 'redux-actions';

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

  REQUEST_PATTERN_DATA: setLoading('patterns'),

  RECEIVE_PATTERN_DATA: (state, action) => (
    mergeStateData(state, action.payload.patterns, action.payload.receivedAt)
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
