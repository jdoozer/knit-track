import deleteFromState from 'utils/deleteFromState';
import addToState from 'utils/addToState';
import initialState from 'utils/initialState';

const rowsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_ROW':
      return addToState(state, action.payload.rowId, action.payload);
    case 'DELETE_ROW':
      return deleteFromState(state, action.payload.rowIds);
    default:
      return state;
  }
};

export default rowsReducer;
