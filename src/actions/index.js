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
export const requestSections = createAction('REQUEST_SECTIONS');
export const requestRows = createAction('REQUEST_ROWS');

export const receivePatterns = createAction(
  'RECEIVE_PATTERNS',
  json => ({
    patterns: json.patterns,
    receivedAt: Date.now()
  })
);

export const receiveSections = createAction(
  'RECEIVE_SECTIONS',
  json => ({
    sections: json.sections,
    receivedAt: Date.now()
  })
);

// export const receiveRows = createAction(
//   'RECEIVE_ROWS',
//   json => ({
//     rows: json.rows,
//     receivedAt: Date.now()
//   })
// );

const shouldFetchPatterns = state => {
  const patterns = state.patterns;
  return !patterns.isFetching && !patterns.allIds.length;
};

const shouldFetchSections = state => {
  const pattern = state.ui.selectedPattern;
  const sectionsInPattern = state.patterns.byId[pattern].sections;
  const sections = state.sections;
  return !sections.isFetching && (
    !sections.allIds.length || !sections.includes(sectionsInPattern[0]));
};

// const shouldFetchRows = state => {
//   const rows = state.rows;
//   return !rows.allIds.length && !rows.isFetching;
// };

export const fetchPatterns = () => dispatch => {

  console.log('there');

  dispatch(requestPatterns());

  return fetch(`${MOCK_SERVER_URL}/get/patterns`, { method: 'GET' })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => dispatch(receivePatterns(json))
  );
};

export const fetchPatternsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchPatterns(getState())) {
    return dispatch(fetchPatterns());
  }
  else {
    return Promise.resolve();
  }
};
