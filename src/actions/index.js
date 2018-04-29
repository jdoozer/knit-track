import generateId from 'uuid/v4';
import { createAction } from 'redux-actions';
import fetch from 'cross-fetch';

const MOCK_SERVER_URL = 'https://5a44c527-42a5-44d1-9fd7-198d43934b65.mock.pstmn.io';

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
  json => {
    if ('sections' in json) {
      console.log('sections!');
      return {
        sections: json.sections,
        receivedAt: Date.now()
      }
    } else {
      return {
        sections: json,
        receivedAt: Date.now()
      }
    }
  }
);

// export const receiveRows = createAction(
//   'RECEIVE_ROWS',
//   json => ({
//     rows: json.rows,
//     receivedAt: Date.now()
//   })
// );
//
// const shouldFetchPatterns = state => {
//   const patterns = state.patterns;
//   return !patterns.isFetching && !patterns.allIds.length;
// };

// const shouldFetchRows = state => {
//   const rows = state.rows;
//   return !rows.allIds.length && !rows.isFetching;
// };

const fetchPatterns = () => dispatch => {

  dispatch(requestPatterns());

  return fetch(`${MOCK_SERVER_URL}/api/patterns`, { method: 'GET' })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => dispatch(receivePatterns(json))
  );
};

const fetchSections = patternId => dispatch => {

  dispatch(requestSections());

  return fetch(`${MOCK_SERVER_URL}/api/sections`, { method: 'GET' })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => dispatch(receiveSections(json))
  );
};

export const fetchPatternsIfNeeded = () => (dispatch, getState) => {

  const state = getState();
  const patterns = state.patterns;
  const shouldFetchPatterns = !patterns.isFetching && !patterns.allIds.length;

  if (shouldFetchPatterns) return dispatch(fetchPatterns());

  return Promise.resolve();

};

export const fetchSectionsIfNeeded = () => (dispatch, getState) => {

  const state = getState();
  const pattern = state.ui.selectedPattern;

  if (pattern === null) return Promise.resolve();

  const sectionsInPattern = state.patterns.byId[pattern].sectionIds;
  const sections = state.sections;

  const shouldFetchSections = (
    sectionsInPattern.length
    && !sections.isFetching
    && (
      !sections.allIds.length
      || !sections.allIds.includes(sectionsInPattern[0])
    )
  );

  if (shouldFetchSections) {
    return dispatch(fetchSections(sectionsInPattern));
  } else {
    return Promise.resolve();
  }
};
