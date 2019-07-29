import deleteFromState from 'utils/deleteFromState';
import addItemToState from 'utils/addItemToState';
import { setLoading, mergeStateData } from 'utils/reducerUtils';
import { initialStateNormal } from 'stateData/initialState';
import { handleActions } from 'redux-actions';

const rowsReducer = handleActions({

  REQUEST_PATTERN_DATA: setLoading('rows'),

  RECEIVE_PATTERN_DATA: mergeStateData('rows'),

  ADD_ROW: (state, action) => (
    addItemToState(state, action.payload.rowId, action.payload)
  ),

  // TODO: this is pretty inefficient, should proably use mergeStatData instead
  ADD_SECTION_WITH_ROWS: (state, action) => {
    const { rows, rowIds } = action.payload;
    for (let i = 0; i < rowIds.length; i++) {
      state = addItemToState(
        state,
        rowIds[i],
        { rowId: rowIds[i],
          ...rows[i] }
      );
    };
    return state;
  },

  DELETE_ROW: (state, action) => (
    deleteFromState(state, action.payload)
  ),

}, initialStateNormal);


export default rowsReducer;
