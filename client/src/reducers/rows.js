import deleteFromState from 'utils/deleteFromState';
import addItemToState from 'utils/addItemToState';
import mergeNormalized from 'utils/mergeNormalized';
import { initialStateNormal } from 'stateData/initialState';
import { handleActions } from 'redux-actions';

const setLoading = (state, action) => ({ ...state, loading: true });

const addRows = (state, action) => mergeNormalized(
  state,
  action.payload.rows,
  { loading: false, lastUpdated: action.payload.receivedAt }
);

const rowsReducer = handleActions({

  REQUEST_PATTERN_EXPANDED: setLoading,
  REQUEST_SECTION_EXPANDED: setLoading,

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
