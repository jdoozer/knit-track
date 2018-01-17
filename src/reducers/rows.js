import { combineReducers } from 'redux';

const addRowEntry = (state, action) => {
  const row = action.payload;

  return {
    ...state,
    [row.rowId]: row,
  };
};

const addRowId = (state, action) => (
  state.concat(action.payload.rowId)
);

const rowsById = (state = {}, action) => {
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
      return addRowId(state, action);
    default:
      return state;
  }
};

const rowsReducer = combineReducers({
  byId: rowsById,
  allIds: allRows,
});

export default rowsReducer;
