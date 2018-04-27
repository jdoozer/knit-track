import generateId from 'uuid/v4';
import { createAction } from 'redux-actions';
import fetch from 'cross-fetch';

const MOCK_SERVER_URL = 'https://5a44c527-42a5-44d1-9fd7-198d43934b65.mock.pstmn.io/';

export const addPattern = createAction(
  'ADD_PATTERN',
  title => ({
    title,
    patternId: generateId(),
  })
);

export const addSection = createAction(
  'ADD_SECTION',
  (patternId, title, numRows) => ({
    title,
    numRows,
    patternId,
    sectionId: generateId(),
  })
);

export const addRow = createAction(
  'ADD_ROW',
  (sectionId, rowInfo) => ({
    sectionId,
    ...rowInfo,
    rowId: generateId(),
  })
);

export const updateRowCount = createAction(
  'UPDATE_ROW_COUNT',
  (sectionId, updateType) => ({
    sectionId,
    updateType
  })
);

export const deletePattern = createAction('DELETE_PATTERN');
export const deleteSection = createAction('DELETE_SECTION');
export const deleteRow = createAction('DELETE_ROW');

export const selectPattern = createAction('SELECT_PATTERN');
export const clearSection = createAction('CLEAR_SECTION');

// ASYNC
export const requestPatterns = createAction('REQUEST_PATTERNS');

export const receivePatterns = createAction(
  'RECEIVE_PATTERNS',
  json => ({
    patterns: json.patterns,
    receivedAt: Date.now()
  })
);


export function fetchPatterns() {

  return function (dispatch) {

    dispatch(requestPatterns());

    return fetch(`${MOCK_SERVER_URL}/get/patterns`, { method: 'GET' })
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => dispatch(receivePatterns(json))
    );
  }
}
