import deleteFromState from 'utils/deleteFromState';
import addToState from 'utils/addToState';
import { initialStateNormal } from 'stateData/initialState';
import { handleActions } from 'redux-actions';


const rowsReducer = handleActions({
  ADD_ROW: (state, action) => (
    addToState(state, action.payload.rowId, action.payload)
  ),

  DELETE_ROW: (state, action) => (
    deleteFromState(state, action.payload)
  ),

  REQUEST_ROWS: (state, action) => ({
    ...state,
    isFetching: true
  }),

  RECEIVE_ROWS: (state, action) => ({
    ...state,
    isFetching: false,
    byId: {
      ...state.byId,
      ...action.payload.rows,
    },
    allIds: state.allIds.concat(Object.keys(action.payload.rows)),
    lastUpdated: action.payload.receivedAt
  }),

}, initialStateNormal);


export default rowsReducer;
