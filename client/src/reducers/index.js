import { combineReducers } from 'redux';
import patterns from 'reducers/patterns';
import sections from 'reducers/sections';

const createRootReducer = combineReducers({
  patterns,
  sections,
});

export default createRootReducer;
