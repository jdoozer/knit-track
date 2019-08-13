import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import patterns from 'reducers/patterns';
import sections from 'reducers/sections';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  patterns,
  sections,
});

export default createRootReducer;
