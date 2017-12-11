import { combineReducers } from 'redux';

function addRowEntry(state, action) {

  const { payload } = action;
  const { rowID } = payload;

  const row = payload;

  return {
    ...state,
    [rowID]: row,
  };
}

function rowsByID(state = {}, action) {
  switch(action.type) {
    case 'ADD_ROW':
      return addRowEntry(state, action);
    default:
      return state;
  }
}

function addRowID(state, action) {
  const { payload } = action;
  const { rowID } = payload;
  return state.concat(rowID);
}

function allRows(state = [], action) {
  switch(action.type) {
    case 'ADD_ROW':
      return addRowID(state, action);
    default:
      return state;
  }
}

const rowsReducer = combineReducers({
  byID: rowsByID,
  allIDs: allRows
});

export default rowsReducer;
