import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { handleActions } from 'redux-actions';
import patterns from 'reducers/patterns';
import sections from 'reducers/sections';
import rows from 'reducers/rows';
import ui from 'reducers/ui';
import { initialStateFull } from 'stateData/initialState';
import { deleteSection, deletePattern } from 'reducers/crossState';


const sliceReducers = combineReducers({ patterns, sections, rows, ui });

const crossSliceReducer = handleActions({
  DELETE_PATTERN: (state, action) => deletePattern(state, action.payload),
  DELETE_SECTION: (state, action) => deleteSection(state, action.payload),
},
initialStateFull);

const knitTrack = reduceReducers(sliceReducers, crossSliceReducer);

export default knitTrack;
