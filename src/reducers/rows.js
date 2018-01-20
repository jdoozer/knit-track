import { combineReducers } from 'redux';

const addRow = (state, action) => {
  const row = action.payload;

  return {
    ...state,
    [row.rowId]: row,
  };
};

const deleteRows = (state, action) => {
  const rowIdsToDelete = action.payload.rowIds;

  return (
    Object.keys(state).reduce(
      (rows, rowId) => {
        if (rowIdsToDelete && !rowIdsToDelete.includes(rowId)) {
          rows[rowId] = state[rowId];
        }
        return rows;
      },
      {}
    )
  );
};

const addRowId = (state, action) => (
  state.concat(action.payload.rowId)
);

const deleteRowIds = (state, action) => (
  state.filter(rowId => !action.payload.rowIds.includes(rowId))
);


const rowsById = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_ROW':
      return addRow(state, action);
    case 'DELETE_ROW':
      return deleteRows(state, action);
    default:
      return state;
  }
};

const allRows = (state = [], action) => {
  switch(action.type) {
    case 'ADD_ROW':
      return addRowId(state, action);
    case 'DELETE_ROW':
      return deleteRowIds(state, action);
    default:
      return state;
  }
};

const rowsReducer = combineReducers({
  byId: rowsById,
  allIds: allRows,
});

export default rowsReducer;
