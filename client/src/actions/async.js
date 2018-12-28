import { createAction } from 'redux-actions';
import fetch from 'cross-fetch';

const MOCK_SERVER_URL = 'api/';

// SETUP ACTIONS
export const requestPatterns = createAction('REQUEST_PATTERNS');
export const requestPatternExpanded = createAction('REQUEST_PATTERN_EXPANDED');
export const requestSectionExpanded = createAction('REQUEST_SECTION_EXPANDED');

export const receivePatterns = createAction(
  'RECEIVE_PATTERNS',
  json => ({
    patterns: json.patterns,
    receivedAt: Date.now()
  })
);

export const receivePatternExpanded = createAction(
  'RECEIVE_PATTERN_EXPANDED',
  json => ({
    pattern: json.pattern,
    sections: json.sections,
    rows: json.rows,
    receivedAt: Date.now()
  })
);

export const receiveSectionExpanded = createAction(
  'RECEIVE_SECTION_EXPANDED',
  json => ({
    section: json.section,
    rows: json.rows,
    receivedAt: Date.now()
  })
);

// ACTION CREATORS FOR FETCHING
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

const fetchPatternExpanded = patternId => dispatch => {

  dispatch(requestPatternExpanded());

  return fetch(`${MOCK_SERVER_URL}/patterns/${patternId}`, { method: 'GET' })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => dispatch(receivePatternExpanded(json))
  );
};

const fetchSectionExpanded = sectionId => dispatch => {

  dispatch(requestSectionExpanded());

  return fetch(`${MOCK_SERVER_URL}/sections/${sectionId}`, { method: 'GET' })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => dispatch(receiveSectionExpanded(json))
  );
};


// CONDITIONAL ASYNC (TODO: this might need some work later on)
//     -> check reducers to make sure we SKIP updating the pattern
export const fetchPatternsIfNeeded = () => (dispatch, getState) => {
  const { patterns } = getState();
  const shouldFetchPatterns = !patterns.isFetching && !patterns.allIds.length;
  if (shouldFetchPatterns) return dispatch(fetchPatterns());
  return Promise.resolve();
};

export const fetchPatternExpandedIfNeeded = patternId => (dispatch, getState) => {

  if (!patternId) return Promise.resolve();

  const { patterns, sections } = getState();

  const patternLoaded = (
    !patterns.isFetching && patterns.allIds.includes(patternId)
  );

  let sectionsLoaded = false;

  if (patternLoaded) {
    const sectionsInPattern = patterns.byId[patternId].sectionIds;
    sectionsLoaded = (
      sectionsInPattern.length
      && !sections.isFetching
      && sectionsInPattern.reduce(
          (idsIncluded, id) => idsIncluded && sections.allIds.includes(id), true
        )
    );
  }

  return sectionsLoaded ? Promise.resolve() : dispatch(fetchPatternExpanded(patternId));

}

export const fetchSectionExpandedIfNeeded = sectionId => (dispatch, getState) => {

  if (!sectionId) return Promise.resolve();

  const { sections } = getState();

  const sectionLoaded = (
    !sections.isFetching && sections.allIds.includes(sectionId)
  );

  return sectionLoaded ? Promise.resolve() : dispatch(fetchSectionExpanded(sectionId));

}
