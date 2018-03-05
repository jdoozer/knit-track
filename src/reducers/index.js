import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import patterns from 'reducers/patterns';
import sections from 'reducers/sections';
import rows from 'reducers/rows';
import ui from 'reducers/ui';
import { deleteSection, deletePattern } from 'reducers/crossState';

const sliceReducers = combineReducers({ patterns, sections, rows, ui });

const crossSliceReducer = (state, action) => {
  switch(action.type) {
    case 'DELETE_PATTERN':
      return deletePattern(state, action.payload);
    case 'DELETE_SECTION':
      return deleteSection(state, action.payload);
    default:
      return state;
  }
};

const knitTrack = reduceReducers(sliceReducers, crossSliceReducer);

export default knitTrack;
