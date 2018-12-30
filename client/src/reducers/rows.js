import deleteFromState from 'utils/deleteFromState';
import addToState from 'utils/addToState';
import { initialStateNormal } from 'stateData/initialState';
import { handleActions } from 'redux-actions';

const setFetching = (state, action) => ({ ...state, isFetching: true });

const rowsReducer = handleActions({
  ADD_ROW: (state, action) => (
    addToState(state, action.payload.rowId, action.payload)
  ),

  DELETE_ROW: (state, action) => (
    deleteFromState(state, action.payload)
  ),

  REQUEST_PATTERN_EXPANDED: setFetching,
  REQUEST_SECTION_EXPANDED: setFetching,

  RECEIVE_PATTERN_EXPANDED: (state, action) => ({
    ...state,
    isFetching: false,
    byId: {
      ...state.byId,
      ...action.payload.rows,
    },
    allIds: state.allIds.concat(Object.keys(action.payload.rows)),
    lastUpdated: action.payload.receivedAt
  }),

  RECEIVE_SECTION_EXPANDED: (state, action) => ({
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
