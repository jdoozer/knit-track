import deleteFromState from 'utils/deleteFromState';
import addItemToState from 'utils/addItemToState';
import { mergeStateData, setLoading } from 'utils/reducerUtils';
import { initialStateNormal } from 'stateData/initialState';
import { handleActions, combineActions } from 'redux-actions';

const rowsReducer = handleActions({

  [combineActions('REQUEST_PATTERN_EXPANDED', 'REQUEST_SECTION_EXPANDED')]: setLoading,

  REQUEST_PATTERN_DATA: setLoading('rows'),

  RECEIVE_PATTERN_DATA: (state, action) => (
    mergeStateData(state, action.payload.rows, action.payload.receivedAt)
  ),

  ADD_ROW: (state, action) => (
    addItemToState(state, action.payload.rowId, action.payload)
  ),

  DELETE_ROW: (state, action) => (
    deleteFromState(state, action.payload)
  ),

}, initialStateNormal);


export default rowsReducer;
