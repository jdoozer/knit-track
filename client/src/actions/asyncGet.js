import fetch from 'cross-fetch';
import {
  requestPatterns, requestPatternExpanded, requestSectionExpanded,
  receivePatterns, receivePatternExpanded, receiveSectionExpanded
} from './asyncSetup';

const MOCK_SERVER_URL = 'api/';

// BASIC ACTION CREATOR
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

// DEFAULT ACTION CREATORS FOR FETCHING
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
  const patternsLoaded = !patterns.loading && patterns.allIds.length;
  return patternsLoaded ? Promise.resolve() : dispatch(fetchPatterns());
};

export const fetchPatternExpandedIfNeeded = patternId => (dispatch, getState) => {

  if (!patternId) return Promise.resolve();

  const { patterns, sections } = getState();

  const patternLoaded = (
    !patterns.loading && patterns.allIds.includes(patternId)
  );

  let sectionsLoaded = false;

  if (patternLoaded) {
    const sectionsInPattern = patterns.byId[patternId].sectionIds;
    sectionsLoaded = (
      !sections.loading
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
    !sections.loading && sections.allIds.includes(sectionId)
  );

  return sectionLoaded ? Promise.resolve() : dispatch(fetchSectionExpanded(sectionId));

}
