import { createAction } from 'redux-actions';
import fetch from 'cross-fetch';

const MOCK_SERVER_URL = 'api/';

// SETUP ACTIONS
const requestPatterns = createAction('REQUEST_PATTERNS');
const requestPatternExpanded = createAction('REQUEST_PATTERN_EXPANDED');
const requestSectionExpanded = createAction('REQUEST_SECTION_EXPANDED');

const receivePatterns = createAction(
  'RECEIVE_PATTERNS',
  json => ({
    patterns: json.patterns,
    receivedAt: Date.now()
  })
);

const receivePatternExpanded = createAction(
  'RECEIVE_PATTERN_EXPANDED',
  json => ({
    pattern: json.pattern,
    sections: json.sections,
    rows: json.rows,
    receivedAt: Date.now()
  })
);

const receiveSectionExpanded = createAction(
  'RECEIVE_SECTION_EXPANDED',
  json => ({
    section: json.section,
    rows: json.rows,
    receivedAt: Date.now()
  })
);

// BASIC ACTION CREATORS
const fetchGet = (request, receive, path, host=MOCK_SERVER_URL) => (
  dispatch => {
    dispatch(request());
    return fetch(`${host}/${path}`, { method: 'GET' })
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(
        json => dispatch(receive(json))
      );
  }
);

// ACTION CREATORS FOR FETCHING
const fetchPatterns = () => fetchGet(
  requestPatterns,
  receivePatterns,
  'patterns'
);

const fetchPatternExpanded = patternId => fetchGet(
  requestPatternExpanded,
  receivePatternExpanded,
  `patterns/${patternId}`
);

const fetchSectionExpanded = sectionId => fetchGet(
  requestSectionExpanded,
  receiveSectionExpanded,
  `sections/${sectionId}`
);

// CONDITIONAL FETCHING
export const fetchPatternsIfNeeded = () => (dispatch, getState) => {
  const { patterns } = getState();
  const patternsLoaded = !patterns.isFetching && patterns.allIds.length;
  return patternsLoaded ? Promise.resolve() : dispatch(fetchPatterns());
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
      !sections.isFetching
      && sectionsInPattern.length
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
