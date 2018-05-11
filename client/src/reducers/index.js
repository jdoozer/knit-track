import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { handleActions } from 'redux-actions';
import patterns from 'reducers/patterns';
import sections from 'reducers/sections';
import rows from 'reducers/rows';
import ui from 'reducers/ui';
import { deleteSection, deletePattern } from 'reducers/crossEntities';

import { initialStateFull } from 'stateData/initialState';

const entitiesBySlice = combineReducers({ patterns, sections, rows, ui });

const crossEntities = handleActions({
  DELETE_PATTERN: (state, action) => deletePattern(state, action.payload),
  DELETE_SECTION: (state, action) => deleteSection(state, action.payload),
},
initialStateFull);

const rootReducer = reduceReducers(entitiesBySlice, crossEntities);

export default rootReducer;
