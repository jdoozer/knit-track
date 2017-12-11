import { combineReducers } from 'redux';
import patternsReducer from 'reducers/patterns';
import sectionsReducer from 'reducers/sections';
import rowsReducer from 'reducers/rows';

const knitTrack = combineReducers({
  patterns: patternsReducer,
  sections: sectionsReducer,
  rows: rowsReducer
});

export default knitTrack;
