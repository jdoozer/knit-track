import deleteFromState from 'utils/deleteFromState';
import addToState from 'utils/addToState';
import { initialStateNormal } from 'stateData/initialState';
import { handleActions } from 'redux-actions';


const rowsReducer = handleActions({
  ADD_ROW: (state, action) => (
    addToState(state, action.payload.rowId, action.payload)
  ),

  DELETE_ROW: (state, action) => (
    deleteFromState(state, action.payload.rowIds)
  ),
}, initialStateNormal);


export default rowsReducer;
