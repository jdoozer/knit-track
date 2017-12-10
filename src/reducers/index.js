import { combineReducers } from 'redux';
import patternsReducer from 'reducers/patterns';
import sectionsReducer from 'reducers/sections';

const knitTrack = combineReducers({
  patterns: patternsReducer,
  sections: sectionsReducer
});

export default knitTrack;
