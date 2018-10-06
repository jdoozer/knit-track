import generateId from 'uuid/v4';
import { createAction } from 'redux-actions';
import fetch from 'cross-fetch';

const MOCK_SERVER_URL = 'api/';

// SYNCRONOUS ACTIONS
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

// ASYNC SETUP ACTIONS
export const requestPatterns = createAction('REQUEST_PATTERNS');
export const requestPatternWithSections = createAction('REQUEST_PATTERN_WITH_SECTIONS');
export const requestSections = createAction('REQUEST_SECTIONS');
export const requestRows = createAction('REQUEST_ROWS');

export const receivePattern = createAction(
  'RECEIVE_PATTERN',
  json => ({
    ...json,
    receivedAt: Date.now()
  })
);

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

export const receiveRows = createAction(
  'RECEIVE_ROWS',
  json => ({
    rows: json.rows,
    receivedAt: Date.now()
  })
);

// ASYNC
const fetchPatterns = () => dispatch => {

  dispatch(requestPatterns());

  return fetch(`${MOCK_SERVER_URL}/patterns`, { method: 'GET' })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => dispatch(receivePatterns(json))
  );
};

const fetchPattern = patternId => dispatch => {

  dispatch(requestPatterns());
  console.log(patternId);

  return fetch(`${MOCK_SERVER_URL}/patterns/${patternId}`, { method: 'GET' })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => {
      console.log(json);
      return dispatch(receivePattern(json))
    }
  );
};

const fetchPatternWithSections = patternId => dispatch => (
  dispatch(fetchPattern(patternId)).then(() => (
    dispatch(fetchSectionsFromPattern(patternId))
  ))
);

const fetchSectionsFromPattern = patternId => dispatch => {

  dispatch(requestSections());

  return fetch(`${MOCK_SERVER_URL}/patterns/${patternId}/sections`, { method: 'GET' })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => dispatch(receiveSections(json))
  );
};

//// TO DO - MAKE THIS ACTUALLY USE ROWIDS IN SERVER REQUEST
const fetchRows = rowIds => dispatch => {

  dispatch(requestRows());

  return fetch(`${MOCK_SERVER_URL}/api/rows`, { method: 'GET' })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => dispatch(receiveRows(json))
  );
};

// CONDITIONAL ASYNC
export const fetchPatternsIfNeeded = () => (dispatch, getState) => {
  const { patterns } = getState();
  const shouldFetchPatterns = !patterns.isFetching && !patterns.allIds.length;
  if (shouldFetchPatterns) return dispatch(fetchPatterns());
  return Promise.resolve();
};

export const fetchPatternSectionsIfNeeded = patternId => (dispatch, getState) => {

  if (!patternId) return Promise.resolve();

  const { patterns, sections } = getState();

  const shouldFetchPattern = (
    !patterns.isFetching && !patterns.allIds.includes(patternId)
  );

  if (shouldFetchPattern) {
    return dispatch(fetchPatternWithSections(patternId));
  }

  const sectionsInPattern = patterns.byId[patternId].sectionIds;
  const shouldFetchSections = (
    sectionsInPattern.length
    && !sections.isFetching
    && (
      !sections.allIds.length
      || !sections.allIds.includes(sectionsInPattern[0]) // need to check all here instead of just one?
    )
  );

  if (shouldFetchSections) {
    return dispatch(fetchSectionsFromPattern(patternId));
  }

  return Promise.resolve();

}


export const fetchRowsIfNeeded = sectionId => (dispatch, getState) => {

  const state = getState();
  const rowsInSection = state.sections.byId[sectionId].rowIds;
  const rows = state.rows;

  const shouldFetchRows = (
    rowsInSection.length
    && !rows.isFetching
    && (
      !rows.allIds.length
      || !rows.allIds.includes(rowsInSection[0])
    )
  );

  if (shouldFetchRows) return dispatch(fetchRows(rowsInSection));

  return Promise.resolve();

};
