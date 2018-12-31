import deleteFromState from 'utils/deleteFromState';
import addItemToState from 'utils/addItemToState';
import mergeNormalized from 'utils/mergeNormalized';
import { initialStateNormal } from 'stateData/initialState';
import { handleActions } from 'redux-actions';

const setFetching = (state, action) => ({ ...state, isFetching: true });

const addRows = (state, action) => mergeNormalized(
  state,
  action.payload.rows,
  { isFetching: false, lastUpdated: action.payload.receivedAt }
);

const rowsReducer = handleActions({

  REQUEST_PATTERN_EXPANDED: setFetching,
  REQUEST_SECTION_EXPANDED: setFetching,

  RECEIVE_PATTERN_EXPANDED: addRows,
  RECEIVE_SECTION_EXPANDED: addRows,

  ADD_ROW: (state, action) => (
    addItemToState(state, action.payload.rowId, action.payload)
  ),

  DELETE_ROW: (state, action) => (
    deleteFromState(state, action.payload)
  ),

}, initialStateNormal);


export default rowsReducer;
