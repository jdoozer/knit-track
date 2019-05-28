import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { handleActions } from 'redux-actions';
import { connectRouter } from 'connected-react-router'
import patterns from 'reducers/patterns';
import sections from 'reducers/sections';
import rows from 'reducers/rows';
import { deleteSection, deletePattern } from 'reducers/crossEntities';

import { initialStateFull } from 'stateData/initialState';

const entitiesBySlice = history => combineReducers({
  router: connectRouter(history),
  patterns,
  sections,
  rows,
});

const crossEntities = handleActions({
  DELETE_PATTERN: (state, action) => deletePattern(state, action.payload),
  DELETE_SECTION: (state, action) => deleteSection(state, action.payload),
},
initialStateFull);

const createRootReducer = history => reduceReducers(entitiesBySlice(history), crossEntities);

export default history => createRootReducer(history);
