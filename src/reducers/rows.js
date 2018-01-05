import { combineReducers } from 'redux';

const addRowEntry = (state, action) => {
  const row = action.payload;

  return {
    ...state,
    [row.rowID]: row,
  };
};

const addRowID = (state, action) => (
  state.concat(action.payload.rowID)
);

const rowsByID = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_ROW':
      return addRowEntry(state, action);
    default:
      return state;
  }
};

const allRows = (state = [], action) => {
  switch(action.type) {
    case 'ADD_ROW':
      return addRowID(state, action);
    default:
      return state;
  }
};

const rowsReducer = combineReducers({
  byID: rowsByID,
  allIDs: allRows,
});

export default rowsReducer;
