import {
  requestPatterns, requestPatternExpanded, requestSectionExpanded,
  receivePatterns, receivePatternExpanded, receiveSectionExpanded,
  combinedFetchAction, MOCK_SERVER_URL
} from './asyncSetup';

// BASIC ACTION CREATOR
const combinedFetchGet = ({ requestAction, receiveAction, path }) =>
  combinedFetchAction({
    requestAction,
    receiveAction,
    path,
    requestType: 'GET',
    body: null,
    host: MOCK_SERVER_URL,
  });

// DEFAULT ACTION CREATORS FOR FETCHING
const fetchPatterns = () => combinedFetchGet({
  requestAction: requestPatterns,
  receiveAction: receivePatterns,
  path: 'patterns'
});

const fetchPatternExpanded = patternId => combinedFetchGet({
  requestAction: requestPatternExpanded,
  receiveAction: receivePatternExpanded,
  path: `patterns/${patternId}`
});

const fetchSectionExpanded = sectionId => combinedFetchGet({
  requestAction: requestSectionExpanded,
  receiveAction: receiveSectionExpanded,
  path: `sections/${sectionId}`
});

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
