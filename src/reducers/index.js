import { combineReducers } from 'redux';
<<<<<<< current
import reduceReducers from 'reduce-reducers';
import patterns from 'reducers/patterns';
import sections from 'reducers/sections';
import rows from 'reducers/rows';
import { deleteSection } from 'reducers/crossState';

//const sliceReducers = combineReducers({ patterns, sections, rows, ui });
const sliceReducers = combineReducers({ patterns, sections, rows });

const crossSliceReducer = (state, action) => {
  switch(action.type) {
    case 'DELETE_SECTION':
      return deleteSection(state, action.payload);
    default:
      return state;
  }
};

const knitTrack = reduceReducers(sliceReducers, crossSliceReducer);
=======
import { reduceReducers } from 'reduce-reducers';
import patternsReducer from 'reducers/patterns';
import sectionsReducer from 'reducers/sections';
import patternDeleteReducer from 'reducers/sections';

import rowsReducer from 'reducers/rows';

const mainReducer = combineReducers({
  patterns: patternsReducer,
  sections: sectionsReducer,
  rows: rowsReducer
});
>>>>>>> before discard

function deleteReducer(state, action) {
  // switch(action.type) {
  //   case "DELETE_SECTION": {
  //     return {
  //       patterns: patternsReducer,
  //       sections: sectionsReducer,
  //
  //       a: handleSpecialCaseForA(state.a, action, state.b),
  //
  //
  //       rows: rowsReducer
  //     }
  //   }
  // default:
  return state;
  // }
}

const knitTrack = reduceReducers(mainReducer, deleteReducer);

export default knitTrack;
